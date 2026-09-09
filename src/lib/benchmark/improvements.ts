import { Capability, Improvement, Category } from './types';

export function generateImprovements(capabilities: Capability[], category: Category, maturityLevel: number): Improvement[] {
  const improvements: Improvement[] = [];
  
  // Find capabilities that are lacking
  const missingAuth = capabilities.find(c => c.id === 'auth' && (c.status === '❌' || c.status === '⚪'));
  const missingDb = capabilities.find(c => c.id === 'database' && (c.status === '❌' || c.status === '⚪'));
  const missingDocker = capabilities.find(c => c.id === 'docker' && (c.status === '❌' || c.status === '⚪'));
  const missingCicd = capabilities.find(c => c.id === 'cicd' && (c.status === '❌' || c.status === '⚪'));
  const missingTests = capabilities.find(c => c.id === 'testing' && (c.status === '❌' || c.status === '⚪'));
  const missingApi = capabilities.find(c => c.id === 'api' && (c.status === '❌' || c.status === '⚪'));

  // Logic to rank: Lower maturity projects need core basics (DB, Auth). Higher maturity needs DevOps (Docker, CI/CD, Tests).
  
  if (missingDb && (category === 'WEB_FULLSTACK' || category === 'WEB_FRONTEND')) {
    improvements.push({
      title: 'Integrate a Database / Persistence Layer',
      impact: 'VERY HIGH',
      difficulty: 'MEDIUM',
      why: 'Your project currently lacks a database. Adding a database like PostgreSQL or MongoDB via an ORM (Prisma/Mongoose) is essential for moving beyond a static prototype into a functional dynamic application.'
    });
  }

  if (missingAuth && (category === 'WEB_FULLSTACK' || category === 'MOBILE')) {
    improvements.push({
      title: 'Implement User Authentication',
      impact: 'VERY HIGH',
      difficulty: 'MEDIUM',
      why: 'No authentication system was detected. Secure user login (via JWT, NextAuth, or Supabase) is a critical requirement for production-grade applications.'
    });
  }

  if (missingApi && category === 'AIML') {
    improvements.push({
      title: 'Wrap Model in a REST API',
      impact: 'HIGH',
      difficulty: 'MEDIUM',
      why: 'Your machine learning model is isolated. Exposing it via a framework like FastAPI or Flask will allow frontends and other services to actually use your model.'
    });
  }

  if (missingDocker && maturityLevel >= 3) {
    improvements.push({
      title: 'Containerize with Docker',
      impact: 'HIGH',
      difficulty: 'MEDIUM',
      why: 'Your code runs locally, but lacks containerization. Adding a Dockerfile ensures your project runs exactly the same way in production as it does on your machine.'
    });
  }

  if (missingTests && maturityLevel >= 2) {
    improvements.push({
      title: 'Add Automated Testing',
      impact: 'HIGH',
      difficulty: 'HARD',
      why: 'No automated tests were found. Implementing unit tests (e.g., using Jest or PyTest) will prevent regressions and show employers you write reliable code.'
    });
  }

  if (missingCicd && maturityLevel >= 4) {
    improvements.push({
      title: 'Set up CI/CD Pipeline',
      impact: 'MEDIUM',
      difficulty: 'HARD',
      why: 'You have a mature application, but manual deployments are risky. Adding GitHub Actions to automatically run tests and deploy will elevate this to a Level 6 project.'
    });
  }

  // Fallback if the project is excellent
  if (improvements.length === 0) {
    if (maturityLevel < 6) {
      improvements.push({
        title: 'Improve Documentation and Refactor',
        impact: 'MEDIUM',
        difficulty: 'EASY',
        why: 'While your core technical pillars are present, elevating the code quality through refactoring and adding JSDoc/docstrings will push your score higher.'
      });
    }
  }

  // Sort by Impact (VERY HIGH > HIGH > MEDIUM) and return top 3
  const impactScore = { 'VERY HIGH': 3, 'HIGH': 2, 'MEDIUM': 1 };
  
  return improvements
    .sort((a, b) => impactScore[b.impact] - impactScore[a.impact])
    .slice(0, 3);
}
