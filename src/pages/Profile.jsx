import { useAuth } from '../context/AuthContext';
import { User, Mail, Code2, Flame, Trophy, TrendingUp, Target, Github, Edit3, Calendar } from 'lucide-react';

const activityGrid = Array.from({ length: 52 * 7 }, (_, i) => Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0);

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-start gap-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary-500/20 shrink-0">
          {user?.username?.[0]?.toUpperCase() || 'U'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white">{user?.username || 'Developer'}</h1>
            <span className="badge bg-primary-500/15 text-primary-400 border border-primary-500/20">{user?.role || 'Student'}</span>
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-2 mb-3">
            <Mail className="w-3.5 h-3.5" /> {user?.email || 'dev@prepmate.io'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(user?.skills || ['JavaScript','Python','React']).map(s => (
              <span key={s} className="px-3 py-1 rounded-lg bg-surface-800 border border-white/[0.06] text-xs text-gray-300">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-sm"><Github className="w-4 h-4" /> GitHub</button>
          <button className="btn-primary text-sm"><Edit3 className="w-4 h-4" /> Edit</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Solved', value: user?.stats?.problemsSolved || 142, color: 'text-primary-400', bg: 'bg-primary-500/10' },
          { icon: Flame, label: 'Streak', value: `${user?.stats?.streak || 7}d`, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: TrendingUp, label: 'Rating', value: user?.stats?.rating || 1847, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { icon: Trophy, label: 'Rank', value: `#${user?.stats?.rank || 234}`, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 flex items-center gap-4">
            <div className={`p-2.5 rounded-xl ${s.bg}`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Heatmap */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" /> Activity
          </h2>
          <span className="text-xs text-gray-500">Last 12 months</span>
        </div>
        <div className="flex gap-[3px] flex-wrap overflow-hidden" style={{ maxHeight: '100px' }}>
          {activityGrid.map((level, i) => (
            <div key={i} className="w-[10px] h-[10px] rounded-sm transition-colors" style={{
              backgroundColor: ['#1e293b','#1e3a5f','#1d4ed8','#3b82f6','#60a5fa'][level]
            }} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-500">
          <span>Less</span>
          {[0,1,2,3,4].map(l => <div key={l} className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: ['#1e293b','#1e3a5f','#1d4ed8','#3b82f6','#60a5fa'][l] }} />)}
          <span>More</span>
        </div>
      </div>

      {/* Problem Distribution */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Difficulty Distribution</h3>
          <div className="space-y-3">
            {[
              { label: 'Easy', solved: 65, total: 100, color: 'bg-emerald-500' },
              { label: 'Medium', solved: 52, total: 150, color: 'bg-amber-500' },
              { label: 'Hard', solved: 25, total: 80, color: 'bg-rose-500' },
            ].map(d => (
              <div key={d.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{d.label}</span>
                  <span className="text-gray-300">{d.solved}/{d.total}</span>
                </div>
                <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${d.color} transition-all duration-500`} style={{ width: `${(d.solved/d.total)*100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Top Topics</h3>
          <div className="space-y-2">
            {[
              { topic: 'Arrays', count: 45 },
              { topic: 'Dynamic Programming', count: 32 },
              { topic: 'Trees', count: 28 },
              { topic: 'Graphs', count: 22 },
              { topic: 'Strings', count: 15 },
            ].map(t => (
              <div key={t.topic} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.02]">
                <span className="text-sm text-gray-300">{t.topic}</span>
                <span className="text-xs text-gray-500">{t.count} solved</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
