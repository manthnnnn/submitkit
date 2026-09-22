export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  summary: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  estimatedReadTime: string;
  category: 'Project Ideas' | 'Guide' | 'Viva Prep' | 'IEEE Format' | 'Success Stories';
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: '500-final-year-project-ideas-2026-cse-aiml-iot',
    title: '500+ Final Year Project Ideas 2026 for CSE, AIML, IoT, FullStack & MCA',
    metaTitle: '500+ Final Year Project Ideas 2026 (CSE / AIML / IoT / FullStack / MCA)',
    metaDescription: '500+ verified final year project ideas for 2026. CSE, AIML, IoT, FullStack, Cybersecurity, DataScience, MCA, BE, BTech, Diploma. Mini, Mid & Major level, tech stack, difficulty, innovation score. Updated Sept 2026.',
    keywords: [
      'final year project ideas 2026',
      'cse project ideas',
      'aiml project topics',
      'iot project ideas engineering',
      'full stack project for final year',
      'mca final year project ideas',
      'be btech project topics',
      'mini project ideas cse',
      'major project ideas cse',
      'diploma project topics computer science',
      'innovative project ideas for engineering',
      'ieee project topics 2026',
      'rag project ideas',
      'genai project topics',
      'cybersecurity project ideas',
    ],
    summary: 'Massive curated list of 500+ final year project ideas for 2026. Organized by domain, difficulty, tech stack, and college level. Every topic includes a 1-line elevator pitch, tools required, and innovation quotient. Perfect for CSE, AIML, IoT, MCA, BE, BTech, MCA, Diploma, BE final year submissions.',
    publishedAt: '2026-09-13T00:00:00.000Z',
    updatedAt: '2026-09-13T00:00:00.000Z',
    author: 'SubmitKit Engineering Team',
    estimatedReadTime: '22 min',
    category: 'Project Ideas',
    tags: ['Project Ideas', 'CSE', 'AIML', 'IoT', 'Full Stack', 'MCA', 'BE', 'BTech', '2026'],
    featured: true,
  },
  {
    slug: 'face-recognition-attendance-system-project-report',
    title: 'Face Recognition Attendance System Project — Report, PPT, Viva Q&A, Source Code',
    metaTitle: 'Face Recognition Attendance System — Project Report, PPT & Viva Q&A 2026',
    metaDescription: 'Complete face recognition attendance system final year project guide. 60-page IEEE format report outline, PPT slides, top 25 viva questions with answers, system architecture, dataset reference, full source code kit (₹499). Perfect for CSE/AI/ML majors 2026.',
    keywords: [
      'face recognition attendance system project report',
      'face recognition attendance system project source code',
      'face recognition attendance system viva questions',
      'face recognition attendance system ppt',
      'face recognition attendance system ieee report',
      'opencv face recognition project',
      'python face recognition attendance final year',
      'face recognition project with dataset',
      'ai based attendance system project',
      'machine learning face recognition project',
      'face recognition project abstract',
      'face recognition attendance system architecture',
    ],
    summary: 'The complete student handbook for the Face Recognition Attendance System final year project. Abstract, problem statement, objectives, system architecture, algorithm comparison, module breakdown, sample database schema, IEEE report chapter-by-chapter template, PPT structure, and top 25 Viva questions with examiner-approved answers.',
    publishedAt: '2026-09-13T00:00:00.000Z',
    updatedAt: '2026-09-13T00:00:00.000Z',
    author: 'SubmitKit Engineering Team',
    estimatedReadTime: '18 min',
    category: 'Guide',
    tags: ['Face Recognition', 'Computer Vision', 'Python', 'OpenCV', 'AIML', 'Major Project'],
    featured: true,
  },
  {
    slug: 'plant-disease-detection-using-cnn-python-tensorflow',
    title: 'Plant Disease Detection Using CNN — Python, TensorFlow Project Report & Viva',
    metaTitle: 'Plant Disease Detection Using CNN — Python & TensorFlow Project Guide 2026',
    metaDescription: 'Complete plant disease detection using CNN final year project. 60-page IEEE report template, ResNet50 / MobileNet model architecture, Plant Village dataset, PPT slides, top 25 Viva Q&A with answers, full working source code kit for ₹499.',
    keywords: [
      'plant disease detection using cnn project report',
      'plant disease detection python tensorflow',
      'plant disease detection project viva questions',
      'plant village dataset cnn model',
      'resnet50 plant disease detection',
      'plant disease detection system architecture',
      'plant disease detection ieee format report',
      'agriculture ai project final year',
      'deep learning plant disease detection',
      'plant leaf disease detection project',
      'plant disease detection project abstract',
      'cnn based plant disease classification',
    ],
    summary: 'Deep dive guide for the Plant Disease Detection Using CNN final year project. Problem statement, literature survey, ResNet50 & MobileNet architecture comparison, Plant Village dataset download, data augmentation pipeline, system architecture diagram, full IEEE report outline, PPT slide deck, and 25 most-asked Viva questions.',
    publishedAt: '2026-09-13T00:00:00.000Z',
    updatedAt: '2026-09-13T00:00:00.000Z',
    author: 'SubmitKit Engineering Team',
    estimatedReadTime: '15 min',
    category: 'Guide',
    tags: ['Plant Disease', 'CNN', 'TensorFlow', 'Python', 'Agriculture AI', 'Major Project'],
    featured: true,
  },
  {
    slug: 'credit-card-fraud-detection-machine-learning-project',
    title: 'Credit Card Fraud Detection Machine Learning Project — Report, PPT & Source Code',
    metaTitle: 'Credit Card Fraud Detection ML Project — Report, PPT, Viva & Code 2026',
    metaDescription: 'Complete Credit Card Fraud Detection machine learning final year project. IEEE format report structure, SMOTE + Random Forest / XGBoost / Isolation Forest pipeline, Kaggle dataset, 25 Viva Q&A with answers, full runnable source code kit for ₹499. CSE & FinTech majors 2026.',
    keywords: [
      'credit card fraud detection machine learning project report',
      'credit card fraud detection project source code python',
      'credit card fraud detection viva questions',
      'credit card fraud detection dataset kaggle',
      'credit card fraud detection using random forest',
      'credit card fraud detection project ppt',
      'smote imbalanced dataset fraud',
      'xgboost credit card fraud detection',
      'credit card fraud detection architecture',
      'machine learning fraud detection ieee report',
      'credit card fraud detection abstract',
      'fintech final year project fraud',
    ],
    summary: 'Full walkthrough of the Credit Card Fraud Detection final year ML project. Imbalanced dataset handling (SMOTE, ADASYN), model comparison (Logistic Regression, Random Forest, XGBoost, Isolation Forest, Autoencoders), evaluation metrics (precision, recall, F1, PR-AUC, ROC-AUC), full IEEE report structure, PPT outline, Viva Q&A.',
    publishedAt: '2026-09-13T00:00:00.000Z',
    updatedAt: '2026-09-13T00:00:00.000Z',
    author: 'SubmitKit Engineering Team',
    estimatedReadTime: '16 min',
    category: 'Guide',
    tags: ['Fraud Detection', 'Machine Learning', 'Python', 'FinTech', 'XGBoost', 'Major Project'],
    featured: true,
  },
  {
    slug: 'ieee-black-book-report-format-final-year-template',
    title: 'IEEE Black Book Report Format — 60-Page Final Year Template (With Sample Chapters)',
    metaTitle: 'IEEE Black Book Report Format — 60-Page Final Year Template 2026',
    metaDescription: 'Official IEEE format final year engineering Black Book report template. 14-chapter structure (Abstract → Future Scope), page count per chapter, sample content, diagrams, references format, VTU, SPPU, Mumbai, Anna, JNTU, GTU & all university guidelines. Free PDF download + editable .docx available.',
    keywords: [
      'ieee black book report format final year',
      'final year project report format ieee',
      'black book report template',
      'ieee format project report chapters',
      'vtu black book format 2026',
      'sppu final year project report format',
      'mumbai university ieee project report',
      'anna university project report format',
      'jntu black book format',
      'gtu final year project report template',
      'project report abstract example',
      'project report literature survey chapter',
      'ieee reference format engineering',
      'project report system architecture chapter',
      'final year black book pages count',
      'editable ieee report docx download',
    ],
    summary: 'The only IEEE Black Book report format guide you will ever need. Exact 14-chapter structure, page counts, font settings (Times New Roman 12pt, 1.5 spacing), chapter-by-chapter writing guide with sample sentences, table of contents layout, reference format (APA 7th / IEEE), diagrams placement, and university-specific adjustments (VTU, SPPU, Mumbai, Anna, JNTU, GTU, RGPV, MDU).',
    publishedAt: '2026-09-13T00:00:00.000Z',
    updatedAt: '2026-09-13T00:00:00.000Z',
    author: 'SubmitKit Engineering Team',
    estimatedReadTime: '20 min',
    category: 'IEEE Format',
    tags: ['IEEE Report', 'Black Book', 'Final Year', 'Template', 'VTU', 'SPPU', 'Mumbai University', 'Anna University', 'GTU', 'JNTU'],
    featured: true,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter(p => p.featured).slice(0, 5);
}
