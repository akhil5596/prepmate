import { useAuth } from '../../context/AuthContext';
import { Search, Bell, Command } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-white/[0.06] bg-surface-900/60 backdrop-blur-xl
                        flex items-center justify-between px-6 shrink-0">
      {/* Search */}
      <div className="flex items-center gap-2 bg-surface-800/60 border border-white/[0.06] 
                      rounded-xl px-4 py-2 w-80 transition-all duration-200
                      focus-within:border-primary-500/40 focus-within:ring-2 focus-within:ring-primary-500/10">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search problems, rooms..."
          className="bg-transparent text-sm text-gray-300 placeholder-gray-500 
                     outline-none flex-1"
        />
        <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-gray-500 
                        bg-surface-700 rounded px-1.5 py-0.5 border border-white/[0.06]">
          <Command className="w-2.5 h-2.5" /> K
        </kbd>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white 
                           hover:bg-white/5 transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full 
                           ring-2 ring-surface-900" />
        </button>

        <div className="h-6 w-px bg-white/10" />

        <button
          onClick={logout}
          className="flex items-center gap-3 hover:bg-white/5 rounded-xl px-3 py-1.5 
                     transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 
                          flex items-center justify-center text-sm font-bold text-white">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-200">{user?.username || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.role || 'Student'}</p>
          </div>
        </button>
      </div>
    </header>
  );
}
