
import React from 'react';
import { Scorecard, Scenario } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface FeedbackReportProps {
  report: Scorecard;
  onDone: () => void;
  scenario: Scenario;
}

const FeedbackReport: React.FC<FeedbackReportProps> = ({ report, onDone, scenario }) => {
  const chartData = [
    { name: 'Empathy', score: report.empathyScore },
    { name: 'Clarity', score: report.clarityScore },
    { name: 'Handling', score: report.objectionHandlingScore },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-5xl font-serif font-black mb-2 italic">Dojo Report</h2>
          <p className="text-gray-400">Persona: {scenario.personaName} • {scenario.subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Overall Score</p>
          <p className={`text-6xl font-black ${report.overallScore >= 70 ? 'text-green-500' : 'text-amber-500'}`}>
            {report.overallScore}<span className="text-2xl text-gray-500">/100</span>
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <span className="w-2 h-8 bg-amber-500 rounded-full mr-3" />
            Skill Distribution
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#999" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.score >= 80 ? '#22c55e' : entry.score >= 60 ? '#f59e0b' : '#ef4444'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">What You Did Well</h3>
            <p className="text-gray-300 italic mb-8 border-l-2 border-green-500/30 pl-4 py-1">
              "{report.whatYouDidWell}"
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-500">Where You Failed</h3>
            <p className="text-gray-300 italic border-l-2 border-red-500/30 pl-4 py-1">
              "{report.whereYouFailed}"
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-500 text-black rounded-3xl p-8 mb-10 shadow-xl shadow-amber-500/10">
        <h3 className="text-2xl font-black mb-4 uppercase italic">Sensei's Recommendation</h3>
        <p className="text-lg font-medium leading-relaxed">
          {report.suggestedImprovement}
        </p>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onDone}
          className="bg-white text-black font-black px-12 py-5 rounded-full hover:bg-amber-500 transition-all transform hover:scale-105 shadow-2xl uppercase tracking-widest text-sm"
        >
          Return to Training Grounds
        </button>
      </div>
    </div>
  );
};

export default FeedbackReport;
