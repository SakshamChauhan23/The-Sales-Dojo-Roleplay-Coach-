
import React from 'react';
import { Scenario, User } from '../types';

interface DashboardProps {
  scenarios: Scenario[];
  onSelect: (scenario: Scenario) => void;
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ scenarios, onSelect, user }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-serif font-black mb-2 tracking-tight uppercase italic">Training Menu</h2>
          <p className="text-gray-400">Choose your sparring partner and sharpen your skills.</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl text-amber-500 text-sm font-medium">
          Training Seat Expiry: {user.expiryDate}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id}
            className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col"
          >
            <div className="h-48 relative">
              <img 
                src={scenario.avatar} 
                alt={scenario.personaName}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                  scenario.difficulty === 'Hard' ? 'bg-red-500/80 text-white' :
                  scenario.difficulty === 'Medium' ? 'bg-amber-500/80 text-black' :
                  'bg-green-500/80 text-white'
                }`}>
                  {scenario.difficulty}
                </span>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xs font-bold text-amber-500 uppercase mb-1 tracking-widest">{scenario.subtitle}</h3>
              <h4 className="text-2xl font-bold mb-3">{scenario.personaName}</h4>
              <p className="text-sm text-gray-400 mb-8 flex-grow leading-relaxed">
                {scenario.description}
              </p>
              
              <button 
                onClick={() => onSelect(scenario)}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-amber-500 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Enter Dojo</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-10 text-center text-gray-600">
           <svg className="w-12 h-12 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           <p className="font-bold">Scenario Packs Locked</p>
           <p className="text-xs">Upgrade your Training Seat to unlock more personas.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
