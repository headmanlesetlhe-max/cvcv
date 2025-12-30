import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { GeminiTutor } from './components/GeminiTutor';
import { Welcome } from './pages/Welcome';
import { Setup } from './pages/Setup';
import { CodingWorkshop } from './pages/CodingWorkshop';
import { Deployment } from './pages/Deployment';
import { Glossary } from './pages/Glossary';
import { AIBuilder } from './pages/AIBuilder';
import { CourseStep, StepStatus } from './types';

// Wrapper to get current location for context
const AppContent: React.FC = () => {
  const location = useLocation();

  const steps: CourseStep[] = [
    { id: 'setup', title: '1. Tools & Setup', description: 'Install VS Code', path: '/setup', status: StepStatus.ACTIVE },
    { id: 'code', title: '2. Writing Code', description: 'HTML & CSS Basics', path: '/code', status: StepStatus.ACTIVE },
    { id: 'deploy', title: '3. Deployment', description: 'Publish to Netlify', path: '/deploy', status: StepStatus.ACTIVE },
  ];

  // Determine current context for AI
  let currentContext = "Welcome Page";
  if (location.pathname.includes('setup')) currentContext = "Setup Phase: Installing VS Code and Live Server";
  if (location.pathname.includes('code')) currentContext = "Coding Phase: Writing HTML and CSS for the workout app";
  if (location.pathname.includes('deploy')) currentContext = "Deployment Phase: Using Netlify Drop or GitHub";
  if (location.pathname.includes('glossary')) currentContext = "Glossary: Learning web development terminology";
  if (location.pathname.includes('builder')) currentContext = "AI Site Builder: Using Generative AI to create website code automatically";

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar steps={steps} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/code" element={<CodingWorkshop />} />
            <Route path="/deploy" element={<Deployment />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/builder" element={<AIBuilder />} />
          </Routes>
        </div>
        
        <GeminiTutor currentContext={currentContext} />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;