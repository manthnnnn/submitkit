import { Category, DimensionScore } from './types';

// The 10 core dimensions evaluated for every project
export const BENCHMARK_DIMENSIONS = [
  'Core Functionality',
  'Architecture & Design',
  'Technical Depth',
  'Deployment & DevOps',
  'API & Integrations',
  'UX & Product Polish',
  'Security & Safety',
  'Testing & Quality',
  'Documentation',
  'AI/ML & Data Depth'
] as const;

// Base configuration for different project categories
export const CATEGORY_WEIGHTS: Record<Category, Record<string, number>> = {
  WEB_FULLSTACK: {
    'Core Functionality': 20,
    'Architecture & Design': 15,
    'Technical Depth': 15,
    'Deployment & DevOps': 10,
    'API & Integrations': 10,
    'UX & Product Polish': 10,
    'Security & Safety': 10,
    'Testing & Quality': 5,
    'Documentation': 5,
    'AI/ML & Data Depth': 0, // N/A
  },
  AIML: {
    'AI/ML & Data Depth': 30,
    'Core Functionality': 15,
    'Architecture & Design': 15,
    'Deployment & DevOps': 5,
    'Testing & Quality': 10,
    'Documentation': 15,
    'API & Integrations': 10,
    'UX & Product Polish': 0,
    'Security & Safety': 0,
    'Technical Depth': 0,
  },
  WEB_FRONTEND: {
    'UX & Product Polish': 30,
    'Core Functionality': 20,
    'Architecture & Design': 15,
    'API & Integrations': 15, // interacting with external APIs
    'Deployment & DevOps': 10,
    'Documentation': 5,
    'Testing & Quality': 5,
    'Technical Depth': 0,
    'Security & Safety': 0,
    'AI/ML & Data Depth': 0,
  },
  MOBILE: {
    'UX & Product Polish': 25,
    'Core Functionality': 20,
    'Architecture & Design': 15,
    'API & Integrations': 15,
    'Deployment & DevOps': 10,
    'Testing & Quality': 5,
    'Security & Safety': 5,
    'Documentation': 5,
    'Technical Depth': 0,
    'AI/ML & Data Depth': 0,
  },
  DATA_SCIENCE: {
    'AI/ML & Data Depth': 40,
    'Documentation': 20,
    'Core Functionality': 20,
    'Architecture & Design': 10,
    'Testing & Quality': 10,
    'UX & Product Polish': 0,
    'Deployment & DevOps': 0,
    'API & Integrations': 0,
    'Security & Safety': 0,
    'Technical Depth': 0,
  },
  ALGORITHM_CLI: {
    'Core Functionality': 30,
    'Technical Depth': 30,
    'Architecture & Design': 15,
    'Testing & Quality': 15,
    'Documentation': 10,
    'UX & Product Polish': 0,
    'Deployment & DevOps': 0,
    'API & Integrations': 0,
    'Security & Safety': 0,
    'AI/ML & Data Depth': 0,
  },
  SOFTWARE_PROJECT: {
    'Core Functionality': 20,
    'Architecture & Design': 20,
    'Technical Depth': 20,
    'Documentation': 20,
    'Testing & Quality': 20,
    'UX & Product Polish': 0,
    'Deployment & DevOps': 0,
    'API & Integrations': 0,
    'Security & Safety': 0,
    'AI/ML & Data Depth': 0,
  }
};
