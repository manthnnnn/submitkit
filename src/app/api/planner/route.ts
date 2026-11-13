import { NextRequest, NextResponse } from "next/server";
import { ALL_TOPICS } from "@/lib/blueprint-engine";
import { READY_PROJECTS, AVAILABLE_CORE_SLUGS } from "@/lib/available-projects";

export interface ProjectPlanResponse {
  overview: string;
  problemStatement: string;
  proposedSolution: string;
  recommendedFeatures: string[];
  suggestedTechStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    aiMl?: string[];
    devOps: string[];
  };
  architecture: {
    layers: { name: string; description: string }[];
    dataFlow: string;
  };
  milestones: {
    phase: string;
    timeline: string;
    deliverables: string[];
  }[];
  relatedSubmitKitProjects: {
    slug: string;
    title: string;
    category: string;
    relevance: string;
    isAvailable: boolean;
  }[];
  estimatedTimelineWeeks: number;
  complexityScore: number;
}

// Simple IP-based rate limiting in memory
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 3600_000 }); // 1 hour window
    return true;
  }
  if (entry.count >= 15) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "anon";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit reached. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      idea,
      category = "General Software",
      skillLevel = "Intermediate",
      techPreference = "Modern Web / Python",
      projectType = "Portfolio",
      budget = "Standard",
    } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a clear project idea or problem statement (min 5 characters)." },
        { status: 400 }
      );
    }

    // Try LLM API if key is present (Gemini or OpenAI)
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const plan = await generateWithGemini(geminiKey, {
          idea,
          category,
          skillLevel,
          techPreference,
          projectType,
          budget,
        });
        if (plan) return NextResponse.json(plan);
      } catch (err) {
        console.error("Gemini planner fallback triggered:", err);
      }
    } else if (openaiKey) {
      try {
        const plan = await generateWithOpenAI(openaiKey, {
          idea,
          category,
          skillLevel,
          techPreference,
          projectType,
          budget,
        });
        if (plan) return NextResponse.json(plan);
      } catch (err) {
        console.error("OpenAI planner fallback triggered:", err);
      }
    }

    // High-intelligence deterministic engineering plan generator
    const deterministicPlan = buildDeterministicPlan({
      idea: idea.trim(),
      category,
      skillLevel,
      techPreference,
      projectType,
      budget,
    });

    return NextResponse.json(deterministicPlan);
  } catch (error: any) {
    console.error("Planner API error:", error);
    return NextResponse.json(
      { error: "Failed to generate project plan. Please try again." },
      { status: 500 }
    );
  }
}

/* ─────────────────────────────────────────────────────────────
   Deterministic Fallback & Intelligence Engine
───────────────────────────────────────────────────────────── */
function buildDeterministicPlan(params: {
  idea: string;
  category: string;
  skillLevel: string;
  techPreference: string;
  projectType: string;
  budget: string;
}): ProjectPlanResponse {
  const { idea, category, skillLevel, techPreference, projectType } = params;
  const lower = idea.toLowerCase();

  // Detect domain traits
  const isAI = /ai|ml|machine learning|deep learning|nlp|vision|model|llm|agent|gpt|neural|detect|predict/i.test(lower);
  const isHealth = /health|ehr|hospital|doctor|patient|medical|vital|drug|telehealth/i.test(lower);
  const isFinance = /fraud|pay|bank|crypto|finance|money|expense|wallet|credit|transaction/i.test(lower);
  const isSecurity = /phish|cyber|security|hack|detect|auth|ids|firewall|threat/i.test(lower);
  const isFullStack = /saas|qr|restaurant|order|ecommerce|store|app|portal|dashboard/i.test(lower);

  // Suggested stack
  const frontend = lower.includes("mobile")
    ? ["React Native", "Expo", "TypeScript", "Tailwind CSS"]
    : ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4"];

  const backend = isAI
    ? ["Python 3.11", "FastAPI", "Uvicorn", "Pydantic"]
    : ["Node.js / Express", "TypeScript", "REST APIs", "Zod Validation"];

  const database = isAI
    ? ["PostgreSQL (pgvector)", "Supabase", "Redis (Cache & Queues)"]
    : ["PostgreSQL", "Supabase / Prisma ORM", "Redis (Sessions)"];

  const aiMl = isAI
    ? ["PyTorch / Scikit-learn", "HuggingFace Transformers", "LangChain / LlamaIndex", "NumPy & Pandas"]
    : undefined;

  const devOps = ["Docker & Docker Compose", "GitHub Actions CI/CD", "Vercel / AWS ECS", "Sentry Monitoring"];

  // Find related flagship kits
  const matchedSlugs: string[] = [];
  if (isHealth) matchedSlugs.push("healthcare-ehr-portal", "blood-bank-management");
  if (isFinance) matchedSlugs.push("credit-card-fraud", "smart-expense-tracker");
  if (isSecurity) matchedSlugs.push("phishing-detector-ai");
  if (isAI && !isHealth && !isFinance && !isSecurity) {
    matchedSlugs.push("resume-parsing-engine", "plant-disease-detection", "fake-news-detector", "aerofuel-predictor");
  }
  if (isFullStack || matchedSlugs.length === 0) {
    matchedSlugs.push("restaurant-qr-ordering", "online-code-compiler");
  }

  const relatedSubmitKitProjects = matchedSlugs.slice(0, 3).map((slug) => {
    const meta = READY_PROJECTS[slug];
    return {
      slug,
      title: meta?.name || slug,
      category: meta?.category || "Engineering",
      relevance: meta?.oneLiner || "Directly aligned architecture and code patterns.",
      isAvailable: AVAILABLE_CORE_SLUGS.includes(slug as any),
    };
  });

  const complexityScore = skillLevel === "Advanced" ? 8 : skillLevel === "Beginner" ? 4 : 6;
  const estimatedWeeks = skillLevel === "Advanced" ? 6 : skillLevel === "Beginner" ? 2 : 4;

  return {
    overview: `Technical development specification for "${idea}". Engineered as a ${projectType.toLowerCase()} system tailored for ${skillLevel.toLowerCase()} implementation standards.`,
    problemStatement: `Current solutions in this space often suffer from fragmented architecture, lack of modular extensibility, and steep setup curves. Users require a unified, dependable system capable of processing requests with minimal latency while upholding stringent data integrity.`,
    proposedSolution: `A scalable, decoupled service architecture featuring a responsive ${frontend[0]} interface, an asynchronous ${backend[0]} API, and an ACID-compliant ${database[0]} storage tier. The system incorporates real-time telemetry, automated validation guards, and reproducible deployment manifests.`,
    recommendedFeatures: [
      "Role-Based Access Control (RBAC) & Secure JWT Session Management",
      "Real-time event processing and state updates via WebSockets / Server-Sent Events",
      "Comprehensive telemetry dashboard with dynamic filtering and data export",
      "Robust input validation and defensive error handling middleware",
      "Automated unit and integration test coverage with CI pipeline integration",
      "Containerized 1-click local setup (Docker Compose) for deterministic execution",
    ],
    suggestedTechStack: {
      frontend,
      backend,
      database,
      aiMl,
      devOps,
    },
    architecture: {
      layers: [
        {
          name: "Client Presentation Tier",
          description: `${frontend[0]} utilizing component-driven reactive state, optimistic UI updates, and responsive layouts.`,
        },
        {
          name: "API & Business Logic Tier",
          description: `${backend[0]} micro-service architecture with strict rate limiting, schema validation, and stateless worker orchestration.`,
        },
        {
          name: "Persistence & Vector Layer",
          description: `${database[0]} with indexed querying, transaction isolation, and automated migration management.`,
        },
        {
          name: "DevOps & Infrastructure",
          description: "Isolated Docker containerization with environmental configuration and healthcheck probe endpoints.",
        },
      ],
      dataFlow:
        "Client initiates TLS request → Ingress Reverse Proxy / Gateway validates JWT & Rate Limits → Backend service executes business logic & queries Database → Events emitted to async queue / telemetry buffer → Structured JSON response returned to Client.",
    },
    milestones: [
      {
        phase: "Phase 1: Architecture & Scaffolding",
        timeline: "Week 1",
        deliverables: [
          "Database schema design & initial migration scripts",
          "Repository scaffolding, linter configuration, and environment setup",
          "Core authentication endpoints and session store initialization",
        ],
      },
      {
        phase: "Phase 2: Core Engine & API Implementation",
        timeline: `Week 2–${Math.max(2, Math.floor(estimatedWeeks / 2))}`,
        deliverables: [
          "Primary CRUD and business processing endpoints",
          "Integration with database and caching layer",
          "Unit test suite for business critical calculation logic",
        ],
      },
      {
        phase: "Phase 3: Frontend Integration & Interactive UI",
        timeline: `Week ${Math.floor(estimatedWeeks / 2) + 1}–${estimatedWeeks - 1}`,
        deliverables: [
          "Dashboard interface and reactive user flow components",
          "API client integration with error boundary fallbacks",
          "Visual telemetry charting and responsive mobile optimizations",
        ],
      },
      {
        phase: "Phase 4: Hardening, Documentation & Delivery",
        timeline: `Week ${estimatedWeeks}`,
        deliverables: [
          "End-to-end integration testing and vulnerability audit",
          "Comprehensive technical documentation (.md & API specs)",
          "1-click launch scripts and deployment to cloud staging",
        ],
      },
    ],
    relatedSubmitKitProjects,
    estimatedTimelineWeeks: estimatedWeeks,
    complexityScore,
  };
}

/* ─────────────────────────────────────────────────────────────
   Optional LLM Integrations (Gemini / OpenAI)
───────────────────────────────────────────────────────────── */
async function generateWithGemini(apiKey: string, params: any): Promise<ProjectPlanResponse | null> {
  const prompt = `You are a Principal Software Architect.
Analyze this user's project requirements and respond strictly with valid JSON conforming to the requested schema.

Project Idea: "${params.idea}"
Domain/Category: ${params.category}
Skill Level: ${params.skillLevel}
Tech Preference: ${params.techPreference}
Project Type: ${params.projectType}
Budget: ${params.budget}

Return ONLY a single valid JSON object with keys:
"overview", "problemStatement", "proposedSolution", "recommendedFeatures" (array of strings),
"suggestedTechStack" ({ frontend: [], backend: [], database: [], aiMl?: [], devOps: [] }),
"architecture" ({ layers: [{ name, description }], dataFlow: string }),
"milestones" ([{ phase, timeline, deliverables: [] }]),
"estimatedTimelineWeeks" (number),
"complexityScore" (number 1-10)`;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  const parsed = JSON.parse(rawText);
  parsed.relatedSubmitKitProjects = [];
  return parsed;
}

async function generateWithOpenAI(apiKey: string, params: any): Promise<ProjectPlanResponse | null> {
  const prompt = `You are a Principal Software Architect.
Analyze this user's project requirements and output strictly a single valid JSON object conforming to:
- overview: string
- problemStatement: string
- proposedSolution: string
- recommendedFeatures: string[]
- suggestedTechStack: { frontend: string[], backend: string[], database: string[], aiMl?: string[], devOps: string[] }
- architecture: { layers: { name: string, description: string }[], dataFlow: string }
- milestones: { phase: string, timeline: string, deliverables: string[] }[]
- estimatedTimelineWeeks: number
- complexityScore: number (1-10)

Requirements:
Idea: "${params.idea}"
Category: ${params.category}
Skill Level: ${params.skillLevel}
Tech Preference: ${params.techPreference}
Project Type: ${params.projectType}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;

  const parsed = JSON.parse(content);
  parsed.relatedSubmitKitProjects = [];
  return parsed;
}
