'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Play, Terminal, Cpu, Zap, Code2, Layers, CheckCircle2, 
  ArrowRight, Sparkles, BookOpen, ShieldCheck, Database, 
  Users, Check, ExternalLink, HardDrive, Clock
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
      backgroundColor: '#07090e',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Background Cyber Grid */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(139, 92, 246, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(139, 92, 246, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Radial Violet Glow */}
      <div style={{
        position: 'fixed',
        top: '-15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '900px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Top Header Navigation */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(7, 9, 14, 0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
          }}>
            <Code2 size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                DevForge<span style={{ color: '#a78bfa' }}>.IDE</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '999px',
                background: 'rgba(139, 92, 246, 0.15)',
                color: '#c4b5fd',
                border: '1px solid rgba(139, 92, 246, 0.35)'
              }}>
                CLOUD SANDBOX v4.5
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>Next-Gen Code Runner & Algorithm Visualizer</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#playground" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
            Instant Playground
          </a>
          <a href="#features" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
            Code Doctor
          </a>
          <a href="#guide" style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>
            Big-O Guide
          </a>

          <Link
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.35)'
            }}
          >
            <span>Launch Cloud IDE</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

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
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            color: '#c4b5fd',
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
            color: '#ffffff',
            margin: '0 0 24px'
          }}>
            Code, Execute & Visualize <br />
            <span style={{
              background: 'linear-gradient(135deg, #c4b5fd 20%, #a78bfa 60%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Algorithms at Cloud Speed
            </span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 36px', fontWeight: 400 }}>
            DevForge combines zero-install sandboxed compilation with step-by-step memory pointer visualization, in-memory SQL relational engines, and automated AI Big-O complexity audits.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)'
              }}
            >
              <span>Launch Full Cloud IDE</span>
              <ArrowRight size={18} />
            </Link>

            <a
              href="#playground"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f8fafc',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none'
              }}
            >
              <Terminal size={18} color="#a78bfa" />
              <span>Test Live in Browser</span>
            </a>
          </div>
        </div>

        {/* INTERACTIVE HERO CODE PLAYGROUND */}
        <section id="playground" style={{
          background: 'rgba(17, 24, 39, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          marginBottom: '64px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>
          {/* Top IDE Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 24px',
            background: 'rgba(11, 16, 28, 0.95)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
                    border: 'none',
                    background: activeLang === lang ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255, 255, 255, 0.05)',
                    color: activeLang === lang ? '#ffffff' : '#94a3b8',
                    boxShadow: activeLang === lang ? '0 0 12px rgba(139, 92, 246, 0.35)' : 'none'
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
                background: isRunningHero ? '#334155' : 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.82rem',
                border: 'none',
                cursor: isRunningHero ? 'wait' : 'pointer',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)'
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
              background: '#0d1117',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#cbd5e1',
              lineHeight: 1.6,
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              overflowX: 'auto'
            }}>
              <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                Source Code Buffer ({activeLang.toUpperCase()})
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {snippets[activeLang]}
              </pre>
            </div>

            {/* Execution Output */}
            <div style={{
              padding: '20px',
              background: '#0a0d14',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              color: '#34d399',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700 }}>
                Virtual Execution Terminal (STDOUT / PROFILER)
              </div>

              {isRunningHero ? (
                <div style={{ color: '#38bdf8', padding: '20px 0' }}>
                  &gt; Spawning isolated WebAssembly micro-container...<br />
                  &gt; Executing abstract syntax tree...
                </div>
              ) : heroOutput ? (
                <pre style={{ margin: 0, color: '#34d399', whiteSpace: 'pre-wrap' }}>
                  {heroOutput}
                </pre>
              ) : (
                <div style={{ color: '#64748b', padding: '20px 0' }}>
                  Click &quot;Run Code&quot; above to execute this snippet inside the isolated DevForge JIT micro-container.
                </div>
              )}

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.75rem', color: '#64748b' }}>
                Memory Isolation: 64MB cgroup • Sandbox Bounds Checked •{' '}
                <Link href="#" style={{ color: '#a78bfa', textDecoration: 'none' }}>Open in Full IDE →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* 10TH GRADE EXPLAINER CALLOUT */}
        <section id="guide" style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(56, 189, 248, 0.04) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '64px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎓</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              What is Big-O Code Speed? (Explained Simply for High Schoolers)
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#cbd5e1',
            lineHeight: 1.55
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontWeight: 800, color: '#a78bfa', marginBottom: '6px' }}>📖 The Dictionary Analogy</div>
              If you want to find a word in a dictionary:
              - <strong>Bad Code O(N):</strong> Flipping every single page from page 1 until you find it.
              - <strong>Fast Code O(log N):</strong> Opening right in the middle, seeing if your word comes before or after, and halving the book each time!
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontWeight: 800, color: '#38bdf8', marginBottom: '6px' }}>🐢 The Nested Loop Trap</div>
              When you write a loop inside a loop, doing 1,000 items takes <strong>1,000,000 operations</strong>! DevForge AI Code Doctor flags this and teaches you how to use a Hash Table to solve it in a single pass.
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontWeight: 800, color: '#34d399', marginBottom: '6px' }}>⚡ 1-Click Code Doctor</div>
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
            background: 'rgba(17, 24, 39, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', marginBottom: '16px'
            }}>
              <Sparkles size={20} />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>AI Code Doctor</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Evaluates submitted algorithms for Big-O time and space complexity with 1-click refactoring to optimal single-pass solutions.
            </p>
          </div>

          <div style={{
            background: 'rgba(17, 24, 39, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '16px'
            }}>
              <Database size={20} />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>In-Memory SQL Playground</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Executes real relational SQL queries (`SELECT`, `WHERE`, `LIMIT`) against mock schemas with sub-5ms latency and tabular outputs.
            </p>
          </div>

          <div style={{
            background: 'rgba(17, 24, 39, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px'
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '16px'
            }}>
              <Terminal size={20} />
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>Custom Test Case Runner</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.55 }}>
              LeetCode-style test case verification with edge case boundary tests, execution latency profiling, and memory leak safeguards.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px 32px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#64748b',
        background: '#040609'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong>DevForge Cloud IDE</strong> — Next-Gen Code Runner & Algorithm Complexity Doctor
          </div>
          <div style={{ display: 'flex', gap: '16px', color: '#94a3b8' }}>
            <span>Sub-20ms JIT Execution</span>
            <span>•</span>
            <span>Zero-Install Sandbox</span>
            <span>•</span>
            <span>Python 3.12 & SQL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
