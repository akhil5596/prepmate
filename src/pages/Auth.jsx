import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, Github, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo mode — simulate auth
    login({
      id: 'user-' + Date.now(),
      username: form.username || form.email.split('@')[0],
      email: form.email,
      role: 'student',
      avatar: null,
      stats: { problemsSolved: 0, streak: 0, rating: 1200, rank: 0 },
      skills: [],
      token: 'jwt-' + Date.now(),
    });
    navigate('/dashboard');
  };

  const handleDemo = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-950 bg-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] bg-primary-500/[0.06] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[500px] h-[500px] bg-violet-500/[0.05] rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 
                          flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">PrepMate</span>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-sm text-gray-400 text-center mb-8">
            {isLogin ? 'Sign in to continue your journey' : 'Start your coding journey today'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="input-field pl-10"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field pl-10"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pl-10 pr-10"
                required
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-3.5 text-gray-500 hover:text-gray-300">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="flex flex-col gap-3">
            <button className="btn-secondary w-full">
              <Github className="w-4 h-4" /> Continue with GitHub
            </button>
            <button onClick={handleDemo} className="btn-ghost w-full text-primary-400 hover:text-primary-300">
              <Sparkles className="w-4 h-4" /> Try Demo Account
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-400 hover:text-primary-300 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
