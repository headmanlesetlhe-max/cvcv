import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle, Circle, Lock, Rocket, Code, Download, Home, BookOpen, Wand2 } from 'lucide-react';
import { CourseStep, StepStatus } from '../../types';

interface SidebarProps {
  steps: CourseStep[];
}

export const Sidebar: React.FC<SidebarProps> = ({ steps }) => {
  const getIcon = (step: CourseStep) => {
    if (step.status === StepStatus.COMPLETED) return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    if (step.status === StepStatus.LOCKED) return <Lock className="w-4 h-4 text-slate-500" />;
    
    switch (step.id) {
      case 'setup': return <Download className="w-5 h-5" />;
      case 'code': return <Code className="w-5 h-5" />;
      case 'deploy': return <Rocket className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col shrink-0 hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          WebZero
        </h1>
        <p className="text-slate-400 text-xs mt-1">From nothing to deployed.</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <NavLink 
          to="/"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Welcome</span>
        </NavLink>

        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Curriculum
        </div>

        {steps.map((step) => (
          <NavLink
            key={step.id}
            to={step.path}
            className={({ isActive }) => {
              const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all border border-transparent";
              if (step.status === StepStatus.LOCKED) {
                return `${baseClasses} opacity-50 cursor-not-allowed text-slate-500`;
              }
              return isActive 
                ? `${baseClasses} bg-slate-800 border-slate-700 text-emerald-400` 
                : `${baseClasses} text-slate-300 hover:bg-slate-800/50 hover:text-white`;
            }}
            onClick={(e) => {
              if (step.status === StepStatus.LOCKED) e.preventDefault();
            }}
          >
            {getIcon(step)}
            <span className="font-medium text-sm">{step.title}</span>
          </NavLink>
        ))}

        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Tools & Resources
        </div>
        
        <NavLink 
          to="/builder"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-purple-900/50 text-purple-200 border border-purple-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`
          }
        >
          <Wand2 className="w-5 h-5 text-purple-400" />
          <span className="font-medium">AI Site Builder</span>
        </NavLink>

        <NavLink 
          to="/glossary"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`
          }
        >
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">Glossary</span>
        </NavLink>
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-xs text-slate-400 text-center">
            Built for beginners
          </p>
        </div>
      </div>
    </div>
  );
};