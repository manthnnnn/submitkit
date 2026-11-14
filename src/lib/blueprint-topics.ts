/**
 * Enhanced Blueprint Topics Library
 * Production-grade project blueprints with Master Prompts for instant software generation
 */

export type BlueprintCategory =
  | 'AI & Machine Learning'
  | 'Web Development'
  | 'Mobile Development'
  | 'Blockchain & Web3'
  | 'IoT & Embedded'
  | 'Cybersecurity'
  | 'Data Science'
  | 'Cloud & DevOps'
  | 'AR/VR & Gaming'
  | 'FinTech';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface MasterPrompt {
  systemContext: string;
  projectBrief: string;
  technicalRequirements: string;
  deliverables: string;
  qualityGates: string;
}

export interface BuildStep {
  phase: string;
  duration: string;
  tasks: string[];
  technologies: string[];
  deliverable: string;
}

export interface BlueprintTopic {
  id: string;
  title: string;
  category: BlueprintCategory;
  difficulty: DifficultyLevel;
  estimatedHours: number;

  // Core Information
  description: string;
  problemStatement: string;
  targetAudience: string;
  businessValue: string;

  // Technical Details
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    infrastructure?: string[];
    apis?: string[];
    tools?: string[];
  };

  // Features & Architecture
  coreFeatures: string[];
  advancedFeatures: string[];
  systemArchitecture: string;
  databaseSchema: string;

  // Master Prompt (for AI-powered generation)
  masterPrompt: MasterPrompt;

  // Build Guide
  buildSteps: BuildStep[];
  prerequisites: string[];
  learningOutcomes: string[];

  // Project Variations
  coreScope: string;
  fullScope: string;
  enterpriseScope: string;

  // Metadata
  tags: string[];
  searchTerms: string[];
  popularity: number;
  trending: boolean;
  hot: boolean;
  new: boolean;

  // Deployment & Showcase
  deploymentOptions: string[];
  demoIdeas: string[];
  portfolioTips: string[];

  // Monetization
  revenueModel?: string[];
  marketSize?: string;
  competitorAnalysis?: string[];
}

export const DIFFICULTY_COLORS = {
  'Beginner': {
    bg: 'rgba(34, 197, 94, 0.1)',
    border: '#86EFAC',
    text: '#15803D'
  },
  'Intermediate': {
    bg: 'rgba(59, 130, 246, 0.1)',
    border: '#93C5FD',
    text: '#1E40AF'
  },
  'Advanced': {
    bg: 'rgba(249, 115, 22, 0.1)',
    border: '#FDBA74',
    text: '#C2410C'
  },
  'Expert': {
    bg: 'rgba(239, 68, 68, 0.1)',
    border: '#FCA5A5',
    text: '#B91C1C'
  }
};

// Comprehensive Blueprint Library
export const BLUEPRINT_TOPICS: BlueprintTopic[] = [
  {
    id: 'ai-powered-resume-analyzer',
    title: 'AI-Powered Resume Analyzer & Job Matcher',
    category: 'AI & Machine Learning',
    difficulty: 'Intermediate',
    estimatedHours: 120,

    description: 'Build an intelligent system that analyzes resumes using NLP, extracts key information, scores candidates against job descriptions, and provides actionable feedback for improvement.',

    problemStatement: 'Companies receive hundreds of resumes for each position, making manual screening time-consuming and prone to bias. Job seekers struggle to optimize their resumes for ATS systems and specific job requirements.',

    targetAudience: 'HR departments, recruitment agencies, job seekers, career counselors',

    businessValue: 'Reduces hiring time by 70%, eliminates unconscious bias in initial screening, improves candidate-job matching accuracy to 85%+, helps job seekers increase interview callbacks by 3x.',

    techStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS', 'Recharts'],
      backend: ['Python', 'FastAPI', 'Redis'],
      database: ['PostgreSQL', 'Pinecone (Vector DB)'],
      apis: ['OpenAI GPT-4', 'Anthropic Claude', 'Spacy NLP'],
      tools: ['Docker', 'PyPDF2', 'python-docx', 'BeautifulSoup']
    },

    coreFeatures: [
      'Resume parsing (PDF, DOCX, TXT) with 95%+ accuracy',
      'Automated skills extraction and categorization',
      'Experience timeline validation and gap detection',
      'ATS compatibility scoring with detailed breakdown',
      'Job description matching with similarity scores',
      'Keyword optimization suggestions',
      'Format and grammar checking',
      'Export analyzed data as JSON/CSV'
    ],

    advancedFeatures: [
      'AI-powered resume rewriting suggestions',
      'Skill gap analysis against job requirements',
      'Industry-specific scoring models',
      'Batch processing for bulk resume screening',
      'Interview question prediction based on resume',
      'Salary estimation using market data',
      'Career progression recommendations',
      'Real-time collaboration for hiring teams'
    ],

    systemArchitecture: `
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   React     │────▶│   FastAPI    │────▶│ PostgreSQL  │
│   Frontend  │     │   Backend    │     │  Database   │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ├────▶ OpenAI API (NLP)
                           ├────▶ Pinecone (Embeddings)
                           ├────▶ Redis (Cache)
                           └────▶ S3 (File Storage)
    `,

    databaseSchema: `
Tables:
- users (id, email, role, created_at)
- resumes (id, user_id, file_url, parsed_data, score, analysis)
- job_postings (id, title, description, requirements, embeddings)
- matches (id, resume_id, job_id, similarity_score, feedback)
- skills_taxonomy (id, skill_name, category, aliases)
- analytics (id, user_id, action, timestamp)
    `,

    masterPrompt: {
      systemContext: `You are building a production-grade AI Resume Analyzer. This is a full-stack application that uses NLP and machine learning to parse resumes, extract structured data, match candidates with jobs, and provide intelligent feedback. The system must handle PDF/DOCX parsing, implement vector similarity search, and provide a modern web interface.`,

      projectBrief: `Create a complete resume analysis platform with:
1. Resume upload and parsing (PDF, DOCX, TXT)
2. Intelligent data extraction (name, contact, education, experience, skills)
3. Job description matcher with similarity scoring
4. ATS compatibility checker
5. Improvement suggestions generator
6. Modern dashboard showing analytics
7. REST API for all operations
8. Admin panel for managing job postings`,

      technicalRequirements: `
Backend (Python FastAPI):
- POST /api/upload - Handle file uploads with validation
- POST /api/analyze - Parse and analyze resume using Spacy + GPT-4
- POST /api/match - Compare resume against job description
- GET /api/resumes/:id - Fetch analysis results
- Implement rate limiting and authentication
- Use Redis for caching parsed results
- Store embeddings in Pinecone for fast similarity search

Frontend (React + TypeScript):
- Drag-drop file upload with progress indicator
- Resume analysis dashboard with score breakdown
- Job matching interface with filters
- Skill gap visualization using charts
- Export functionality (PDF report)
- Responsive design for mobile

AI/NLP Pipeline:
- Extract entities using Spacy (PERSON, ORG, DATE, GPE)
- Generate embeddings for skills using sentence-transformers
- Use GPT-4 for intelligent content analysis
- Implement cosine similarity for job matching
- Train custom NER model for industry-specific terms`,

      deliverables: `
1. Complete source code with documentation
2. Docker Compose setup for local development
3. API documentation (OpenAPI/Swagger)
4. Database migration scripts
5. Sample resumes and job descriptions for testing
6. Deployment guide for AWS/GCP
7. Unit and integration tests (80%+ coverage)
8. User manual and API integration guide`,

      qualityGates: `
- Resume parsing accuracy must be ≥ 95% on standard formats
- API response time < 3 seconds for analysis
- System must handle concurrent uploads (10+ users)
- Mobile-responsive UI passing Lighthouse audit (90+ score)
- All API endpoints must have error handling
- Security: Input sanitization, file type validation, rate limiting
- Code must follow PEP 8 (Python) and ESLint (JavaScript)
- All environment variables properly configured
- Backup and recovery procedures documented`
    },

    buildSteps: [
      {
        phase: 'Phase 1: Project Setup & Infrastructure',
        duration: '1 day',
        tasks: [
          'Initialize Git repository with .gitignore',
          'Set up Python virtual environment',
          'Create React app with TypeScript template',
          'Configure Docker Compose (FastAPI, PostgreSQL, Redis)',
          'Set up environment variables (.env.example)',
          'Initialize database with Alembic migrations'
        ],
        technologies: ['Git', 'Python venv', 'Node.js', 'Docker', 'PostgreSQL'],
        deliverable: 'Working development environment with database'
      },
      {
        phase: 'Phase 2: Backend API Development',
        duration: '3 days',
        tasks: [
          'Create FastAPI app structure with routers',
          'Implement file upload endpoint with validation',
          'Build resume parser using PyPDF2 and python-docx',
          'Integrate Spacy for NLP entity extraction',
          'Create database models and CRUD operations',
          'Add Redis caching layer',
          'Implement JWT authentication',
          'Write API unit tests'
        ],
        technologies: ['FastAPI', 'Spacy', 'SQLAlchemy', 'Redis', 'PyTest'],
        deliverable: 'Functional REST API with authentication'
      },
      {
        phase: 'Phase 3: AI/ML Integration',
        duration: '2 days',
        tasks: [
          'Set up OpenAI API client',
          'Create prompts for resume analysis',
          'Implement skill extraction pipeline',
          'Build vector embeddings using sentence-transformers',
          'Integrate Pinecone for similarity search',
          'Create job matching algorithm (cosine similarity)',
          'Add ATS scoring logic',
          'Test accuracy on sample resumes'
        ],
        technologies: ['OpenAI API', 'sentence-transformers', 'Pinecone', 'NumPy'],
        deliverable: 'AI-powered analysis engine'
      },
      {
        phase: 'Phase 4: Frontend Development',
        duration: '3 days',
        tasks: [
          'Create component structure and routing',
          'Build file upload UI with drag-drop',
          'Design analysis dashboard with charts',
          'Implement job matching interface',
          'Add export functionality (PDF)',
          'Create admin panel for job postings',
          'Implement responsive design',
          'Add loading states and error handling'
        ],
        technologies: ['React', 'TypeScript', 'TailwindCSS', 'Recharts', 'React Query'],
        deliverable: 'Complete web interface'
      },
      {
        phase: 'Phase 5: Testing & Deployment',
        duration: '1 day',
        tasks: [
          'Write integration tests',
          'Run security audit (OWASP)',
          'Optimize database queries',
          'Set up CI/CD pipeline (GitHub Actions)',
          'Deploy to cloud (AWS EC2 / Vercel)',
          'Configure domain and SSL',
          'Set up monitoring (Sentry)',
          'Create user documentation'
        ],
        technologies: ['Jest', 'Cypress', 'GitHub Actions', 'AWS', 'Nginx'],
        deliverable: 'Production-ready deployed application'
      }
    ],

    prerequisites: [
      'Python programming (functions, classes, APIs)',
      'JavaScript/TypeScript basics',
      'React fundamentals (components, hooks, state)',
      'REST API concepts',
      'SQL database basics',
      'Git version control',
      'Basic NLP concepts (tokenization, embeddings)',
      'Docker basics (optional but recommended)'
    ],

    learningOutcomes: [
      'Build full-stack applications with modern tech stack',
      'Integrate OpenAI and NLP APIs into applications',
      'Implement vector databases for semantic search',
      'Design scalable REST APIs with proper authentication',
      'Handle file uploads and parsing in production',
      'Create responsive UIs with React and TypeScript',
      'Deploy applications to cloud platforms',
      'Write unit and integration tests',
      'Optimize application performance',
      'Implement proper security measures'
    ],

    coreScope: 'Resume upload, basic parsing (text extraction), simple skill matching, score display (3-4 weeks)',

    fullScope: 'All core features + job matching + ATS scoring + suggestions + analytics dashboard (8-10 weeks)',

    enterpriseScope: 'Full scope + team collaboration + custom scoring models + API access + white-labeling + SSO integration (4-6 months)',

    tags: ['NLP', 'Machine Learning', 'OpenAI', 'FastAPI', 'React', 'TypeScript', 'Vector Database', 'Full Stack'],

    searchTerms: ['resume parser', 'ats analyzer', 'job matcher', 'nlp project', 'ai recruitment', 'hiring automation', 'career tool'],

    popularity: 94,
    trending: true,
    hot: true,
    new: false,

    deploymentOptions: [
      'AWS (EC2 + RDS + S3): Production-grade with auto-scaling',
      'Anthropic Run: Serverless with automatic scaling',
      'Vercel (Frontend) + Railway (Backend): Quick deployment',
      'DigitalOcean Droplet: Cost-effective for lean startups',
      'Azure App Service: Enterprise integration'
    ],

    demoIdeas: [
      'Upload real resumes and show live parsing',
      'Compare resume against 5 different job descriptions',
      'Show before/after scores with optimization suggestions',
      'Demo skill gap analysis visualization',
      'Display ATS compatibility issues and fixes'
    ],

    portfolioTips: [
      'Include video walkthrough showing key features',
      'Highlight the ML/AI components prominently',
      'Show quantitative metrics (parsing accuracy, match score)',
      'Include sample API requests/responses',
      'Demonstrate responsive design on mobile'
    ],

    revenueModel: [
      'Freemium: 5 free analyses/month, $19/month unlimited',
      'B2B SaaS: $99-$499/month for companies (team features)',
      'API Access: $0.10 per resume analysis',
      'White-label: $2,000 one-time + $199/month hosting'
    ],

    marketSize: 'HR Tech market: $30B globally, Resume tools: $400M+ TAM',

    competitorAnalysis: [
      'Resume Worded: $19/month, limited AI features',
      'Jobscan: $49/month, basic ATS checking',
      'Rezi.ai: $29/month, template-focused',
      'Your Edge: Better AI, lower price, API access'
    ]
  },

  // Add more comprehensive blueprints following the same structure...
  // I'll create 20-30 high-quality blueprints with complete Master Prompts
];

export const BLUEPRINT_CATEGORIES = [
  { name: 'All', count: BLUEPRINT_TOPICS.length, icon: '🚀' },
  { name: 'AI & Machine Learning', count: BLUEPRINT_TOPICS.filter(t => t.category === 'AI & Machine Learning').length, icon: '🤖' },
  { name: 'Web Development', count: BLUEPRINT_TOPICS.filter(t => t.category === 'Web Development').length, icon: '🌐' },
  { name: 'Mobile Development', count: BLUEPRINT_TOPICS.filter(t => t.category === 'Mobile Development').length, icon: '📱' },
  { name: 'Blockchain & Web3', count: BLUEPRINT_TOPICS.filter(t => t.category === 'Blockchain & Web3').length, icon: '⛓️' },
  { name: 'IoT & Embedded', count: BLUEPRINT_TOPICS.filter(t => t.category === 'IoT & Embedded').length, icon: '🔌' },
  { name: 'Cybersecurity', count: BLUEPRINT_TOPICS.filter(t => t.category === 'Cybersecurity').length, icon: '🔒' },
  { name: 'Data Science', count: BLUEPRINT_TOPICS.filter(t => t.category === 'Data Science').length, icon: '📊' },
  { name: 'Cloud & DevOps', count: BLUEPRINT_TOPICS.filter(t => t.category === 'Cloud & DevOps').length, icon: '☁️' },
  { name: 'AR/VR & Gaming', count: BLUEPRINT_TOPICS.filter(t => t.category === 'AR/VR & Gaming').length, icon: '🎮' },
  { name: 'FinTech', count: BLUEPRINT_TOPICS.filter(t => t.category === 'FinTech').length, icon: '💰' },
];
