export const CONSTANTS = {
  APP_NAME: 'SubmitKit',
  APP_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  SUPPORT_EMAIL: 'team@submitkit.in',
  
  TOTAL_TOPICS: 1250,
  PRICING: {
    MINI_PROJECT: 299,
    MAJOR_PROJECT: 499,
    BLUEPRINT: 19,
    ADDONS: {
      PERSONALIZATION: 99,
      PLAGIARISM_CERT: 99,
      VIVA_CALL: 299
    }
  },
  
  LIMITS: {
    MAX_DOWNLOADS: 3,
    DOWNLOAD_LINK_TTL_SECONDS: 600 // 10 minutes
  },
  
  CATEGORIES: [
    { value: 'AIML', label: 'AI & Machine Learning' },
    { value: 'FullStack', label: 'Modern Full-Stack' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'FinTech', label: 'FinTech' },
    { value: 'Cloud', label: 'Cloud & DevOps' }
  ]
};

