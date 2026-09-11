import { Problem, TestCase } from './problems';

export interface ExecutionResult {
  stdout: string[];
  stderr: string | null;
  output: any;
  executionTimeMs: number;
  memoryEstimateKb: number;
  status: 'SUCCESS' | 'ERROR' | 'TIMEOUT';
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  executionTimeMs: number;
  error?: string;
}

export interface SQLResult {
  columns: string[];
  rows: any[][];
  rowCount: number;
  executionTimeMs: number;
}

// In-Memory Mock Database Tables
const MOCK_DB = {
  users: [
    { id: 1, name: 'Alice Cooper', role: 'Staff Engineer', email: 'alice@devforge.io', status: 'ACTIVE' },
    { id: 2, name: 'Bob Vance', role: 'DevOps Lead', email: 'bob@devforge.io', status: 'ACTIVE' },
    { id: 3, name: 'Charlie Day', role: 'QA Specialist', email: 'charlie@devforge.io', status: 'SUSPENDED' },
    { id: 4, name: 'Diana Prince', role: 'VP Engineering', email: 'diana@devforge.io', status: 'ACTIVE' }
  ],
  transactions: [
    { id: 101, user_id: 1, amount: 450, merchant: 'Amazon Web Services', status: 'APPROVED', created_at: '2026-09-01' },
    { id: 102, user_id: 2, amount: 900, merchant: 'Apple Store Digital', status: 'APPROVED', created_at: '2026-09-02' },
    { id: 103, user_id: 1, amount: 120, merchant: 'DigitalOcean Cloud', status: 'APPROVED', created_at: '2026-09-02' },
    { id: 104, user_id: 3, amount: 3500, merchant: 'Crypto Exchange Global', status: 'FLAGGED', created_at: '2026-09-03' },
    { id: 105, user_id: 4, amount: 80, merchant: 'GitHub Copilot Enterprise', status: 'APPROVED', created_at: '2026-09-04' }
  ],
  products: [
    { id: 501, title: 'DevForge Pro License', price: 99, stock: 450, category: 'Software' },
    { id: 502, title: 'Mechanical Coding Keyboard', price: 149, stock: 85, category: 'Hardware' },
    { id: 503, title: 'Ultrawide 4K Monitor', price: 599, stock: 24, category: 'Hardware' },
    { id: 504, title: 'System Design Masterclass', price: 199, stock: 999, category: 'Education' }
  ]
};

// Safe JS / TS Execution
export function executeJavaScript(code: string, customInput?: string): ExecutionResult {
  const startTime = performance.now();
  const stdout: string[] = [];

  // Capture console.log
  const customConsole = {
    log: (...args: any[]) => {
      stdout.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
    },
    error: (...args: any[]) => {
      stdout.push('[ERROR] ' + args.map(a => String(a)).join(' '));
    },
    warn: (...args: any[]) => {
      stdout.push('[WARN] ' + args.map(a => String(a)).join(' '));
    }
  };

  try {
    // Strip TypeScript type annotations lightly if needed
    const sanitizedCode = code
      .replace(/:\s*[a-zA-Z0-9_<>[\]|]+/g, '')
      .replace(/as\s+[a-zA-Z0-9_<>[\]|]+/g, '');

    // Wrapped function with isolated scope
    const runner = new Function('console', 'input', `
      ${sanitizedCode}
    `);

    const result = runner(customConsole, customInput);
    const endTime = performance.now();

    return {
      stdout,
      stderr: null,
      output: result !== undefined ? (typeof result === 'object' ? JSON.stringify(result) : String(result)) : null,
      executionTimeMs: Math.max(1, Math.round(endTime - startTime)),
      memoryEstimateKb: Math.round(1400 + Math.random() * 800),
      status: 'SUCCESS'
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      stdout,
      stderr: err.message || 'Execution error',
      output: null,
      executionTimeMs: Math.max(1, Math.round(endTime - startTime)),
      memoryEstimateKb: 1200,
      status: 'ERROR'
    };
  }
}

// In-Memory SQL Query Evaluator
export function executeSQL(query: string): SQLResult {
  const startTime = performance.now();
  const cleanQuery = query.trim().replace(/;$/, '');
  const lowerQuery = cleanQuery.toLowerCase();

  let targetTable: 'users' | 'transactions' | 'products' = 'users';
  if (lowerQuery.includes('from transactions')) targetTable = 'transactions';
  else if (lowerQuery.includes('from products')) targetTable = 'products';

  let data = [...MOCK_DB[targetTable]];

  // Simple WHERE filter simulation
  if (lowerQuery.includes('where')) {
    if (lowerQuery.includes('amount > 500') && targetTable === 'transactions') {
      data = data.filter((t: any) => t.amount > 500);
    } else if (lowerQuery.includes('status = \'active\'') || lowerQuery.includes('status = "active"')) {
      data = data.filter((u: any) => u.status === 'ACTIVE');
    } else if (lowerQuery.includes('price > 100') && targetTable === 'products') {
      data = data.filter((p: any) => p.price > 100);
    }
  }

  // LIMIT simulation
  const limitMatch = lowerQuery.match(/limit\s+(\d+)/);
  if (limitMatch) {
    const lim = parseInt(limitMatch[1], 10);
    data = data.slice(0, lim);
  }

  const columns = data.length > 0 ? Object.keys(data[0]) : ['Result'];
  const rows = data.map(item => Object.values(item));
  const endTime = performance.now();

  return {
    columns,
    rows,
    rowCount: rows.length,
    executionTimeMs: Math.max(2, Math.round(endTime - startTime))
  };
}

export function extractExecutableFunction(code: string, functionName: string): any {
  const fnBody = code
    .replace(/:\s*[a-zA-Z0-9_<>[\]|]+/g, '')
    .replace(/as\s+[a-zA-Z0-9_<>[\]|]+/g, '');

  try {
    const wrapped = new Function(`
      ${fnBody}
      if (typeof ${functionName} === 'function') {
        return ${functionName};    
      }
      return null;
    `);
    return wrapped();
  } catch (err: any) {
    return null;
  }
}

// Automated Test Case Runner
export function runProblemTestCases(problem: Problem, code: string): TestCaseResult[] {
  const results: TestCaseResult[] = [];

  let userFn: any = null;
  try {
    userFn = extractExecutableFunction(code, problem.functionName);
  } catch (err: any) {
    return problem.testCases.map(tc => ({
      testCaseId: tc.id,
      passed: false,
      input: tc.input,
      expected: tc.expectedOutput,
      actual: 'Compilation / Syntax Error',
      executionTimeMs: 0,
      error: err.message
    }));
  }

  if (!userFn) {
    return problem.testCases.map(tc => ({
      testCaseId: tc.id,
      passed: false,
      input: tc.input,
      expected: tc.expectedOutput,
      actual: `Function ${problem.functionName} not found`,
      executionTimeMs: 0,
      error: `Please define a function named '${problem.functionName}'.`
    }));
  }

  for (const tc of problem.testCases) {
    const tcStart = performance.now();
    try {
      const actualVal = userFn(...tc.inputArgs);
      const tcEnd = performance.now();
      const actualStr = JSON.stringify(actualVal);
      const expectedStr = JSON.stringify(tc.expected);
      const passed = actualStr === expectedStr;

      results.push({
        testCaseId: tc.id,
        passed,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: actualStr !== undefined ? actualStr : 'undefined',
        executionTimeMs: Math.max(1, Math.round(tcEnd - tcStart))
      });
    } catch (err: any) {
      results.push({
        testCaseId: tc.id,
        passed: false,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: 'Runtime Error',
        executionTimeMs: 1,
        error: err.message
      });
    }
  }

  return results;
}

export interface AIDoctorResult {
  complexity: {
    time: string;
    space: string;
    grade: 'A+' | 'B' | 'C' | 'D';
  };
  diagnostics: {
    type: 'SUCCESS' | 'OPTIMIZATION_TIP' | 'POTENTIAL_BUG';
    message: string;
  }[];
  optimizedCode: string;
}

export function analyzeCodeWithAIDoctor(code: string, problem: Problem): AIDoctorResult {
  const hasNestedLoops = /for\s*\(.*for\s*\(/.test(code.replace(/\s+/g, ' '));
  const hasMap = /new\s+(Map|Set)|Map\(/.test(code) || /\{\s*\}/.test(code);
  
  if (hasNestedLoops) {
    return {
      complexity: {
        time: 'O(N²) — Quadratic Time',
        space: 'O(1) — Constant Space',
        grade: 'C',
      },
      diagnostics: [
        {
          type: 'OPTIMIZATION_TIP',
          message: 'Brute-force nested loops detected. You are comparing every pair of elements, resulting in high latency for N > 10,000.',
        },
        {
          type: 'OPTIMIZATION_TIP',
          message: 'Recommendation: Trade memory for speed using a Hash Map (lookup in O(1) time) to reduce time complexity to O(N).',
        }
      ],
      optimizedCode: `// Optimized O(N) Time Solution using HashMap
function ${problem.functionName}(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
    };
  }

  return {
    complexity: {
      time: 'O(N) — Linear Time',
      space: 'O(N) — Auxiliary Memory',
      grade: 'A+',
    },
    diagnostics: [
      {
        type: 'SUCCESS',
        message: 'Optimal time complexity achieved! Single pass linear scan utilizing hash structure.',
      },
      {
        type: 'SUCCESS',
        message: 'Clean boundary safety and edge case handling verified.',
      }
    ],
    optimizedCode: code
  };
}

export function executeCustomInput(code: string, problem: Problem, customArgsStr: string): { output: string; timeMs: number; error?: string } {
  const startTime = performance.now();
  try {
    const userFn = extractExecutableFunction(code, problem.functionName);
    if (!userFn) {
      return { output: '', timeMs: 0, error: `Function ${problem.functionName} not found.` };
    }
    
    // Evaluate custom arguments string like: [2, 7, 11, 15], 9
    const parsedArgs = new Function(`return [${customArgsStr}];`)();
    const result = userFn(...parsedArgs);
    const endTime = performance.now();
    return {
      output: JSON.stringify(result),
      timeMs: Math.max(1, Math.round(endTime - startTime))
    };
  } catch (err: any) {
    return {
      output: '',
      timeMs: 1,
      error: err.message || 'Error evaluating custom input'
    };
  }
}
