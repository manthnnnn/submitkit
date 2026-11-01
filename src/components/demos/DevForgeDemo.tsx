'use client';

import { useState } from 'react';
import { 
  Play, Terminal, Zap,
  ArrowRight, Sparkles, Database
} from 'lucide-react';

export default function DevForgeLandingPage() {
  const [activeLang, setActiveLang] = useState<'javascript' | 'python' | 'sql'>('javascript');
  const [isRunningHero, setIsRunningHero] = useState<boolean>(false);
  const [heroOutput, setHeroOutput] = useState<string | null>(null);

  const snippets = {
    javascript: `// DevForge Live WebAssembly JIT Engine
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
}
console.log(twoSum([2, 7, 11, 15], 9));`,
    python: `# Python 3.12 Sandboxed Micro-VM
def max_subarray(nums):
    max_sum = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        max_sum = max(max_sum, cur)
    return max_sum

print(f"Max Kadane: {max_subarray([-2,1,-3,4,-1,2,1,-5,4])}")`,
    sql: `-- In-Memory Relational Engine
SELECT d.name AS dept, AVG(e.salary) AS avg_sal
FROM employees e
JOIN departments d ON e.dept_id = d.id
GROUP BY d.name
HAVING AVG(e.salary) > 85000;`
  };

  const outputs = {
    javascript: `[EXECUTION FINISHED in 12ms]
[STDOUT]: [ 0, 1 ]
[HEAP MEMORY]: 1,842 KB
[STATUS]: PASS (O(N) Optimal Complexity Verified)`,
    python: `[EXECUTION FINISHED in 18ms]
[STDOUT]: Max Kadane: 6
[HEAP MEMORY]: 2,120 KB
[STATUS]: PASS (Memory Limit Exceeded: 0%)`,
    sql: `[QUERY COMPLETED in 8ms]
[ROW COUNT]: 2 rows returned
| dept         | avg_sal   |
| Core Systems | 142,500.0 |
| AI Research  | 168,000.0 |`
  };

  const handleRunHero = () => {
    setIsRunningHero(true);
    setHeroOutput(null);
    setTimeout(() => {
      setHeroOutput(outputs[activeLang]);
      setIsRunningHero(false);
    }, 450);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      color: '#0F172A',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Background Soft Glow */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main Hero Section */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 100px' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '880px', margin: '0 auto 60px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            color: '#6D28D9',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '24px'
          }}>
            <Zap size={14} />
            <span>WebAssembly JIT Execution • Sub-20ms Code Latency</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#0F172A',
            margin: '0 0 24px'
          }}>
            Code, Execute & Visualize <br />
            <span style={{
              background: 'linear-gradient(135deg, #7C3AED 20%, #6366F1 60%, #0284C7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Algorithms at Cloud Speed
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.6, margin: '0 0 36px', fontWeight: 400 }}>
            DevForge combines zero-install sandboxed compilation with step-by-step memory pointer visualization, in-memory SQL relational engines, and automated AI Big-O complexity audits.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#playground"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)'
              }}
            >
              <span>Launch Full Cloud IDE</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="#playground"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(15,23,42,0.06)'
              }}
            >
              <Terminal size={18} color="#7C3AED" />
              <span>Test Live in Browser</span>
            </a>
          </div>
        </div>

        {/* INTERACTIVE HERO CODE PLAYGROUND */}
        <section id="playground" style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '64px',
          boxShadow: '0 12px 36px rgba(15, 23, 42, 0.08)',
          scrollMarginTop: '80px'
        }}>
          {/* Top IDE Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 24px',
            background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['javascript', 'python', 'sql'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setActiveLang(lang); setHeroOutput(null); }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: activeLang === lang ? 'none' : '1px solid #E2E8F0',
                    background: activeLang === lang ? 'linear-gradient(135deg, #7C3AED, #6366F1)' : '#FFFFFF',
                    color: activeLang === lang ? '#ffffff' : '#475569',
                    boxShadow: activeLang === lang ? '0 2px 8px rgba(124, 58, 237, 0.25)' : 'none'
                  }}
                >
                  {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'SQL Engine'}
                </button>
              ))}
            </div>

            <button
              onClick={handleRunHero}
              disabled={isRunningHero}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '8px',
                background: isRunningHero ? '#94A3B8' : 'linear-gradient(135deg, #059669, #10b981)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.82rem',
                border: 'none',
                cursor: isRunningHero ? 'wait' : 'pointer',
                boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)'
              }}
            >
              <Play size={14} fill={isRunningHero ? 'none' : '#ffffff'} />
              <span>{isRunningHero ? 'Compiling in JIT Sandbox...' : 'Run Code'}</span>
            </button>
          </div>

          {/* Editor & Output Split Screen */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            minHeight: '340px'
          }}>
            {/* Code View */}
            <div style={{
              padding: '20px',
              background: '#FAFAFA',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              color: '#1E293B',
              lineHeight: 1.6,
              borderRight: '1px solid #E2E8F0',
              overflowX: 'auto'
            }}>
              <div style={{ color: '#64748B', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                Source Code Buffer ({activeLang.toUpperCase()})
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {snippets[activeLang]}
              </pre>
            </div>

            {/* Execution Output */}
            <div style={{
              padding: '20px',
              background: '#F8FAFC',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.82rem',
              color: '#0F172A',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ color: '#64748B', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                Virtual Execution Terminal (STDOUT / PROFILER)
              </div>

              {isRunningHero ? (
                <div style={{ color: '#0284C7', padding: '20px 0' }}>
                  &gt; Spawning isolated WebAssembly micro-container...<br />
                  &gt; Executing abstract syntax tree...
                </div>
              ) : heroOutput ? (
                <pre style={{ margin: 0, color: '#047857', whiteSpace: 'pre-wrap', background: '#F0FDF4', padding: '12px', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                  {heroOutput}
                </pre>
              ) : (
                <div style={{ color: '#64748B', padding: '20px 0' }}>
                  Click &quot;Run Code&quot; above to execute this snippet inside the isolated DevForge JIT micro-container.
                </div>
              )}

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E2E8F0', fontSize: '0.75rem', color: '#64748B' }}>
                Memory Isolation: 64MB cgroup &bull; Sandbox Bounds Checked &bull;{' '}
                <a href="#playground" style={{ color: '#7C3AED', textDecoration: 'none', fontWeight: 600 }}>Run Another Snippet ↑</a>
              </div>
            </div>
          </div>
        </section>

        {/* 10TH GRADE EXPLAINER CALLOUT */}
        <section id="guide" style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(2, 132, 199, 0.04) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎓</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              What is Big-O Code Speed? (Explained Simply for Students)
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#334155',
            lineHeight: 1.55
          }}>
            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
              <div style={{ fontWeight: 800, color: '#7C3AED', marginBottom: '6px' }}>📖 The Dictionary Analogy</div>
              If you want to find a word in a dictionary:
              - <strong>Bad Code O(N):</strong> Flipping every single page from page 1 until you find it.
              - <strong>Fast Code O(log N):</strong> Opening right in the middle, seeing if your word comes before or after, and halving the book each time!
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
              <div style={{ fontWeight: 800, color: '#0284C7', marginBottom: '6px' }}>🐢 The Nested Loop Trap</div>
              When you write a loop inside a loop, doing 1,000 items takes <strong>1,000,000 operations</strong>! DevForge AI Code Doctor flags this and teaches you how to use a Hash Table to solve it in a single pass.
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
              <div style={{ fontWeight: 800, color: '#059669', marginBottom: '6px' }}>⚡ 1-Click Code Doctor</div>
              DevForge doesn&apos;t just tell you your code is slow. It grades your performance (A+ to C) and gives you a 1-click &quot;Apply Optimization&quot; button!
            </div>
          </div>
        </section>

        {/* FEATURES BENTO GRID */}
        <section id="features" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '64px'
        }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 1px 3px rgba(15,23,42,0.04)'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED', marginBottom: '16px'
            }}>
              <Sparkles size={20} />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>AI Code Doctor</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.55 }}>
              Evaluates submitted algorithms for Big-O time and space complexity with 1-click refactoring to optimal single-pass solutions.
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 1px 3px rgba(15,23,42,0.04)'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(2, 132, 199, 0.1)', border: '1px solid rgba(2, 132, 199, 0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7', marginBottom: '16px'
            }}>
              <Database size={20} />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>In-Memory SQL Playground</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.55 }}>
              Executes real relational SQL queries (`SELECT`, `WHERE`, `LIMIT`) against mock schemas with sub-5ms latency and tabular outputs.
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 1px 3px rgba(15,23,42,0.04)'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', marginBottom: '16px'
            }}>
              <Terminal size={20} />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Custom Test Case Runner</h4>
            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.55 }}>
              LeetCode-style test case verification with edge case boundary tests, execution latency profiling, and memory leak safeguards.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
