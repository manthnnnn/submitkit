export interface Candidate {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  experienceYears: number;
  summary: string;
  skills: {
    languages: string[];
    frameworks: string[];
    cloudDevOps: string[];
    databases: string[];
    tools: string[];
    softSkills: string[];
  };
  experience: {
    role: string;
    company: string;
    duration: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }[];
  certifications: string[];
  status: 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer';
  appliedDate: string;
  rawResumeText: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  minExperienceYears: number;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
}

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Alex Rivera',
    title: 'Senior Full-Stack Engineer',
    email: 'alex.rivera@techdomain.io',
    phone: '+1 (555) 349-8201',
    location: 'San Francisco, CA (Remote)',
    linkedin: 'linkedin.com/in/alexrivera-dev',
    github: 'github.com/arivera-code',
    portfolio: 'alexrivera.dev',
    experienceYears: 7,
    summary: 'Senior Full-Stack Engineer with 7+ years architecting scalable cloud SaaS applications. Proven track record in React, Next.js, Node.js, TypeScript, and microservices on AWS.',
    skills: {
      languages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
      frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'TailwindCSS', 'NestJS'],
      cloudDevOps: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      databases: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma'],
      tools: ['Git', 'GraphQL', 'Webpack', 'Jest', 'Postman'],
      softSkills: ['Team Leadership', 'System Architecture', 'Agile Scrum', 'Mentorship']
    },
    experience: [
      {
        role: 'Staff Software Engineer',
        company: 'Vortex Cloud Inc.',
        duration: '2022 - Present (2 yrs)',
        highlights: [
          'Architected distributed event streaming backend serving 4.5M daily active users with 99.99% uptime.',
          'Migrated legacy monolithic application to Next.js App Router and microservices, reducing initial load latency by 48%.',
          'Mentored team of 8 engineers and introduced automated CI/CD pipelines reducing deployment failure rate by 35%.'
        ]
      },
      {
        role: 'Senior Full-Stack Developer',
        company: 'Apex Data Systems',
        duration: '2019 - 2022 (3 yrs)',
        highlights: [
          'Engineered real-time analytics dashboard with React, TypeScript, and WebSockets handling 100k events/sec.',
          'Designed PostgreSQL schema optimizations and Redis caching layers improving query throughput by 3x.'
        ]
      },
      {
        role: 'Software Engineer',
        company: 'Nexis Digital',
        duration: '2017 - 2019 (2 yrs)',
        highlights: [
          'Built RESTful APIs and interactive web interfaces using React and Node.js.',
          'Integrated Stripe payment processing and OAuth2 enterprise SSO authentication.'
        ]
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        year: '2017',
        gpa: '3.85 / 4.0'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect – Associate',
      'Certified Kubernetes Application Developer (CKAD)'
    ],
    status: 'Shortlisted',
    appliedDate: '2026-08-28',
    rawResumeText: `ALEX RIVERA
Senior Full-Stack Engineer | San Francisco, CA
alex.rivera@techdomain.io | +1 (555) 349-8201 | linkedin.com/in/alexrivera-dev | github.com/arivera-code

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 7+ years architecting scalable cloud SaaS applications. Proven track record in React, Next.js, Node.js, TypeScript, PostgreSQL, and microservices on AWS.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript, Python, Go, SQL
Frameworks & Libraries: React, Next.js, Node.js, Express, TailwindCSS, NestJS
Cloud & DevOps: AWS (ECS, S3, RDS), Docker, Kubernetes, CI/CD, Terraform
Databases: PostgreSQL, Redis, MongoDB, Prisma ORM
Tools & Practices: Git, GraphQL, Webpack, Jest, Postman, System Architecture, Agile Scrum

WORK EXPERIENCE
Staff Software Engineer — Vortex Cloud Inc. (2022 - Present)
• Architected distributed event streaming backend serving 4.5M daily active users with 99.99% uptime.
• Migrated legacy monolithic application to Next.js App Router, cutting latency by 48%.
• Mentored team of 8 engineers and introduced automated CI/CD pipelines reducing deployment failure rate by 35%.

Senior Full-Stack Developer — Apex Data Systems (2019 - 2022)
• Engineered real-time analytics dashboard with React, TypeScript, and WebSockets handling 100k events/sec.
• Designed PostgreSQL schema optimizations and Redis caching layers improving query throughput by 3x.

Software Engineer — Nexis Digital (2017 - 2019)
• Built RESTful APIs and interactive web interfaces using React and Node.js.
• Integrated Stripe payment processing and OAuth2 enterprise SSO authentication.

EDUCATION & CERTIFICATIONS
B.S. in Computer Science — UC Berkeley (2017, GPA 3.85)
AWS Certified Solutions Architect – Associate | CKAD Kubernetes Developer`
  },
  {
    id: 'cand-2',
    name: 'Dr. Priya Sharma',
    title: 'Senior AI & Machine Learning Scientist',
    email: 'priya.sharma@aiml-research.org',
    phone: '+1 (555) 812-9934',
    location: 'Seattle, WA (Hybrid)',
    linkedin: 'linkedin.com/in/drpriyasharma-ai',
    github: 'github.com/psharma-ml',
    portfolio: 'priyasharma.ai',
    experienceYears: 5,
    summary: 'Applied ML Scientist with Ph.D. and 5 years experience delivering production NLP and Generative AI systems. Expert in Transformers, PyTorch, LangChain, RAG pipelines, and vector databases.',
    skills: {
      languages: ['Python', 'C++', 'SQL', 'R'],
      frameworks: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Transformers', 'FastAPI', 'LangChain'],
      cloudDevOps: ['AWS SageMaker', 'Docker', 'MLflow', 'Kubeflow'],
      databases: ['Pinecone', 'Milvus', 'PostgreSQL (pgvector)', 'Redis'],
      tools: ['Git', 'Weights & Biases', 'ONNX', 'Jupyter'],
      softSkills: ['Research Publication', 'Scientific Communication', 'Cross-Functional Collaboration']
    },
    experience: [
      {
        role: 'Lead ML Scientist',
        company: 'CognitiveCore AI',
        duration: '2023 - Present (3 yrs)',
        highlights: [
          'Engineered enterprise Retrieval-Augmented Generation (RAG) system with 96% factual precision across 2M internal docs.',
          'Fine-tuned Llama-3 and Mistral open-source LLMs using LoRA/QLoRA, reducing inference compute costs by 62%.'
        ]
      },
      {
        role: 'NLP Research Engineer',
        company: 'DeepSemantic Labs',
        duration: '2021 - 2023 (2 yrs)',
        highlights: [
          'Trained transformer models for named-entity recognition (NER) and multi-class text categorization.',
          'Published 2 research papers at ACL on efficient attention mechanisms in low-resource domain adaptation.'
        ]
      }
    ],
    education: [
      {
        degree: 'Ph.D. in Computer Science (Artificial Intelligence)',
        institution: 'University of Washington',
        year: '2021'
      },
      {
        degree: 'B.Tech in Computer Engineering',
        institution: 'IIT Delhi',
        year: '2016'
      }
    ],
    certifications: [
      'AWS Certified Machine Learning – Specialty',
      'DeepLearning.AI Deep Learning Specialization'
    ],
    status: 'Interview',
    appliedDate: '2026-08-30',
    rawResumeText: `DR. PRIYA SHARMA
Senior AI & Machine Learning Scientist | Seattle, WA
priya.sharma@aiml-research.org | +1 (555) 812-9934 | linkedin.com/in/drpriyasharma-ai

PROFESSIONAL SUMMARY
Applied ML Scientist with Ph.D. and 5 years experience delivering production NLP and Generative AI systems. Expert in Transformers, PyTorch, LangChain, RAG pipelines, and vector databases.

SKILLS
Languages: Python, C++, SQL, R
AI/ML Frameworks: PyTorch, TensorFlow, Hugging Face, Transformers, FastAPI, LangChain, LlamaIndex
Cloud & MLOps: AWS SageMaker, Docker, MLflow, Kubeflow, Triton Inference Server
Vector DBs: Pinecone, Milvus, PostgreSQL (pgvector), Qdrant
Tools: Weights & Biases, ONNX, Git, Linux

EXPERIENCE
Lead ML Scientist — CognitiveCore AI (2023 - Present)
• Engineered enterprise RAG system with 96% factual precision across 2M documents.
• Fine-tuned Llama-3 and Mistral models with LoRA/QLoRA cutting inference costs by 62%.

NLP Research Engineer — DeepSemantic Labs (2021 - 2023)
• Trained custom BERT & RoBERTa models for entity extraction and semantic search.
• Deployed real-time inference microservices on AWS with FastAPI and Docker.

EDUCATION
Ph.D. in Computer Science (AI & NLP) — University of Washington (2021)
B.Tech in Computer Engineering — IIT Delhi (2016)`
  },
  {
    id: 'cand-3',
    name: 'Marcus Vance',
    title: 'DevOps & Cloud Infrastructure Architect',
    email: 'marcus.vance@infra-ops.net',
    phone: '+1 (555) 723-1189',
    location: 'Austin, TX (Remote)',
    linkedin: 'linkedin.com/in/marcus-vance-cloud',
    github: 'github.com/mvance-infra',
    portfolio: 'vancecloud.io',
    experienceYears: 6,
    summary: 'Cloud Infrastructure Architect with 6 years experience orchestrating zero-downtime Kubernetes deployments, multi-region AWS environments, and automated Terraform infrastructure as code.',
    skills: {
      languages: ['Bash', 'Python', 'Go', 'HCL (Terraform)'],
      frameworks: ['FastAPI', 'Express'],
      cloudDevOps: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Helm', 'ArgoCD', 'Ansible'],
      databases: ['PostgreSQL', 'Redis', 'Kafka'],
      tools: ['Prometheus', 'Grafana', 'Datadog', 'GitLab CI', 'GitHub Actions'],
      softSkills: ['Incident Management', 'SRE Best Practices', 'Security Hardening', 'Cost Optimization']
    },
    experience: [
      {
        role: 'Principal DevOps Engineer',
        company: 'CloudScale Technologies',
        duration: '2021 - Present (4 yrs)',
        highlights: [
          'Orchestrated multi-tenant Kubernetes clusters across 3 AWS regions managing 600+ microservices.',
          'Reduced monthly cloud infrastructure bill by $45,000 via auto-scaling spot instances and architectural consolidation.',
          'Achieved 99.995% service availability with automated Canary deployments via ArgoCD and Istio service mesh.'
        ]
      },
      {
        role: 'Site Reliability Engineer',
        company: 'DataFlow Systems',
        duration: '2019 - 2021 (2 yrs)',
        highlights: [
          'Constructed end-to-end monitoring and alerting stack with Prometheus, Alertmanager, and Grafana.',
          'Created automated disaster recovery failover reducing RTO from 2 hours to 4 minutes.'
        ]
      }
    ],
    education: [
      {
        degree: 'B.S. in Information Systems',
        institution: 'University of Texas at Austin',
        year: '2019'
      }
    ],
    certifications: [
      'AWS Certified Solutions Architect – Professional',
      'Certified Kubernetes Administrator (CKA)',
      'HashiCorp Certified: Terraform Associate'
    ],
    status: 'Screening',
    appliedDate: '2026-09-01',
    rawResumeText: `MARCUS VANCE
DevOps & Cloud Infrastructure Architect | Austin, TX
marcus.vance@infra-ops.net | +1 (555) 723-1189 | linkedin.com/in/marcus-vance-cloud

SUMMARY
Cloud Infrastructure Architect with 6 years experience orchestrating zero-downtime Kubernetes deployments, multi-region AWS environments, and automated Terraform infrastructure as code.

TECHNICAL SKILLS
Cloud Providers: AWS, Google Cloud Platform (GCP)
Containerization & Orchestration: Kubernetes, Docker, Helm, ArgoCD, Istio
Infrastructure as Code: Terraform, Ansible, CloudFormation
CI/CD & Scripting: GitHub Actions, GitLab CI, Python, Bash, Go
Observability: Prometheus, Grafana, Datadog, ELK Stack

EXPERIENCE
Principal DevOps Engineer — CloudScale Technologies (2021 - Present)
• Orchestrated multi-tenant Kubernetes clusters across 3 AWS regions managing 600+ microservices.
• Reduced monthly cloud infrastructure bill by $45,000 via auto-scaling spot instances and architectural consolidation.
• Achieved 99.995% service availability with automated Canary deployments via ArgoCD and Istio.

Site Reliability Engineer — DataFlow Systems (2019 - 2021)
• Constructed end-to-end monitoring and alerting stack with Prometheus and Grafana.
• Created automated disaster recovery failover reducing RTO to 4 minutes.

EDUCATION & CERTIFICATIONS
B.S. in Information Systems — UT Austin (2019)
AWS Solutions Architect Professional | CKA Kubernetes Administrator | HashiCorp Terraform Associate`
  },
  {
    id: 'cand-4',
    name: 'Elena Rostova',
    title: 'Senior Frontend & Design Technologist',
    email: 'elena.rostova@designsystems.dev',
    phone: '+1 (555) 604-2218',
    location: 'New York, NY (Hybrid)',
    linkedin: 'linkedin.com/in/elena-rostova-ux',
    github: 'github.com/erostova-ui',
    portfolio: 'elenarostova.design',
    experienceYears: 5,
    summary: 'Frontend Engineer & Design Technologist bridging the gap between Figma design systems and production React applications. Expert in Web Accessibility (WCAG AAA), CSS architecture, and motion.',
    skills: {
      languages: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3/SCSS'],
      frameworks: ['React', 'Next.js', 'Vue.js', 'TailwindCSS', 'Framer Motion', 'Storybook'],
      cloudDevOps: ['Vercel', 'Netlify', 'GitHub Actions'],
      databases: ['Supabase', 'GraphQL'],
      tools: ['Figma', 'Chromatic', 'Jest', 'Playwright', 'Adobe XD'],
      softSkills: ['Design Systems', 'WCAG Accessibility', 'User Research', 'Design Handoff']
    },
    experience: [
      {
        role: 'Lead UI/UX Technologist',
        company: 'Prism Design Lab',
        duration: '2022 - Present (3 yrs)',
        highlights: [
          'Created and maintained enterprise component library used across 14 product lines with 100% WCAG AAA accessibility compliance.',
          'Built custom motion interactions with Framer Motion, boosting user onboarding completion rate by 28%.'
        ]
      },
      {
        role: 'Frontend Developer',
        company: 'CreativePulse Studios',
        duration: '2020 - 2022 (2 yrs)',
        highlights: [
          'Developed responsive marketing portals and e-commerce storefronts with Next.js and TailwindCSS.',
          'Achieved perfect 100 Lighthouse performance and SEO scores on major client deliverables.'
        ]
      }
    ],
    education: [
      {
        degree: 'B.F.A. in Interaction Design & HCI',
        institution: 'Rhode Island School of Design (RISD)',
        year: '2020'
      }
    ],
    certifications: [
      'Certified Professional in Web Accessibility (CPWA)',
      'Nielsen Norman UX Master Certified'
    ],
    status: 'Offer',
    appliedDate: '2026-08-25',
    rawResumeText: `ELENA ROSTOVA
Senior Frontend & Design Technologist | New York, NY
elena.rostova@designsystems.dev | +1 (555) 604-2218 | linkedin.com/in/elena-rostova-ux

SUMMARY
Frontend Engineer & Design Technologist bridging the gap between Figma design systems and production React applications. Expert in Web Accessibility (WCAG AAA), CSS architecture, and motion.

SKILLS
Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3/SCSS, TailwindCSS, Framer Motion, Storybook
Design & Prototyping: Figma, Adobe XD, Design Tokens, Interaction Design, WCAG 2.1 AAA
Testing & Tools: Jest, React Testing Library, Playwright, Git, Chromatic

EXPERIENCE
Lead UI/UX Technologist — Prism Design Lab (2022 - Present)
• Created and maintained enterprise component library used across 14 product lines with 100% WCAG AAA accessibility compliance.
• Built custom motion interactions with Framer Motion, boosting user onboarding completion rate by 28%.

Frontend Developer — CreativePulse Studios (2020 - 2022)
• Developed responsive marketing portals and e-commerce storefronts with Next.js and TailwindCSS.
• Achieved perfect 100 Lighthouse performance and SEO scores on major client deliverables.

EDUCATION & CERTIFICATIONS
B.F.A. in Interaction Design & HCI — RISD (2020)
Certified Professional in Web Accessibility (CPWA) | Nielsen Norman UX Master Certified`
  }
];

export const MOCK_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Staff Full-Stack TypeScript Engineer',
    department: 'Core Platform Engineering',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    minExperienceYears: 5,
    requiredSkills: [
      'TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'System Architecture'
    ],
    preferredSkills: [
      'Kubernetes', 'GraphQL', 'Redis', 'CI/CD', 'Terraform', 'Microservices', 'Prisma'
    ],
    description: `We are looking for a Staff Full-Stack Engineer to lead the architecture of our next-generation cloud platform. You will design mission-critical services using TypeScript, Next.js, and Node.js, mentor junior engineers, and drive scalability across AWS and Kubernetes infrastructure.`
  },
  {
    id: 'job-2',
    title: 'Senior Machine Learning & NLP Engineer',
    department: 'AI & Data Science',
    location: 'Seattle, WA / Remote',
    type: 'Full-time',
    minExperienceYears: 4,
    requiredSkills: [
      'Python', 'PyTorch', 'Transformers', 'FastAPI', 'NLP', 'Docker', 'Vector Databases'
    ],
    preferredSkills: [
      'LangChain', 'LlamaIndex', 'AWS SageMaker', 'Fine-Tuning (LoRA)', 'PostgreSQL', 'MLflow'
    ],
    description: `Join our AI research team to build cutting-edge Generative AI and Retrieval-Augmented Generation (RAG) pipelines. You will fine-tune open-source models, optimize vector retrieval, and deploy low-latency inference services.`
  },
  {
    id: 'job-3',
    title: 'Lead Cloud Infrastructure & DevOps Architect',
    department: 'Site Reliability & Infrastructure',
    location: 'Austin, TX / Remote',
    type: 'Full-time',
    minExperienceYears: 5,
    requiredSkills: [
      'AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Prometheus', 'Linux'
    ],
    preferredSkills: [
      'ArgoCD', 'Helm', 'Python', 'Go', 'Datadog', 'Security Hardening', 'Cost Optimization'
    ],
    description: `Lead our cloud infrastructure team in designing multi-region, resilient Kubernetes architectures on AWS with automated Terraform and GitOps pipelines.`
  },
  {
    id: 'job-4',
    title: 'Senior Frontend & Design Systems Engineer',
    department: 'Design Technology',
    location: 'New York, NY / Remote',
    type: 'Full-time',
    minExperienceYears: 4,
    requiredSkills: [
      'React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Figma', 'Web Accessibility (WCAG)'
    ],
    preferredSkills: [
      'Storybook', 'Framer Motion', 'Design Tokens', 'GraphQL', 'Playwright', 'CSS Architecture'
    ],
    description: `Bridge the gap between design and engineering by developing our universal React component design system with pixel perfection and AAA accessibility.`
  }
];
