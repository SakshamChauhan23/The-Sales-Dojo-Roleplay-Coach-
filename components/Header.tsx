
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onHome }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div 
        onClick={onHome}
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
          <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tighter uppercase font-serif">
          The <span className="text-amber-500">Sales</span> Dojo
        </h1>
      </div>

      {user && (
        <div className="flex items-center space-x-6">
          <div className="hidden md:block text-right">
            <p className="text-xs text-gray-500 uppercase font-semibold">Active Seat</p>
            <p className="text-sm font-medium">{user.email}</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 text-sm border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
