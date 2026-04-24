import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Code2, BookOpen, Trophy, Flame, TrendingUp, Clock, Target,
  ArrowUpRight, Plus, Users, Play, Brain, CheckCircle2,
} from 'lucide-react';

const recentProblems = [
  { id: 1, title: 'Two Sum', difficulty: 'easy', status: 'solved', time: '12 min' },
  { id: 2, title: 'LRU Cache', difficulty: 'medium', status: 'solved', time: '35 min' },
  { id: 3, title: 'Merge K Sorted Lists', difficulty: 'hard', status: 'attempted', time: '45 min' },
  { id: 4, title: 'Valid Parentheses', difficulty: 'easy', status: 'solved', time: '8 min' },
  { id: 5, title: 'Course Schedule', difficulty: 'medium', status: 'unsolved', time: '—' },
];

const upcomingInterviews = [
  { id: 1, company: 'Google', type: 'System Design', date: 'Today, 5:00 PM', avatar: 'G' },
  { id: 2, company: 'Meta', type: 'DSA Round', date: 'Tomorrow, 2:00 PM', avatar: 'M' },
];

const weeklyData = [65, 80, 45, 90, 70, 85, 95];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, <span className="gradient-text">{user?.username || 'Developer'}</span> 👋
          </h1>
          <p className="text-gray-400 mt-1">
            You're on a <span className="text-amber-400 font-semibold">{user?.stats?.streak || 0}-day</span> streak. Keep it up!
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/room/new" className="btn-primary text-sm">
            <Plus className="w-4 h-4" /> New Room
          </Link>
          <Link to="/problems" className="btn-secondary text-sm">
            <BookOpen className="w-4 h-4" /> Practice
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Problems Solved', value: user?.stats?.problemsSolved || 142, color: 'text-primary-400', bg: 'bg-primary-500/10' },
          { icon: Flame, label: 'Current Streak', value: `${user?.stats?.streak || 7} days`, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: TrendingUp, label: 'Rating', value: user?.stats?.rating || 1847, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { icon: Trophy, label: 'Global Rank', value: `#${user?.stats?.rank || 234}`, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card-hover p-5 flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Weekly Activity</h2>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {weeklyData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-lg bg-gradient-to-t from-primary-600 to-primary-400 
                                transition-all duration-500 hover:from-primary-500 hover:to-violet-400"
                     style={{ height: `${val}%` }} />
                <span className="text-[10px] text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { icon: Code2, label: 'Start Coding Room', desc: 'Real-time collab', to: '/room/new', color: 'from-primary-500 to-violet-500' },
              { icon: Brain, label: 'AI Mock Interview', desc: 'Practice with AI', to: '/interview/new', color: 'from-cyan-500 to-emerald-500' },
              { icon: Users, label: 'Join a Session', desc: 'Browse live rooms', to: '/room/new', color: 'from-amber-500 to-rose-500' },
              { icon: Play, label: 'Daily Challenge', desc: 'Today\'s problem', to: '/problems', color: 'from-emerald-500 to-cyan-500' },
            ].map((action) => (
              <Link key={action.label} to={action.to}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 
                               transition-all duration-200 group">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} shrink-0
                                group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200">{action.label}</p>
                  <p className="text-xs text-gray-500">{action.desc}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 
                                        transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Problems */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Problems</h2>
            <Link to="/problems" className="text-xs text-primary-400 hover:text-primary-300">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {recentProblems.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 
                                         transition-all duration-200 cursor-pointer">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0
                  ${p.status === 'solved' ? 'bg-emerald-500/15 text-emerald-400' 
                    : p.status === 'attempted' ? 'bg-amber-500/15 text-amber-400' 
                    : 'bg-gray-500/15 text-gray-500'}`}>
                  {p.status === 'solved' ? <CheckCircle2 className="w-3.5 h-3.5" /> 
                   : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">{p.title}</p>
                </div>
                <span className={`badge ${
                  p.difficulty === 'easy' ? 'badge-easy' 
                  : p.difficulty === 'medium' ? 'badge-medium' 
                  : 'badge-hard'
                }`}>
                  {p.difficulty}
                </span>
                <span className="text-xs text-gray-500 w-14 text-right">
                  <Clock className="w-3 h-3 inline mr-1" />{p.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Upcoming Sessions</h2>
            <Link to="/interview/new" className="text-xs text-primary-400 hover:text-primary-300">
              Schedule →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="glass-card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 
                                flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {interview.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-200">{interview.company}</p>
                  <p className="text-xs text-gray-500">{interview.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-primary-400 font-medium">{interview.date}</p>
                  <button className="text-xs text-gray-500 hover:text-white mt-1">Join →</button>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Radar */}
          <div className="mt-6 pt-6 border-t border-white/[0.06]">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Your Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Arrays', 'Trees', 'Graphs', 'DP', 'Strings', 'Sorting'].map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-surface-800 border border-white/[0.06] 
                                             text-xs text-gray-300 hover:border-primary-500/30 
                                             hover:text-primary-300 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
