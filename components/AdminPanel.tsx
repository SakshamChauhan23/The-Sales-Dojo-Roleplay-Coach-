
import React, { useState } from 'react';

interface AdminPanelProps {
  whitelist: string[];
  onUpdate: (newWhitelist: string[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ whitelist, onUpdate }) => {
  const [newEmail, setNewEmail] = useState('');

  const handleAdd = () => {
    if (newEmail && !whitelist.includes(newEmail)) {
      onUpdate([...whitelist, newEmail.toLowerCase()]);
      setNewEmail('');
    }
  };

  const handleRemove = (email: string) => {
    onUpdate(whitelist.filter(e => e !== email));
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-10">
        <h2 className="text-4xl font-serif font-black mb-2 uppercase italic tracking-tight">Marketplace Admin</h2>
        <p className="text-gray-400">Manage client training seats and whitelisted domains.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-4 uppercase text-xs text-amber-500 tracking-widest">Add New Client</h3>
            <div className="space-y-3">
              <input 
                type="email"
                placeholder="client@agency.com"
                className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button 
                onClick={handleAdd}
                className="w-full bg-amber-500 text-black font-bold py-2 rounded-xl text-sm"
              >
                Provision Seat
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-bold mb-4 uppercase text-xs text-gray-500 tracking-widest">Platform Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Active Sessions</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg Performance</p>
                <p className="text-2xl font-bold text-amber-500">74%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Email / Domain</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {whitelist.map((email) => (
                  <tr key={email} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-sm">{email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-[10px] font-bold uppercase">Active</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleRemove(email)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold uppercase"
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
