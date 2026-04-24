import { useState } from 'react';
import {
  Play, Send, Users, MessageSquare, Sparkles,
  Bot, Copy, RotateCcw,
} from 'lucide-react';

const LANGUAGES = ['javascript', 'python', 'java', 'cpp', 'typescript'];

const DEFAULT_CODE = `// PrepMate Coding Room
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (map.has(comp)) return [map.get(comp), i];
    map.set(nums[i], i);
  }
  return [];
}
console.log(twoSum([2, 7, 11, 15], 9));
`;

const chatMessages = [
  { id: 1, user: 'alex_dev', message: 'HashMap approach?', time: '2:30 PM', isMe: true },
  { id: 2, user: 'sarah_k', message: 'Yes, O(n) time!', time: '2:31 PM', isMe: false },
];

export default function CodingRoom() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showAI, setShowAI] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      try {
        const logs = [];
        const fn = new Function('console', code);
        fn({ log: (...a) => logs.push(a.join(' ')) });
        setOutput(logs.join('\n') || 'No output');
      } catch (err) { setOutput(`Error: ${err.message}`); }
      setIsRunning(false);
    }, 800);
  };

  const askAI = () => {
    setShowAI(true); setShowChat(false);
    const resp = '✅ O(n) time, O(n) space\n💡 Add input validation\n🎯 Score: 9/10';
    let i = 0;
    const iv = setInterval(() => { setAiResponse(resp.slice(0, i)); i += 2; if (i > resp.length) { setAiResponse(resp); clearInterval(iv); } }, 15);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col gap-3 animate-fade-in">
      <div className="flex items-center justify-between glass-card px-4 py-2.5">
        <div className="flex items-center gap-3">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}
                  className="bg-surface-800/80 rounded-lg px-3 py-1.5 border border-white/[0.06] text-sm text-gray-300 outline-none">
            {LANGUAGES.map(l => <option key={l} value={l} className="bg-surface-800">{l}</option>)}
          </select>
          <div className="flex -space-x-1.5">
            {['#818cf8','#06b6d4'].map((c,i) => (
              <div key={i} className="w-7 h-7 rounded-lg border-2 text-xs font-bold text-white flex items-center justify-center"
                   style={{ backgroundColor: c+'20', borderColor: c }}>{['A','S'][i]}</div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={askAI} className="btn-ghost text-xs text-violet-400"><Sparkles className="w-3.5 h-3.5" /> AI</button>
          <button onClick={() => { setShowChat(!showChat); setShowAI(false); }} className="btn-ghost text-xs text-gray-400"><MessageSquare className="w-3.5 h-3.5" /> Chat</button>
          <button onClick={runCode} disabled={isRunning} className="btn-primary text-xs px-4 py-2"><Play className="w-3.5 h-3.5" /> {isRunning ? 'Running...' : 'Run'}</button>
        </div>
      </div>

      <div className="flex-1 flex gap-3 min-h-0">
        <div className="flex-1 flex flex-col glass-card overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface-800 border border-white/[0.06] text-xs text-gray-300">
              <div className="w-2 h-2 rounded-full bg-amber-400" /> solution.js
            </div>
            <button className="p-1 text-gray-600 hover:text-gray-300"><Copy className="w-3.5 h-3.5" /></button>
            <button className="p-1 text-gray-600 hover:text-gray-300"><RotateCcw className="w-3.5 h-3.5" /></button>
          </div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false}
                    className="flex-1 bg-surface-900 text-gray-200 font-mono text-sm leading-6 p-4 resize-none outline-none selection:bg-primary-500/30" />
          <div className="border-t border-white/[0.06]">
            <div className="flex items-center justify-between px-4 py-2 bg-surface-900/60">
              <span className="text-xs font-medium text-gray-400">Output</span>
              {output && <button onClick={() => setOutput('')} className="text-xs text-gray-500 hover:text-gray-300">Clear</button>}
            </div>
            <pre className="px-4 py-3 text-sm font-mono min-h-[60px] max-h-32 overflow-auto bg-surface-950/50">
              {isRunning ? <span className="text-primary-400 animate-pulse">⏳ Executing...</span>
               : output ? <span className={output.startsWith('Error') ? 'text-rose-400' : 'text-emerald-400'}>{output}</span>
               : <span className="text-gray-600">Click "Run" to execute</span>}
            </pre>
          </div>
        </div>

        {(showChat || showAI) && (
          <div className="w-72 flex flex-col glass-card overflow-hidden shrink-0">
            <div className="flex border-b border-white/[0.06]">
              <button onClick={() => { setShowChat(true); setShowAI(false); }}
                      className={`flex-1 py-3 text-xs font-medium ${showChat && !showAI ? 'text-primary-400 border-b-2 border-primary-500' : 'text-gray-500'}`}>Chat</button>
              <button onClick={() => { setShowAI(true); setShowChat(false); }}
                      className={`flex-1 py-3 text-xs font-medium ${showAI ? 'text-violet-400 border-b-2 border-violet-500' : 'text-gray-500'}`}>AI</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {showAI ? (
                aiResponse ? <div className="text-sm text-gray-300 whitespace-pre-wrap">{aiResponse}</div>
                : <div className="text-center py-8"><Bot className="w-10 h-10 text-violet-400/50 mx-auto mb-3" /><p className="text-sm text-gray-500">Click AI to analyze</p></div>
              ) : (
                <div className="space-y-3">
                  {chatMessages.map(m => (
                    <div key={m.id} className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-gray-500 mb-1">{m.user}</span>
                      <div className={`px-3 py-2 rounded-xl text-sm ${m.isMe ? 'bg-primary-600/20 text-primary-200' : 'bg-surface-700/50 text-gray-300'}`}>{m.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {showChat && !showAI && (
              <div className="p-3 border-t border-white/[0.06] flex gap-2">
                <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Message..."
                       className="flex-1 bg-surface-800/80 border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-gray-300 outline-none" />
                <button className="p-2 rounded-lg bg-primary-600 text-white"><Send className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
