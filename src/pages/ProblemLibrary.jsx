import { useState } from 'react';
import { Search, Filter, BookOpen, CheckCircle2, Tag } from 'lucide-react';

const problems = [
  { id: 1, title: 'Two Sum', difficulty: 'easy', tags: ['Array','HashMap'], acceptance: '49.2%', status: 'solved' },
  { id: 2, title: 'Add Two Numbers', difficulty: 'medium', tags: ['LinkedList','Math'], acceptance: '40.1%', status: 'solved' },
  { id: 3, title: 'Longest Substring Without Repeating', difficulty: 'medium', tags: ['String','Sliding Window'], acceptance: '33.8%', status: 'attempted' },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'hard', tags: ['Binary Search','Array'], acceptance: '35.4%', status: 'unsolved' },
  { id: 5, title: 'Longest Palindromic Substring', difficulty: 'medium', tags: ['String','DP'], acceptance: '32.4%', status: 'solved' },
  { id: 6, title: 'Merge Two Sorted Lists', difficulty: 'easy', tags: ['LinkedList'], acceptance: '62.5%', status: 'solved' },
  { id: 7, title: 'Valid Parentheses', difficulty: 'easy', tags: ['Stack','String'], acceptance: '42.8%', status: 'solved' },
  { id: 8, title: 'Merge K Sorted Lists', difficulty: 'hard', tags: ['LinkedList','Heap'], acceptance: '48.9%', status: 'unsolved' },
  { id: 9, title: 'Trapping Rain Water', difficulty: 'hard', tags: ['Array','Stack','DP'], acceptance: '58.7%', status: 'attempted' },
  { id: 10, title: 'Course Schedule', difficulty: 'medium', tags: ['Graph','BFS','DFS'], acceptance: '45.2%', status: 'unsolved' },
  { id: 11, title: 'LRU Cache', difficulty: 'medium', tags: ['HashMap','LinkedList'], acceptance: '40.5%', status: 'solved' },
  { id: 12, title: 'Binary Tree Level Order', difficulty: 'medium', tags: ['Tree','BFS'], acceptance: '63.2%', status: 'unsolved' },
];

const TAGS = ['All','Array','String','LinkedList','Tree','Graph','DP','Stack','HashMap','Binary Search','Heap','BFS','DFS'];
const DIFFS = ['All','easy','medium','hard'];

export default function ProblemLibrary() {
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');

  const filtered = problems.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (diffFilter !== 'All' && p.difficulty !== diffFilter) return false;
    if (tagFilter !== 'All' && !p.tags.includes(tagFilter)) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-400" /> Problem Library
          </h1>
          <p className="text-sm text-gray-400 mt-1">{problems.length} problems available</p>
        </div>
        <div className="flex gap-2">
          {DIFFS.map(d => (
            <button key={d} onClick={() => setDiffFilter(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      diffFilter === d ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' : 'text-gray-500 hover:text-gray-300 border border-transparent'
                    }`}>{d === 'All' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Search */}
        <div className="flex-1 flex items-center gap-2 glass-card px-4 py-2.5">
          <Search className="w-4 h-4 text-gray-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search problems..."
                 className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none flex-1" />
        </div>
        {/* Tag filter */}
        <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}
                className="glass-card px-4 py-2.5 text-sm text-gray-300 outline-none bg-transparent border-0 cursor-pointer">
          {TAGS.map(t => <option key={t} value={t} className="bg-surface-800">{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3 w-10">#</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Title</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Tags</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Difficulty</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Acceptance</th>
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <td className="px-5 py-3.5 text-sm text-gray-500">{p.id}</td>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-200 group-hover:text-primary-300 transition-colors">{p.title}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1 flex-wrap">
                    {p.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-surface-700 text-gray-400 border border-white/[0.04]">{t}</span>)}
                  </div>
                </td>
                <td className="px-5 py-3.5"><span className={`badge ${p.difficulty === 'easy' ? 'badge-easy' : p.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'}`}>{p.difficulty}</span></td>
                <td className="px-5 py-3.5 text-sm text-gray-400">{p.acceptance}</td>
                <td className="px-5 py-3.5">
                  {p.status === 'solved' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {p.status === 'attempted' && <div className="w-4 h-4 rounded-full border-2 border-amber-400" />}
                  {p.status === 'unsolved' && <div className="w-4 h-4 rounded-full border-2 border-gray-600" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No problems found</div>}
      </div>
    </div>
  );
}
