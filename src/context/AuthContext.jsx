import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('prepmate_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('prepmate_user', JSON.stringify(userData));
    localStorage.setItem('prepmate_token', userData.token || 'demo-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prepmate_user');
    localStorage.removeItem('prepmate_token');
  };

  const demoLogin = () => {
    login({
      id: 'demo-user-1',
      username: 'alex_dev',
      email: 'alex@prepmate.dev',
      role: 'student',
      avatar: null,
      stats: { problemsSolved: 142, streak: 7, rating: 1847, rank: 234 },
      skills: ['JavaScript', 'Python', 'React', 'Node.js'],
      token: 'demo-jwt-token',
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
