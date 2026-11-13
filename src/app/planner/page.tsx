"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, ArrowRight, Layers, Terminal, CheckCircle2,
  Clock, ShieldCheck, Download, Code2, Cpu, Database,
  Copy, Check, RefreshCw, Home, ChevronRight, AlertCircle
} from "lucide-react";
import type { ProjectPlanResponse } from "@/app/api/planner/route";

const CATEGORIES = [
  "AI & Machine Learning",
  "Full-Stack Web SaaS",
  "LLM Applications & Agents",
  "FinTech & Algorithmic Systems",
  "Cybersecurity & Threat Detection",
  "Health IT & Medical Systems",
  "Data Science & Analytics",
  "Developer Tools & Infrastructure",
  "Mobile Applications",
  "Other Domain",
];

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const PROJECT_TYPES = ["Academic", "Portfolio", "Startup", "Research", "Personal"] as const;

function PlannerContent() {
  const sp = useSearchParams();
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("AI & Machine Learning");
  const [skillLevel, setSkillLevel] = useState<typeof SKILL_LEVELS[number]>("Intermediate");
  const [projectType, setProjectType] = useState<typeof PROJECT_TYPES[number]>("Portfolio");
  const [techPreference, setTechPreference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<ProjectPlanResponse | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urlIdea = sp?.get("idea");
    if (urlIdea && !idea) {
      setIdea(urlIdea);
    }
  }, [sp]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || idea.trim().length < 5) {
      setError("Please describe your project idea or problem statement (minimum 5 characters).");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: idea.trim(),
          category,
          skillLevel,
          projectType,
          techPreference: techPreference.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate project plan");
      }

      setPlan(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyAsMarkdown = () => {
    if (!plan) return;
    const md = `# Project Plan: ${idea}
## Overview
${plan.overview}

## Problem Statement
${plan.problemStatement}

## Proposed Solution
${plan.proposedSolution}

## Recommended Features
${plan.recommendedFeatures.map((f) => `- ${f}`).join("\n")}

## Recommended Tech Stack
- Frontend: ${plan.suggestedTechStack.frontend.join(", ")}
- Backend: ${plan.suggestedTechStack.backend.join(", ")}
- Database: ${plan.suggestedTechStack.database.join(", ")}
${plan.suggestedTechStack.aiMl ? `- AI / ML: ${plan.suggestedTechStack.aiMl.join(", ")}` : ""}
- DevOps: ${plan.suggestedTechStack.devOps.join(", ")}

## System Architecture
${plan.architecture.layers.map((l) => `### ${l.name}\n${l.description}`).join("\n\n")}

**Data Flow:**
${plan.architecture.dataFlow}

## Development Milestones
${plan.milestones.map((m) => `### ${m.phase} (${m.timeline})\n${m.deliverables.map((d) => `- ${d}`).join("\n")}`).join("\n\n")}

---
*Generated via SubmitKit Project Intelligence*
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "transparent", minHeight: "100vh", paddingBottom: "5rem" }}>
      {/* Header Breadcrumb seamlessly on canvas */}
      <div className="shell" style={{ paddingTop: "1.5rem", paddingBottom: "0.5rem" }}>
        <nav aria-label="Breadcrumb" style={{ display: "inline-flex", alignItems: "center", gap: ".375rem", fontSize: ".8125rem", color: "var(--ink-4)" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".3rem", color: "var(--ink-3)", textDecoration: "none", fontWeight: 500 }} className="breadcrumb-link">
            <Home style={{ width: ".8125rem", height: ".8125rem" }} /> Home
          </Link>
          <ChevronRight style={{ width: ".75rem", height: ".75rem", flexShrink: 0, opacity: 0.45 }} />
          <span style={{ color: "var(--navy)", fontWeight: 600 }}>Project Intelligence Planner</span>
        </nav>
      </div>

      <div className="shell" style={{ paddingTop: "1.5rem", position: "relative", zIndex: 1 }}>
        {/* Title */}
        <div style={{ textAlign: "center", maxWidth: "44rem", margin: "0 auto 2.5rem" }}>
          <span className="label-chip" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            <Sparkles style={{ width: "12px", height: "12px", color: "var(--teal)" }} /> Instant AI Project Planner
          </span>
          <h1 className="font-display font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-.04em", color: "var(--navy)", lineHeight: 1.15, marginBottom: "1rem" }}>
            Have an idea? <span className="text-teal-grad">Let&apos;s turn it into a plan.</span>
          </h1>
          <p style={{ fontSize: "clamp(.9375rem, 2vw, 1.125rem)", color: "var(--ink-3)", lineHeight: 1.75 }}>
            Describe what you want to build. Our AI generates your exact tech stack, database schema, architecture layers, and week-by-week roadmap.
          </p>
        </div>

        {/* Input Card */}
        <div className="card" style={{ maxWidth: "44rem", margin: "0 auto 3rem", padding: "clamp(1.5rem, 4vw, 2.25rem)", borderRadius: "20px", background: "var(--surface)", boxShadow: "var(--sh-md)" }}>
          <form onSubmit={handleGenerate} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: ".8125rem", fontWeight: 800, color: "var(--navy)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".5rem" }}>
                Project Concept or Problem Statement *
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                rows={3}
                placeholder="e.g. A privacy-preserving biometric attendance system with anti-spoofing and local edge inference..."
                style={{
                  width: "100%",
                  background: "var(--surface-2)",
                  border: "1.5px solid var(--line)",
                  borderRadius: "12px",
                  padding: ".875rem 1rem",
                  fontSize: ".9375rem",
                  color: "var(--ink)",
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                  lineHeight: 1.6,
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 13rem), 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: ".75rem", fontWeight: 800, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".4rem" }}>
                  Domain Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    background: "var(--surface-2)",
                    border: "1.5px solid var(--line)",
                    borderRadius: "10px",
                    padding: ".625rem .75rem",
                    fontSize: ".875rem",
                    color: "var(--ink)",
                    outline: "none",
                  }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: ".75rem", fontWeight: 800, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".4rem" }}>
                  Preferred Tech (Optional)
                </label>
                <input
                  type="text"
                  value={techPreference}
                  onChange={(e) => setTechPreference(e.target.value)}
                  placeholder="e.g. Next.js, FastAPI, Docker"
                  style={{
                    width: "100%",
                    background: "var(--surface-2)",
                    border: "1.5px solid var(--line)",
                    borderRadius: "10px",
                    padding: ".625rem .75rem",
                    fontSize: ".875rem",
                    color: "var(--ink)",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* Selectors for Skill Level & Project Type */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 13rem), 1fr))", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: ".75rem", fontWeight: 800, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".4rem" }}>
                  Skill Level
                </label>
                <div style={{ display: "flex", gap: ".5rem" }}>
                  {SKILL_LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSkillLevel(lvl)}
                      style={{
                        flex: 1,
                        padding: ".45rem .5rem",
                        borderRadius: "8px",
                        fontSize: ".8125rem",
                        fontWeight: 700,
                        border: skillLevel === lvl ? "1.5px solid var(--teal)" : "1.5px solid var(--line)",
                        background: skillLevel === lvl ? "var(--teal-50)" : "var(--surface-2)",
                        color: skillLevel === lvl ? "var(--teal-darker)" : "var(--ink-3)",
                        cursor: "pointer",
                        transition: "all 150ms",
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: ".75rem", fontWeight: 800, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".4rem" }}>
                  Target Project Type
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                  {PROJECT_TYPES.map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setProjectType(pt)}
                      style={{
                        padding: ".35rem .625rem",
                        borderRadius: "8px",
                        fontSize: ".75rem",
                        fontWeight: 700,
                        border: projectType === pt ? "1.5px solid var(--teal)" : "1.5px solid var(--line)",
                        background: projectType === pt ? "var(--teal-50)" : "var(--surface-2)",
                        color: projectType === pt ? "var(--teal-darker)" : "var(--ink-3)",
                        cursor: "pointer",
                        transition: "all 150ms",
                      }}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", padding: ".75rem 1rem", borderRadius: "10px", background: "var(--rose-50)", border: "1px solid var(--rose-100)", color: "var(--rose)", fontSize: ".875rem" }}>
                <AlertCircle style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-teal"
              style={{ justifyContent: "center", minHeight: "52px", borderRadius: "12px", fontSize: "1rem", fontWeight: 700, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <>
                  <RefreshCw style={{ width: "1.125rem", height: "1.125rem", animation: "spin 1s linear infinite" }} /> Generating System Architecture Plan…
                </>
              ) : (
                <>
                  <Sparkles style={{ width: "1.125rem", height: "1.125rem" }} /> Generate Project Blueprint
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results View */}
        <AnimatePresence>
          {plan && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{ maxWidth: "56rem", margin: "0 auto" }}
            >
              {/* Top Banner / Actions */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                  <span style={{ fontSize: ".8125rem", fontWeight: 800, padding: ".35rem .75rem", borderRadius: "9999px", background: "var(--surface-teal)", border: "1px solid var(--teal-200)", color: "var(--teal-dark)" }}>
                    Complexity: {plan.complexityScore}/10
                  </span>
                  <span style={{ fontSize: ".8125rem", fontWeight: 700, color: "var(--ink-4)", display: "flex", alignItems: "center", gap: ".3rem" }}>
                    <Clock style={{ width: "13px", height: "13px" }} /> ~{plan.estimatedTimelineWeeks} weeks timeline
                  </span>
                </div>

                <div style={{ display: "flex", gap: ".625rem" }}>
                  <button
                    type="button"
                    onClick={copyAsMarkdown}
                    className="btn btn-outline"
                    style={{ fontSize: ".8125rem", padding: ".4rem .875rem", borderRadius: "10px", gap: ".375rem" }}
                  >
                    {copied ? <Check style={{ width: "14px", height: "14px", color: "var(--emerald)" }} /> : <Copy style={{ width: "14px", height: "14px" }} />}
                    {copied ? "Copied Markdown" : "Copy Markdown"}
                  </button>
                  <Link
                    href={`/custom?concept=${encodeURIComponent(idea)}`}
                    className="btn btn-teal"
                    style={{ fontSize: ".8125rem", padding: ".4rem .875rem", borderRadius: "10px", gap: ".375rem" }}
                  >
                    Commission Build <ArrowRight style={{ width: "14px", height: "14px" }} />
                  </Link>
                </div>
              </div>

              {/* Grid of Plan Sections */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* 1. Overview & Problem/Solution */}
                <div className="card" style={{ padding: "1.75rem", borderRadius: "18px", background: "var(--surface)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", marginBottom: ".75rem" }}>
                    System Architecture Overview
                  </h3>
                  <p style={{ fontSize: ".9375rem", color: "var(--ink-2)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    {plan.overview}
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1rem" }}>
                    <div style={{ padding: "1rem 1.25rem", borderRadius: "12px", background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                      <p style={{ fontSize: ".75rem", fontWeight: 800, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".375rem" }}>
                        Problem Statement
                      </p>
                      <p style={{ fontSize: ".875rem", color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
                        {plan.problemStatement}
                      </p>
                    </div>
                    <div style={{ padding: "1rem 1.25rem", borderRadius: "12px", background: "var(--surface-teal)", border: "1px solid var(--teal-100)" }}>
                      <p style={{ fontSize: ".75rem", fontWeight: 800, color: "var(--teal-darker)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".375rem" }}>
                        Proposed Solution
                      </p>
                      <p style={{ fontSize: ".875rem", color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
                        {plan.proposedSolution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Recommended Tech Stack */}
                <div className="card" style={{ padding: "1.75rem", borderRadius: "18px", background: "var(--surface)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1.25rem" }}>
                    Recommended Technology Stack
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 14rem), 1fr))", gap: "1rem" }}>
                    {[
                      { icon: Code2, label: "Frontend", items: plan.suggestedTechStack.frontend },
                      { icon: Terminal, label: "Backend API", items: plan.suggestedTechStack.backend },
                      { icon: Database, label: "Database / Store", items: plan.suggestedTechStack.database },
                      ...(plan.suggestedTechStack.aiMl ? [{ icon: Cpu, label: "AI / ML Pipeline", items: plan.suggestedTechStack.aiMl }] : []),
                      { icon: Layers, label: "DevOps & Cloud", items: plan.suggestedTechStack.devOps },
                    ].map((col) => (
                      <div key={col.label} style={{ padding: "1rem", borderRadius: "12px", background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".625rem" }}>
                          <col.icon style={{ width: "1rem", height: "1rem", color: "var(--teal)" }} />
                          <span style={{ fontSize: ".8125rem", fontWeight: 800, color: "var(--navy)" }}>{col.label}</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
                          {col.items.map((it) => (
                            <span key={it} style={{ fontSize: ".75rem", fontWeight: 600, color: "var(--ink-2)", background: "var(--surface)", border: "1px solid var(--line)", padding: ".2rem .5rem", borderRadius: "6px" }}>
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Core Recommended Features */}
                <div className="card" style={{ padding: "1.75rem", borderRadius: "18px", background: "var(--surface)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>
                    Core Architecture Features
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))", gap: ".75rem" }}>
                    {plan.recommendedFeatures.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".625rem", padding: ".75rem 1rem", borderRadius: "10px", background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                        <CheckCircle2 style={{ width: "1.125rem", height: "1.125rem", color: "var(--teal)", flexShrink: 0, marginTop: ".1rem" }} />
                        <span style={{ fontSize: ".875rem", fontWeight: 600, color: "var(--navy)", lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Architecture Layers & Data Flow */}
                <div className="card" style={{ padding: "1.75rem", borderRadius: "18px", background: "var(--surface)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>
                    Multi-Tier System Architecture
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", marginBottom: "1.25rem" }}>
                    {plan.architecture.layers.map((l, i) => (
                      <div key={i} style={{ padding: "1rem 1.25rem", borderRadius: "12px", borderLeft: "4px solid var(--teal)", background: "var(--surface-2)" }}>
                        <p style={{ fontSize: ".9375rem", fontWeight: 800, color: "var(--navy)", margin: "0 0 .25rem" }}>{l.name}</p>
                        <p style={{ fontSize: ".875rem", color: "var(--ink-3)", margin: 0, lineHeight: 1.6 }}>{l.description}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "1rem 1.25rem", borderRadius: "12px", background: "var(--surface-teal)", border: "1px solid var(--teal-100)" }}>
                    <p style={{ fontSize: ".75rem", fontWeight: 800, color: "var(--teal-darker)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".35rem" }}>
                      End-to-End Data Flow Pipeline
                    </p>
                    <p style={{ fontSize: ".875rem", color: "var(--ink-2)", margin: 0, lineHeight: 1.65, fontFamily: "var(--font-mono)" }}>
                      {plan.architecture.dataFlow}
                    </p>
                  </div>
                </div>

                {/* 5. Development Milestones */}
                <div className="card" style={{ padding: "1.75rem", borderRadius: "18px", background: "var(--surface)" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1.25rem" }}>
                    Development Execution Roadmap
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1rem" }}>
                    {plan.milestones.map((m, i) => (
                      <div key={i} style={{ padding: "1.125rem", borderRadius: "12px", background: "var(--surface-2)", border: "1px solid var(--line)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".5rem" }}>
                          <span style={{ fontSize: ".6875rem", fontWeight: 800, padding: ".2rem .5rem", borderRadius: "6px", background: "var(--teal-50)", color: "var(--teal-darker)" }}>
                            {m.timeline}
                          </span>
                        </div>
                        <p style={{ fontSize: ".9375rem", fontWeight: 800, color: "var(--navy)", marginBottom: ".625rem" }}>
                          {m.phase}
                        </p>
                        <ul style={{ display: "flex", flexDirection: "column", gap: ".35rem", paddingLeft: "1.125rem", margin: 0 }}>
                          {m.deliverables.map((d, j) => (
                            <li key={j} style={{ fontSize: ".8125rem", color: "var(--ink-3)", lineHeight: 1.5 }}>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Related SubmitKit Projects */}
                {plan.relatedSubmitKitProjects.length > 0 && (
                  <div className="card" style={{ padding: "1.75rem", borderRadius: "18px", background: "var(--surface)" }}>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--navy)", marginBottom: "1rem" }}>
                      Related Reference Systems on SubmitKit
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1rem" }}>
                      {plan.relatedSubmitKitProjects.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/projects/${p.slug}`}
                          style={{ textDecoration: "none", display: "block" }}
                        >
                          <div
                            className="card card-lift"
                            style={{
                              padding: "1.125rem",
                              borderRadius: "14px",
                              border: "1px solid var(--line)",
                              background: "var(--surface-2)",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".5rem" }}>
                                <span style={{ fontSize: ".6875rem", fontWeight: 800, color: "var(--teal)", textTransform: "uppercase" }}>
                                  {p.category}
                                </span>
                              </div>
                              <p style={{ fontSize: ".9375rem", fontWeight: 800, color: "var(--navy)", marginBottom: ".5rem" }}>
                                {p.title}
                              </p>
                              <p style={{ fontSize: ".8125rem", color: "var(--ink-3)", lineHeight: 1.5 }}>
                                {p.relevance}
                              </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: ".35rem", marginTop: ".75rem", fontSize: ".8125rem", fontWeight: 700, color: "var(--teal)" }}>
                              <span>Explore Codebase</span>
                              <ArrowRight style={{ width: "12px", height: "12px" }} />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "var(--canvas-base)" }} />}>
      <PlannerContent />
    </Suspense>
  );
}
