
import React, { useState, useEffect, useRef } from 'react';
import { Scenario, Message, Scorecard } from '../types';
import { GeminiService } from '../services/geminiService';
import FeedbackReport from './FeedbackReport';

interface SimulationRoomProps {
  scenario: Scenario;
  onExit: () => void;
}

const SimulationRoom: React.FC<SimulationRoomProps> = ({ scenario, onExit }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello? Who is this?", timestamp: Date.now() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [report, setReport] = useState<Scorecard | null>(null);
  const [turnCount, setTurnCount] = useState(0);

  const gemini = useRef(new GeminiService());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: inputText, timestamp: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);
    setTurnCount(prev => prev + 1);

    try {
      const responseText = await gemini.current.generateResponse(scenario, newMessages);
      setMessages([...newMessages, { role: 'model', text: responseText, timestamp: Date.now() }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'model', text: "Simulation paused. Please check your connection or professional language.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async () => {
    setIsFinishing(true);
    try {
      const scorecard = await gemini.current.getCoachingReport(scenario, messages);
      setReport(scorecard);
    } catch (error) {
      alert("Failed to generate coaching report. Please try again.");
    } finally {
      setIsFinishing(false);
    }
  };

  if (report) {
    return <FeedbackReport report={report} onDone={onExit} scenario={scenario} />;
  }

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
      {/* Simulation Header */}
      <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={scenario.avatar} className="w-10 h-10 rounded-full border border-amber-500/30" />
          <div>
            <h4 className="text-sm font-bold">{scenario.personaName}</h4>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Active Call</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-500 font-mono">Turns: {turnCount}/10</span>
          <button 
            onClick={onExit}
            className="text-xs text-red-500 hover:text-red-400 font-bold uppercase transition-colors"
          >
            Abort Call
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
          >
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-amber-500 text-black font-medium rounded-tr-none shadow-lg' 
                : 'bg-white/10 text-white rounded-tl-none border border-white/5'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/40 border-t border-white/10">
        <div className="flex space-x-3">
          <input 
            type="text"
            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors placeholder-gray-600"
            placeholder="Type your response..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
          <button 
            onClick={handleFinish}
            disabled={isFinishing || messages.length < 3}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/30 font-bold px-4 rounded-xl transition-all text-sm disabled:opacity-30 uppercase tracking-tighter"
          >
            {isFinishing ? 'Grading...' : 'End Simulation'}
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-gray-500 uppercase tracking-widest font-bold">
          Tip: Hit "End Simulation" when you've handled the objection or failed the call.
        </p>
      </div>

      {isFinishing && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-center px-10">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="text-3xl font-serif font-black mb-4">Grading Performance...</h2>
          <p className="text-gray-400 max-w-sm">The sensei is analyzing your empathy, clarity, and objection handling skills.</p>
        </div>
      )}
    </div>
  );
};

export default SimulationRoom;
