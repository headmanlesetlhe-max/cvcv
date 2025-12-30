import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Laptop, Rocket } from 'lucide-react';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <div className="text-center space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Beginner Friendly Course
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Build your first website.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            For free. Today.
          </span>
        </h1>
        
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          No experience? No problem. We'll guide you through downloading the tools, 
          writing the code for a fitness app, and putting it on the internet for the world to see.
        </p>

        <button
          onClick={() => navigate('/setup')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
        >
          Start Learning <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: <Laptop className="w-8 h-8 text-purple-400" />,
            title: "1. Setup Tools",
            desc: "Download VS Code, the industry standard editor used by pros."
          },
          {
            icon: <Globe className="w-8 h-8 text-cyan-400" />,
            title: "2. Write Code",
            desc: "Create 'FitStart', a real workout tracking website using HTML & CSS."
          },
          {
            icon: <Rocket className="w-8 h-8 text-emerald-400" />,
            title: "3. Go Live",
            desc: "Drag and drop your folder to Netlify to publish it instantly."
          }
        ].map((card, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
            <div className="bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center mb-4 border border-slate-800">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
            <p className="text-slate-400">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};