import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CodingRoom from './pages/CodingRoom';
import InterviewRoom from './pages/InterviewRoom';
import ProblemLibrary from './pages/ProblemLibrary';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Auth from './pages/Auth';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/room/:roomId" element={<CodingRoom />} />
            <Route path="/interview/:sessionId" element={<InterviewRoom />} />
            <Route path="/problems" element={<ProblemLibrary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
