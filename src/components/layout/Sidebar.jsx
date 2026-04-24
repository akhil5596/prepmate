import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Code2, Users, BookOpen, Trophy, User, Sparkles,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/problems', icon: BookOpen, label: 'Problems' },
  { to: '/room/new', icon: Code2, label: 'Code Room' },
  { to: '/interview/new', icon: Users, label: 'Interview' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar() {
  return (
    <aside className="w-[72px] hover:w-56 transition-all duration-300 ease-in-out
                       bg-surface-900/80 backdrop-blur-xl border-r border-white/[0.06]
                       flex flex-col items-center py-6 gap-2 group overflow-hidden shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-8 w-full">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 
                        flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-white opacity-0 group-hover:opacity-100 
                         transition-opacity duration-300 whitespace-nowrap">
          PrepMate
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 w-full px-3">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 
               ${isActive
                  ? 'bg-primary-500/15 text-primary-400 shadow-sm shadow-primary-500/10'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
               }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300 whitespace-nowrap">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom glow */}
      <div className="mt-auto w-10 h-10 rounded-full bg-primary-500/10 blur-xl" />
    </aside>
  );
}
