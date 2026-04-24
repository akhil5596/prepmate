import { useState, useEffect } from 'react';
import { Bot, Mic, MicOff, Video, VideoOff, Send, ThumbsUp, ThumbsDown, Clock, Brain } from 'lucide-react';

const dsaQuestions = [
  { id: 1, q: 'Explain the time complexity of Binary Search and when you would use it.', topic: 'Algorithms' },
  { id: 2, q: 'How would you design a URL shortener service like bit.ly?', topic: 'System Design' },
  { id: 3, q: 'What is the difference between BFS and DFS? When would you prefer one over the other?', topic: 'Graphs' },
  { id: 4, q: 'Explain how a HashMap works internally. What happens during a collision?', topic: 'Data Structures' },
];

export default function InterviewRoom() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let iv;
    if (started) iv = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(iv);
  }, [started]);

  const formatTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const submitAnswer = () => {
    const s = Math.floor(Math.random() * 30) + 70;
    setScore(s);
    setFeedback(s >= 80
      ? '✅ Excellent! Clear explanation with good examples. Consider mentioning edge cases.'
      : '⚠️ Good start. Try to be more specific about trade-offs and real-world applications.');
  };

  const nextQuestion = () => {
    setCurrentQ(c => (c + 1) % dsaQuestions.length);
    setAnswer(''); setFeedback(null); setScore(null);
  };

  if (!started) {
    return (
      <div className="h-[calc(100vh-7rem)] flex items-center justify-center animate-fade-in">
        <div className="glass-card p-12 text-center max-w-lg">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">AI Interview Simulator</h1>
          <p className="text-gray-400 mb-8">Practice DSA and System Design questions with real-time AI feedback and scoring.</p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['DSA', 'System Design', 'Behavioral', 'Frontend'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-surface-800 border border-white/[0.06] text-xs text-gray-300">{t}</span>
            ))}
          </div>
          <button onClick={() => setStarted(true)} className="btn-primary text-lg px-8 py-4">
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  const question = dsaQuestions[currentQ];

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-4 animate-fade-in">
      {/* Video area */}
      <div className="w-72 flex flex-col gap-3 shrink-0">
        <div className="glass-card aspect-[3/4] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/5" />
          <Bot className="w-16 h-16 text-cyan-400/40" />
          <div className="absolute bottom-3 left-3 text-xs text-cyan-300 font-medium flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> AI Interviewer
          </div>
        </div>
        <div className="glass-card aspect-video flex items-center justify-center relative">
          {videoOn ? (
            <div className="text-4xl">👤</div>
          ) : (
            <VideoOff className="w-8 h-8 text-gray-600" />
          )}
          <div className="absolute bottom-2 left-2 text-[10px] text-gray-400">You</div>
        </div>
        <div className="flex justify-center gap-2">
          <button onClick={() => setIsRecording(!isRecording)}
                  className={`p-3 rounded-xl ${isRecording ? 'bg-rose-500/20 text-rose-400' : 'bg-surface-800 text-gray-400'} transition-all`}>
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button onClick={() => setVideoOn(!videoOn)}
                  className={`p-3 rounded-xl ${!videoOn ? 'bg-rose-500/20 text-rose-400' : 'bg-surface-800 text-gray-400'} transition-all`}>
            {videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Q&A area */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between glass-card px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="badge bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">{question.topic}</span>
            <span className="text-sm text-gray-400">Q{currentQ + 1}/{dsaQuestions.length}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" /> {formatTime(timer)}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Question:</h2>
          <p className="text-gray-300 leading-relaxed">{question.q}</p>
        </div>

        <div className="flex-1 glass-card p-4 flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2">Your Answer:</label>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="flex-1 bg-surface-900/50 rounded-xl p-4 text-sm text-gray-200 resize-none outline-none border border-white/[0.06] focus:border-primary-500/40" />
        </div>

        {feedback && (
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">AI Feedback</span>
              <span className={`text-lg font-bold ${score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{score}/100</span>
            </div>
            <p className="text-sm text-gray-300">{feedback}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={submitAnswer} disabled={!answer.trim()} className="btn-primary flex-1 disabled:opacity-40">
            <Send className="w-4 h-4" /> Submit Answer
          </button>
          <button onClick={nextQuestion} className="btn-secondary">Next →</button>
        </div>
      </div>
    </div>
  );
}
