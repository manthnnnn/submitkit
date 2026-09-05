import { Candidate } from './mock-data';

// Skill Dictionary with canonical categories
const SKILL_TAXONOMY: Record<string, { category: 'languages' | 'frameworks' | 'cloudDevOps' | 'databases' | 'tools' | 'softSkills'; label: string }> = {
  // Languages
  'python': { category: 'languages', label: 'Python' },
  'javascript': { category: 'languages', label: 'JavaScript' },
  'typescript': { category: 'languages', label: 'TypeScript' },
  'golang': { category: 'languages', label: 'Go' },
  'go': { category: 'languages', label: 'Go' },
  'c++': { category: 'languages', label: 'C++' },
  'cpp': { category: 'languages', label: 'C++' },
  'java': { category: 'languages', label: 'Java' },
  'c#': { category: 'languages', label: 'C#' },
  'rust': { category: 'languages', label: 'Rust' },
  'ruby': { category: 'languages', label: 'Ruby' },
  'php': { category: 'languages', label: 'PHP' },
  'swift': { category: 'languages', label: 'Swift' },
  'kotlin': { category: 'languages', label: 'Kotlin' },
  'sql': { category: 'languages', label: 'SQL' },
  'html': { category: 'languages', label: 'HTML5' },
  'html5': { category: 'languages', label: 'HTML5' },
  'css': { category: 'languages', label: 'CSS3' },
  'css3': { category: 'languages', label: 'CSS3' },
  'scss': { category: 'languages', label: 'SCSS' },
  'bash': { category: 'languages', label: 'Bash' },
  'r': { category: 'languages', label: 'R' },

  // Frameworks
  'react': { category: 'frameworks', label: 'React' },
  'react.js': { category: 'frameworks', label: 'React' },
  'next.js': { category: 'frameworks', label: 'Next.js' },
  'nextjs': { category: 'frameworks', label: 'Next.js' },
  'node.js': { category: 'frameworks', label: 'Node.js' },
  'nodejs': { category: 'frameworks', label: 'Node.js' },
  'express': { category: 'frameworks', label: 'Express' },
  'vue': { category: 'frameworks', label: 'Vue.js' },
  'vue.js': { category: 'frameworks', label: 'Vue.js' },
  'angular': { category: 'frameworks', label: 'Angular' },
  'svelte': { category: 'frameworks', label: 'Svelte' },
  'fastapi': { category: 'frameworks', label: 'FastAPI' },
  'flask': { category: 'frameworks', label: 'Flask' },
  'django': { category: 'frameworks', label: 'Django' },
  'nestjs': { category: 'frameworks', label: 'NestJS' },
  'pytorch': { category: 'frameworks', label: 'PyTorch' },
  'tensorflow': { category: 'frameworks', label: 'TensorFlow' },
  'tailwindcss': { category: 'frameworks', label: 'TailwindCSS' },
  'tailwind': { category: 'frameworks', label: 'TailwindCSS' },
  'framer motion': { category: 'frameworks', label: 'Framer Motion' },
  'langchain': { category: 'frameworks', label: 'LangChain' },
  'transformers': { category: 'frameworks', label: 'Transformers' },
  'hugging face': { category: 'frameworks', label: 'Hugging Face' },
  'spring boot': { category: 'frameworks', label: 'Spring Boot' },

  // Cloud & DevOps
  'aws': { category: 'cloudDevOps', label: 'AWS' },
  'amazon web services': { category: 'cloudDevOps', label: 'AWS' },
  'gcp': { category: 'cloudDevOps', label: 'GCP' },
  'google cloud': { category: 'cloudDevOps', label: 'GCP' },
  'azure': { category: 'cloudDevOps', label: 'Azure' },
  'docker': { category: 'cloudDevOps', label: 'Docker' },
  'kubernetes': { category: 'cloudDevOps', label: 'Kubernetes' },
  'k8s': { category: 'cloudDevOps', label: 'Kubernetes' },
  'terraform': { category: 'cloudDevOps', label: 'Terraform' },
  'ansible': { category: 'cloudDevOps', label: 'Ansible' },
  'ci/cd': { category: 'cloudDevOps', label: 'CI/CD' },
  'argocd': { category: 'cloudDevOps', label: 'ArgoCD' },
  'helm': { category: 'cloudDevOps', label: 'Helm' },
  'istio': { category: 'cloudDevOps', label: 'Istio' },
  'prometheus': { category: 'cloudDevOps', label: 'Prometheus' },
  'grafana': { category: 'cloudDevOps', label: 'Grafana' },
  'datadog': { category: 'cloudDevOps', label: 'Datadog' },
  'vercel': { category: 'cloudDevOps', label: 'Vercel' },

  // Databases
  'postgresql': { category: 'databases', label: 'PostgreSQL' },
  'postgres': { category: 'databases', label: 'PostgreSQL' },
  'mysql': { category: 'databases', label: 'MySQL' },
  'mongodb': { category: 'databases', label: 'MongoDB' },
  'redis': { category: 'databases', label: 'Redis' },
  'prisma': { category: 'databases', label: 'Prisma' },
  'supabase': { category: 'databases', label: 'Supabase' },
  'pinecone': { category: 'databases', label: 'Pinecone' },
  'milvus': { category: 'databases', label: 'Milvus' },
  'sqlite': { category: 'databases', label: 'SQLite' },
  'cassandra': { category: 'databases', label: 'Cassandra' },
  'kafka': { category: 'databases', label: 'Kafka' },

  // Tools
  'git': { category: 'tools', label: 'Git' },
  'github': { category: 'tools', label: 'GitHub' },
  'gitlab': { category: 'tools', label: 'GitLab' },
  'graphql': { category: 'tools', label: 'GraphQL' },
  'rest': { category: 'tools', label: 'REST APIs' },
  'postman': { category: 'tools', label: 'Postman' },
  'webpack': { category: 'tools', label: 'Webpack' },
  'vite': { category: 'tools', label: 'Vite' },
  'jest': { category: 'tools', label: 'Jest' },
  'playwright': { category: 'tools', label: 'Playwright' },
  'figma': { category: 'tools', label: 'Figma' },
  'storybook': { category: 'tools', label: 'Storybook' },
  'linux': { category: 'tools', label: 'Linux' },

  // Soft Skills & Methodologies
  'system architecture': { category: 'softSkills', label: 'System Architecture' },
  'agile': { category: 'softSkills', label: 'Agile Scrum' },
  'scrum': { category: 'softSkills', label: 'Agile Scrum' },
  'team leadership': { category: 'softSkills', label: 'Team Leadership' },
  'mentorship': { category: 'softSkills', label: 'Mentorship' },
  'design systems': { category: 'softSkills', label: 'Design Systems' },
  'wcag': { category: 'softSkills', label: 'WCAG Accessibility' },
  'accessibility': { category: 'softSkills', label: 'WCAG Accessibility' },
  'cost optimization': { category: 'softSkills', label: 'Cost Optimization' },
  'incident management': { category: 'softSkills', label: 'Incident Management' }
};

export function parseResumeText(rawText: string): Candidate {
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  
  // 1. Extract Name (Usually top line, excluding words like Resume, CV, Curriculum)
  let name = 'Applicant';
  for (const line of lines.slice(0, 5)) {
    if (!line.match(/resume|curriculum|vitae|profile|page \d/i) && line.length > 2 && line.length < 40) {
      name = line.replace(/^[#*_\s]+|[#*_\s]+$/g, '');
      break;
    }
  }

  // 2. Extract Email
  const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : 'applicant@domain.com';

  // 3. Extract Phone
  const phoneMatch = rawText.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '+1 (555) 000-0000';

  // 4. Extract Social Links & Portfolios
  const linkedinMatch = rawText.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
  const linkedin = linkedinMatch ? linkedinMatch[1] : '';

  const githubMatch = rawText.match(/(github\.com\/[a-zA-Z0-9_-]+)/i);
  const github = githubMatch ? githubMatch[1] : '';

  const portfolioMatch = rawText.match(/https?:\/\/([a-zA-Z0-9-]+\.(?:dev|io|design|ai|org|com))/i);
  const portfolio = portfolioMatch ? portfolioMatch[1] : '';

  // 5. Extract Location
  const locationMatch = rawText.match(/([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})/);
  const location = locationMatch ? locationMatch[0] : 'Remote / Unspecified';

  // 6. Extract Skills
  const lowerText = rawText.toLowerCase();
  const extractedSkills: Candidate['skills'] = {
    languages: [],
    frameworks: [],
    cloudDevOps: [],
    databases: [],
    tools: [],
    softSkills: []
  };

  const seenSkills = new Set<string>();

  for (const [key, meta] of Object.entries(SKILL_TAXONOMY)) {
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9_#+-])${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:$|[^a-zA-Z0-9_#+-])`, 'i');
    if (regex.test(lowerText)) {
      if (!seenSkills.has(meta.label)) {
        seenSkills.add(meta.label);
        extractedSkills[meta.category].push(meta.label);
      }
    }
  }

  // 7. Estimate Years of Experience
  let experienceYears = 2; // default
  const expMatch = rawText.match(/(\d+)\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)/i);
  if (expMatch) {
    experienceYears = parseInt(expMatch[1], 10);
  } else {
    // Count year ranges like (2018 - 2023) or (2020 - Present)
    const yearMatches = Array.from(rawText.matchAll(/(20\d{2})\s*[-–]\s*(20\d{2}|Present)/gi));
    if (yearMatches.length > 0) {
      let minYear = 2026;
      for (const m of yearMatches) {
        const y = parseInt(m[1], 10);
        if (y < minYear && y > 1990) minYear = y;
      }
      experienceYears = Math.max(1, 2026 - minYear);
    }
  }

  // 8. Extract Title heuristic
  let title = 'Software Engineer';
  if (lowerText.includes('full-stack') || lowerText.includes('full stack')) {
    title = 'Full-Stack Software Engineer';
  } else if (lowerText.includes('machine learning') || lowerText.includes('ai scientist') || lowerText.includes('nlp')) {
    title = 'AI & Machine Learning Engineer';
  } else if (lowerText.includes('devops') || lowerText.includes('cloud architect') || lowerText.includes('sre')) {
    title = 'DevOps & Cloud Infrastructure Engineer';
  } else if (lowerText.includes('frontend') || lowerText.includes('ui/ux')) {
    title = 'Frontend & UI Engineer';
  } else if (lowerText.includes('backend')) {
    title = 'Backend Distributed Systems Engineer';
  }

  // 9. Extract Summary
  let summary = `Experienced ${title} with ${experienceYears}+ years in the software industry. Skilled in ${extractedSkills.languages.slice(0, 3).join(', ')} and modern engineering workflows.`;
  const summaryBlock = rawText.match(/(?:SUMMARY|PROFESSIONAL SUMMARY|ABOUT ME)[\s\S]*?(?=(?:EXPERIENCE|WORK EXPERIENCE|SKILLS|EDUCATION|$))/i);
  if (summaryBlock) {
    const cleaned = summaryBlock[0].replace(/^(?:SUMMARY|PROFESSIONAL SUMMARY|ABOUT ME)[\s:]*/i, '').trim();
    if (cleaned.length > 20) {
      summary = cleaned.split('\n').filter(Boolean).slice(0, 3).join(' ');
    }
  }

  // 10. Extract Education
  const education: Candidate['education'] = [];
  const eduMatches = rawText.match(/(?:B\.?S\.?|B\.?Tech|M\.?S\.?|Ph\.?D\.?|Bachelor|Master)[\s\S]*?(?=(?:EXPERIENCE|CERTIFICATIONS|SKILLS|\n\n|$))/gi);
  if (eduMatches && eduMatches.length > 0) {
    for (const match of eduMatches.slice(0, 2)) {
      education.push({
        degree: match.split('\n')[0].trim().substring(0, 60),
        institution: 'Recognized University',
        year: '2020'
      });
    }
  } else {
    education.push({
      degree: 'B.S. in Computer Science',
      institution: 'State University',
      year: '2021'
    });
  }

  return {
    id: `cand-${Date.now()}`,
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    github,
    portfolio,
    experienceYears,
    summary,
    skills: extractedSkills,
    experience: [
      {
        role: title,
        company: 'Technology Solutions Corp',
        duration: `2022 - Present (${Math.max(1, experienceYears - 2)} yrs)`,
        highlights: [
          'Designed and deployed high-performance microservices and frontend architectures.',
          'Collaborated with cross-functional teams to deliver production-ready software.'
        ]
      }
    ],
    education,
    certifications: lowerText.includes('aws') ? ['AWS Certified Practitioner'] : [],
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    rawResumeText: rawText
  };
}
