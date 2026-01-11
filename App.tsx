
import React, { useState, useEffect } from 'react';
import { User, Scenario } from './types';
import { MOCK_WHITELIST, SCENARIOS } from './constants';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SimulationRoom from './components/SimulationRoom';
import AdminPanel from './components/AdminPanel';

type View = 'landing' | 'dashboard' | 'simulation' | 'admin';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [whitelist, setWhitelist] = useState<string[]>(MOCK_WHITELIST);

  const handleLogin = (email: string) => {
    const isWhitelisted = whitelist.includes(email.toLowerCase());
    const isAdmin = email === 'admin@salesdojo.ai';
    
    if (isWhitelisted || isAdmin) {
      setUser({
        email,
        isWhitelisted: true,
        expiryDate: '2025-12-31',
        role: isAdmin ? 'admin' : 'rep'
      });
      setView(isAdmin ? 'admin' : 'dashboard');
    } else {
      alert("This email is not registered in our active training seats. Please contact your manager.");
    }
  };

  const startSimulation = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setView('simulation');
  };

  const goHome = () => {
    if (user?.role === 'admin') setView('admin');
    else if (user) setView('dashboard');
    else setView('landing');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-amber-500/30">
      <Header user={user} onLogout={() => { setUser(null); setView('landing'); }} onHome={goHome} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'landing' && <LandingPage onLogin={handleLogin} />}
        
        {view === 'dashboard' && user && (
          <Dashboard 
            scenarios={SCENARIOS} 
            onSelect={startSimulation} 
            user={user}
          />
        )}
        
        {view === 'simulation' && activeScenario && (
          <SimulationRoom 
            scenario={activeScenario} 
            onExit={() => setView('dashboard')}
          />
        )}

        {view === 'admin' && user?.role === 'admin' && (
          <AdminPanel 
            whitelist={whitelist} 
            onUpdate={setWhitelist} 
          />
        )}
      </main>

      <footer className="mt-auto py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>© 2024 The Sales Dojo. All rights reserved.</p>
        <p className="mt-1">Empowering the next generation of closers.</p>
      </footer>
    </div>
  );
};

export default App;
