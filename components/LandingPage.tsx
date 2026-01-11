
import React, { useState } from 'react';

interface LandingPageProps {
  onLogin: (email: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin(email);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="max-w-3xl mb-12">
        <h2 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
          Stop burning real leads <br/> 
          <span className="text-amber-500">to train new hires.</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The Sales Dojo is an interactive AI training simulator where reps practice handling objections against personas that never buy, but always teach.
        </p>
      </div>

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
        <h3 className="text-2xl font-bold mb-6">Enter the Dojo</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-xs uppercase text-gray-500 font-bold mb-2 ml-1">Email Domain Access</label>
            <input 
              type="email" 
              placeholder="e.g. rep@topagency.com"
              className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-amber-500/20"
          >
            Authenticate Training Session
          </button>
        </form>
        <p className="mt-6 text-xs text-gray-500">
          Try <span className="text-amber-400">demo@example.com</span> or <span className="text-amber-400">admin@salesdojo.ai</span>
        </p>
      </div>

      <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
          <div className="text-amber-500 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="font-bold mb-2">Difficult Personas</h4>
          <p className="text-sm text-gray-400">From angry landlords to skeptical CTOs, our AI never goes easy on you.</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
          <div className="text-amber-500 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h4 className="font-bold mb-2">Instant Scorecards</h4>
          <p className="text-sm text-gray-400">Receive objective, data-driven feedback the moment the simulation ends.</p>
        </div>
        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
          <div className="text-amber-500 mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h4 className="font-bold mb-2">Risk-Free Training</h4>
          <p className="text-sm text-gray-400">Fail safely. Perfect your script without losing a single dollar of potential commission.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
