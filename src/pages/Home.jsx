import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles, Code2, Users, Brain, Zap, ArrowRight, Github, 
  Play, Shield, Globe, Terminal, ChevronRight, Star,
} from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Real-Time Code Sync',
    desc: 'Collaborate like Google Docs — live cursor tracking, conflict-free editing, delta sync.',
    color: 'from-primary-500 to-violet-500',
    glow: 'shadow-primary-500/20',
  },
  {
    icon: Brain,
    title: 'AI Interview Coach',
    desc: 'Mock interviews with adaptive AI — DSA, system design, behavioral. Instant scoring.',
    color: 'from-cyan-500 to-emerald-500',
    glow: 'shadow-cyan-500/20',
  },
  {
    icon: Users,
    title: 'Live Video Rooms',
    desc: 'WebRTC peer-to-peer video calls with screen sharing. Zero-latency communication.',
    color: 'from-amber-500 to-rose-500',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: Zap,
    title: 'Anti-Lag Engine',
    desc: 'Delta updates, edge-optimized sync, and React rendering optimizations for zero friction.',
    color: 'from-emerald-500 to-cyan-500',
    glow: 'shadow-emerald-500/20',
  },
  {
    icon: Shield,
    title: 'Secure Sandbox',
    desc: 'Docker-based code execution with JWT auth, rate limiting, and encrypted channels.',
    color: 'from-rose-500 to-primary-500',
    glow: 'shadow-rose-500/20',
  },
  {
    icon: Globe,
    title: 'GitHub Integration',
    desc: 'Login via GitHub, push solutions to repos, and run AI-powered code reviews.',
    color: 'from-violet-500 to-primary-500',
    glow: 'shadow-violet-500/20',
  },
];

const stats = [
  { value: '10K+', label: 'Problems' },
  { value: '50K+', label: 'Users' },
  { value: '1M+', label: 'Submissions' },
  { value: '99.9%', label: 'Uptime' },
];

export default function Home() {
  const { user, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      demoLogin();
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 bg-grid overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] 
                        bg-primary-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] 
                        bg-cyan-500/[0.05] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] 
                        bg-violet-500/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 
                       border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 
                          flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">PrepMate</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#stats" className="text-sm text-gray-400 hover:text-white transition-colors">Stats</a>
          <Link to="/problems" className="text-sm text-gray-400 hover:text-white transition-colors">Problems</Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard" className="btn-primary text-sm">
              Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link to="/auth" className="btn-ghost text-sm">Sign In</Link>
              <button onClick={handleGetStarted} className="btn-primary text-sm">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                          bg-primary-500/10 border border-primary-500/20 mb-8">
            <Zap className="w-3.5 h-3.5 text-primary-400" />
            <span className="text-xs font-medium text-primary-300">
              Powered by AI • Built for Speed
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="text-white">Code Together.</span>
            <br />
            <span className="gradient-text">Interview Smarter.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            The AI-powered platform for real-time collaborative coding, 
            mock interviews, and adaptive learning. Zero lag. Pure focus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleGetStarted} className="btn-primary text-lg px-8 py-4">
              <Play className="w-5 h-5" /> Launch PrepMate
            </button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
               className="btn-secondary text-lg px-8 py-4">
              <Github className="w-5 h-5" /> View on GitHub
            </a>
          </div>
        </div>

        {/* Floating editor preview */}
        <div className="mt-20 animate-slide-up">
          <div className="glass-card p-1 max-w-4xl mx-auto glow-primary">
            <div className="bg-surface-900 rounded-xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-gray-500 font-mono">solution.js — PrepMate Editor</span>
                </div>
                <Terminal className="w-3.5 h-3.5 text-gray-600" />
              </div>
              {/* Code preview */}
              <div className="p-6 text-left font-mono text-sm leading-7">
                <div>
                  <span className="text-violet-400">function</span>{' '}
                  <span className="text-cyan-300">twoSum</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-amber-300">nums</span>
                  <span className="text-gray-400">,</span>{' '}
                  <span className="text-amber-300">target</span>
                  <span className="text-gray-400">)</span>{' '}
                  <span className="text-gray-400">{'{'}</span>
                </div>
                <div className="pl-6">
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-cyan-300">map</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-violet-400">new</span>{' '}
                  <span className="text-emerald-400">Map</span>
                  <span className="text-gray-400">();</span>
                </div>
                <div className="pl-6">
                  <span className="text-violet-400">for</span>{' '}
                  <span className="text-gray-400">(</span>
                  <span className="text-violet-400">let</span>{' '}
                  <span className="text-cyan-300">i</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-amber-300">0</span>
                  <span className="text-gray-400">;</span>{' '}
                  <span className="text-cyan-300">i</span>{' '}
                  <span className="text-gray-400">&lt;</span>{' '}
                  <span className="text-amber-300">nums</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-cyan-300">length</span>
                  <span className="text-gray-400">;</span>{' '}
                  <span className="text-cyan-300">i</span>
                  <span className="text-gray-400">++)</span>{' '}
                  <span className="text-gray-400">{'{'}</span>
                </div>
                <div className="pl-12">
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-cyan-300">complement</span>{' '}
                  <span className="text-gray-400">=</span>{' '}
                  <span className="text-amber-300">target</span>{' '}
                  <span className="text-gray-400">-</span>{' '}
                  <span className="text-amber-300">nums</span>
                  <span className="text-gray-400">[</span>
                  <span className="text-cyan-300">i</span>
                  <span className="text-gray-400">];</span>
                  <span className="ml-4 text-gray-600">{'// ✨ AI: O(n) approach'}</span>
                </div>
                <div className="pl-12">
                  <span className="text-violet-400">if</span>{' '}
                  <span className="text-gray-400">(</span>
                  <span className="text-cyan-300">map</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-emerald-400">has</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-cyan-300">complement</span>
                  <span className="text-gray-400">))</span>{' '}
                  <span className="text-violet-400">return</span>{' '}
                  <span className="text-gray-400">[</span>
                  <span className="text-cyan-300">map</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-emerald-400">get</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-cyan-300">complement</span>
                  <span className="text-gray-400">),</span>{' '}
                  <span className="text-cyan-300">i</span>
                  <span className="text-gray-400">];</span>
                </div>
                <div className="pl-12 opacity-60">
                  <span className="text-cyan-300">map</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-emerald-400">set</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-amber-300">nums</span>
                  <span className="text-gray-400">[</span>
                  <span className="text-cyan-300">i</span>
                  <span className="text-gray-400">],</span>{' '}
                  <span className="text-cyan-300">i</span>
                  <span className="text-gray-400">);</span>
                </div>
                <div className="pl-6"><span className="text-gray-400">{'}'}</span></div>
                <div><span className="text-gray-400">{'}'}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 max-w-5xl mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Built for <span className="gradient-text">the Future</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Every feature engineered for speed, intelligence, and seamless collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass-card-hover p-6 group cursor-default">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} 
                              flex items-center justify-center mb-4 shadow-lg ${f.glow}
                              group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-8 py-24 text-center">
        <div className="glass-card p-12 glow-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent" />
          <div className="relative z-10">
            <Star className="w-8 h-8 text-primary-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Level Up?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Join thousands of developers preparing smarter, coding faster, and landing dream roles.
            </p>
            <button onClick={handleGetStarted} className="btn-primary text-lg px-10 py-4">
              Start for Free <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center 
                        justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span>© 2026 PrepMate. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
