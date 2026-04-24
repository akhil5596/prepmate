import { useState } from 'react';
import { Trophy, Medal, TrendingUp, Flame, Crown, ChevronUp, ChevronDown } from 'lucide-react';

const leaderboardData = [
  { rank: 1, user: 'quantum_coder', rating: 2847, solved: 892, streak: 45, change: 2 },
  { rank: 2, user: 'algo_master', rating: 2756, solved: 834, streak: 32, change: -1 },
  { rank: 3, user: 'byte_ninja', rating: 2701, solved: 801, streak: 28, change: 1 },
  { rank: 4, user: 'code_wizard', rating: 2654, solved: 756, streak: 21, change: 0 },
  { rank: 5, user: 'dev_samurai', rating: 2589, solved: 712, streak: 19, change: 3 },
  { rank: 6, user: 'stack_queen', rating: 2534, solved: 689, streak: 15, change: -2 },
  { rank: 7, user: 'hash_hero', rating: 2478, solved: 645, streak: 12, change: 1 },
  { rank: 8, user: 'tree_master', rating: 2412, solved: 601, streak: 10, change: 0 },
  { rank: 9, user: 'dp_legend', rating: 2367, solved: 578, streak: 8, change: -1 },
  { rank: 10, user: 'graph_guru', rating: 2301, solved: 534, streak: 7, change: 2 },
];

const rankColors = ['', 'from-amber-400 to-yellow-500', 'from-gray-300 to-gray-400', 'from-amber-600 to-amber-700'];

export default function Leaderboard() {
  const [tab, setTab] = useState('rating');

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" /> Leaderboard
        </h1>
        <div className="flex bg-surface-800/60 rounded-xl border border-white/[0.06] p-1">
          {['rating','solved','streak'].map(t => (
            <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      tab === t ? 'bg-primary-500/20 text-primary-300' : 'text-gray-500 hover:text-gray-300'
                    }`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 0, 2].map(idx => {
          const u = leaderboardData[idx];
          return (
            <div key={u.rank} className={`glass-card-hover p-6 text-center ${idx === 0 ? 'ring-1 ring-amber-500/20 order-1 md:order-2' : idx === 1 ? 'order-2 md:order-1' : 'order-3'}`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rankColors[u.rank]} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                {u.rank === 1 ? <Crown className="w-7 h-7 text-white" /> : <span className="text-xl font-bold text-white">{u.rank}</span>}
              </div>
              <p className="font-semibold text-white mb-1">{u.user}</p>
              <p className="text-2xl font-bold gradient-text">{u.rating}</p>
              <p className="text-xs text-gray-500 mt-1">{u.solved} solved</p>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 w-16">Rank</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">User</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Rating</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Solved</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Streak</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Change</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map(u => (
              <tr key={u.rank} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium text-gray-400">
                  {u.rank <= 3 ? <Medal className={`w-4 h-4 ${u.rank === 1 ? 'text-amber-400' : u.rank === 2 ? 'text-gray-400' : 'text-amber-600'}`} /> : u.rank}
                </td>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-200">{u.user}</td>
                <td className="px-5 py-3.5 text-sm font-semibold text-primary-400">{u.rating}</td>
                <td className="px-5 py-3.5 text-sm text-gray-400">{u.solved}</td>
                <td className="px-5 py-3.5 text-sm text-amber-400 flex items-center gap-1"><Flame className="w-3.5 h-3.5" />{u.streak}d</td>
                <td className="px-5 py-3.5 text-sm">
                  {u.change > 0 ? <span className="text-emerald-400 flex items-center gap-0.5"><ChevronUp className="w-3.5 h-3.5" />{u.change}</span>
                   : u.change < 0 ? <span className="text-rose-400 flex items-center gap-0.5"><ChevronDown className="w-3.5 h-3.5" />{Math.abs(u.change)}</span>
                   : <span className="text-gray-500">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
