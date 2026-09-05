import { Candidate, JobOpening } from './mock-data';

export interface ATSScoreResult {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  breakdown: {
    skillsScore: number;       // Weight 50%
    experienceScore: number;   // Weight 30%
    educationScore: number;    // Weight 10%
    formattingScore: number;    // Weight 10%
  };
  matchedRequiredSkills: string[];
  missingRequiredSkills: string[];
  matchedPreferredSkills: string[];
  missingPreferredSkills: string[];
  recommendations: string[];
  interviewQuestions: string[];
}

export function calculateATSScore(candidate: Candidate, job: JobOpening): ATSScoreResult {
  // Flatten candidate skills
  const allCandidateSkills = new Set<string>([
    ...candidate.skills.languages,
    ...candidate.skills.frameworks,
    ...candidate.skills.cloudDevOps,
    ...candidate.skills.databases,
    ...candidate.skills.tools,
    ...candidate.skills.softSkills
  ].map(s => s.toLowerCase()));

  // 1. Required Skills Match
  const matchedRequiredSkills: string[] = [];
  const missingRequiredSkills: string[] = [];

  for (const req of job.requiredSkills) {
    if (allCandidateSkills.has(req.toLowerCase())) {
      matchedRequiredSkills.push(req);
    } else {
      missingRequiredSkills.push(req);
    }
  }

  // 2. Preferred Skills Match
  const matchedPreferredSkills: string[] = [];
  const missingPreferredSkills: string[] = [];

  for (const pref of job.preferredSkills) {
    if (allCandidateSkills.has(pref.toLowerCase())) {
      matchedPreferredSkills.push(pref);
    } else {
      missingPreferredSkills.push(pref);
    }
  }

  // Calculate Skills Score (0 - 100)
  const reqRatio = job.requiredSkills.length > 0 
    ? matchedRequiredSkills.length / job.requiredSkills.length 
    : 1;
  const prefRatio = job.preferredSkills.length > 0 
    ? matchedPreferredSkills.length / job.preferredSkills.length 
    : 1;
  
  // Required skills are weighted 75%, preferred 25% within skills component
  const skillsScore = Math.round((reqRatio * 75) + (prefRatio * 25));

  // 3. Experience Score (0 - 100)
  let experienceScore = 100;
  if (candidate.experienceYears < job.minExperienceYears) {
    const diff = job.minExperienceYears - candidate.experienceYears;
    experienceScore = Math.max(30, 100 - (diff * 22));
  } else if (candidate.experienceYears >= job.minExperienceYears) {
    experienceScore = Math.min(100, 85 + ((candidate.experienceYears - job.minExperienceYears) * 3));
  }

  // 4. Education & Relevance Score
  const educationScore = candidate.education.length > 0 ? 95 : 70;

  // 5. Formatting & Contact Compliance
  let formattingScore = 100;
  if (!candidate.email || candidate.email.includes('domain.com')) formattingScore -= 10;
  if (!candidate.phone) formattingScore -= 10;
  if (!candidate.linkedin && !candidate.github) formattingScore -= 15;
  if (candidate.summary.length < 30) formattingScore -= 15;

  // Weighted Overall ATS Score
  // 50% Skills + 30% Experience + 10% Education + 10% Formatting
  const overallScore = Math.round(
    (skillsScore * 0.50) +
    (experienceScore * 0.30) +
    (educationScore * 0.10) +
    (formattingScore * 0.10)
  );

  // Grade
  let grade: ATSScoreResult['grade'] = 'D';
  if (overallScore >= 90) grade = 'A+';
  else if (overallScore >= 80) grade = 'A';
  else if (overallScore >= 68) grade = 'B';
  else if (overallScore >= 50) grade = 'C';

  // 6. Actionable Optimization Recommendations
  const recommendations: string[] = [];
  if (missingRequiredSkills.length > 0) {
    recommendations.push(
      `Add critical required keywords to your resume: ${missingRequiredSkills.slice(0, 4).join(', ')}. ATS screeners heavily penalize their absence.`
    );
  }
  if (missingPreferredSkills.length > 0) {
    recommendations.push(
      `Consider incorporating bonus competency keywords: ${missingPreferredSkills.slice(0, 3).join(', ')} in your project descriptions.`
    );
  }
  if (candidate.experienceYears < job.minExperienceYears) {
    recommendations.push(
      `The job requires ${job.minExperienceYears}+ years experience (candidate has ${candidate.experienceYears}). Highlight freelance work, open source contributions, or high-impact capstone projects to demonstrate equivalent seniority.`
    );
  }
  if (!candidate.linkedin) {
    recommendations.push('Add an active LinkedIn profile URL to your header. Recruiter automated parsers check for social proof.');
  }
  if (!candidate.github && (job.title.includes('Engineer') || job.title.includes('Developer'))) {
    recommendations.push('Include a GitHub or GitLab profile link showing active commits and repositories.');
  }
  recommendations.push('Ensure achievements follow the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".');

  // 7. Tailored Technical Viva & Interview Questions
  const interviewQuestions: string[] = [];
  
  if (matchedRequiredSkills.includes('TypeScript') || matchedRequiredSkills.includes('JavaScript')) {
    interviewQuestions.push('How do you manage complex asynchronous concurrency and memory leakage in long-running Node/TypeScript microservices?');
  }
  if (matchedRequiredSkills.includes('React') || matchedRequiredSkills.includes('Next.js')) {
    interviewQuestions.push('Can you explain the architectural trade-offs between Server Components (RSC) and Client Components for high-throughput applications?');
  }
  if (matchedRequiredSkills.includes('Python') || matchedRequiredSkills.includes('PyTorch')) {
    interviewQuestions.push('When fine-tuning open-source models using LoRA/PEFT, how do you prevent catastrophic forgetting while minimizing VRAM footprint?');
  }
  if (matchedRequiredSkills.includes('AWS') || matchedRequiredSkills.includes('Kubernetes')) {
    interviewQuestions.push('Walk us through how you would architect a zero-downtime rolling deployment with blue-green failover on a multi-region Kubernetes cluster.');
  }
  if (missingRequiredSkills.length > 0) {
    interviewQuestions.push(`The role requires ${missingRequiredSkills[0]}. What is your experience with this technology or how quickly have you bridged similar technical gaps?`);
  }
  interviewQuestions.push(`In your role at ${candidate.experience[0]?.company || 'your previous company'}, what was the most difficult architectural bottleneck you diagnosed and resolved?`);

  return {
    overallScore,
    grade,
    breakdown: {
      skillsScore,
      experienceScore,
      educationScore,
      formattingScore
    },
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
    missingPreferredSkills,
    recommendations,
    interviewQuestions
  };
}
