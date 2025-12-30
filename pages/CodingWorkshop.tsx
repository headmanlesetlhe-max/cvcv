import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code, Eye, ChevronRight, AlertCircle, Smartphone, FileJson } from 'lucide-react';

export const CodingWorkshop: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  
  const customState = location.state as { html: string; css: string; js?: string } | null;
  const isCustom = !!customState;

  // HTML Snippet
  const defaultHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitStart</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="site-header">
        <div class="container">
            <h1 class="logo">FitStart</h1>
        </div>
    </header>

    <main>
        <section class="workout-section">
            <button id="themeToggle" class="btn-theme">Toggle Dark Mode</button>
            <div class="container grid-layout">
                <article class="workout-card">
                    <img src="https://loremflickr.com/300/200/pushups,fitness" alt="Pushups" class="card-image">
                    <div class="card-content">
                        <h2>Pushups</h2>
                        <button class="btn-log" onclick="logWorkout('Pushups')">Log Set</button>
                    </div>
                </article>
            </div>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`;

  // CSS Snippet
  const defaultCss = `/* --- VARIABLES --- */
:root {
    --bg-color: #f0f9ff;
    --text-color: #1e293b;
    --card-bg: white;
}

body.dark-mode {
    --bg-color: #0f172a;
    --text-color: #f1f5f9;
    --card-bg: #1e293b;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: sans-serif;
    transition: background-color 0.3s ease;
}

.workout-card {
    background: var(--card-bg);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.btn-theme {
    margin: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
}`;

  // JS Snippet
  const defaultJs = `// --- SCRIPT.JS ---
// JavaScript handles the behavior (interactivity)

// 1. Select Elements
const themeBtn = document.getElementById('themeToggle');
const body = document.body;

// 2. Add Event Listener
themeBtn.addEventListener('click', () => {
    // Toggle the class that changes CSS variables
    body.classList.toggle('dark-mode');
    console.log("Theme toggled!");
});

// 3. Define Functions
function logWorkout(name) {
    alert(\`Great job doing \${name}! Saved to log.\`);
}`;

  const htmlCode = customState?.html || defaultHtml;
  const cssCode = customState?.css || defaultCss;
  const jsCode = customState?.js || defaultJs;

  // Create preview
  let previewDoc = htmlCode.replace(
    '<link rel="stylesheet" href="style.css">', 
    `<style>${cssCode}</style>`
  );
  
  // Inject JS
  if (previewDoc.includes('src="script.js"')) {
      previewDoc = previewDoc.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/i, `<script>${jsCode}</script>`);
  } else {
      previewDoc = previewDoc.replace('</body>', `<script>${jsCode}</script></body>`);
  }

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden">
      {/* LEFT PANEL: Instruction & Code */}
      <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full border-r border-slate-800 bg-slate-950">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-emerald-400" /> 
              {isCustom ? 'Developing Your AI Project' : 'Step 2: The Full Stack'}
            </h2>
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'html' ? 'bg-orange-500 text-white' : 'text-slate-400'}`}
              >
                HTML
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'css' ? 'bg-blue-500 text-white' : 'text-slate-400'}`}
              >
                CSS
              </button>
              <button
                onClick={() => setActiveTab('js')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'js' ? 'bg-yellow-500 text-white' : 'text-slate-400'}`}
              >
                JS
              </button>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            {isCustom 
              ? "Copy these 3 files into your VS Code folder to continue developing."
              : (activeTab === 'js' 
                ? "JavaScript (script.js) controls Behavior. It makes buttons work and updates data." 
                : "Switch tabs above to see how Structure (HTML), Style (CSS), and Behavior (JS) work together.")
            }
          </p>
        </div>

        <div className="flex-1 overflow-auto bg-[#1e1e1e] p-4 font-mono text-sm relative group">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => navigator.clipboard.writeText(activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode)}
              className="bg-slate-700 hover:bg-slate-600 text-xs text-white px-2 py-1 rounded"
            >
              Copy
            </button>
          </div>
          <pre className="text-slate-300">
            <code>
              {activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode}
            </code>
          </pre>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
          <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-200">
              <strong>Tip:</strong> Keep <code>index.html</code>, <code>style.css</code>, and <code>script.js</code> in the same folder.
            </div>
          </div>
          <button
            onClick={() => navigate('/deploy')}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            I've created the files <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT PANEL: Real Live Preview */}
      <div className="w-full md:w-1/2 flex flex-col h-1/2 md:h-full bg-slate-100">
        <div className="bg-white border-b border-slate-200 p-2 flex items-center gap-2 shadow-sm shrink-0">
          <div className="flex gap-1.5 ml-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex-1 bg-slate-100 rounded-md px-3 py-1 text-xs text-slate-500 text-center font-mono truncate">
            localhost:5500/index.html
          </div>
          <Eye className="w-4 h-4 text-slate-400 mr-2" />
        </div>

        <div className="flex-1 relative bg-white">
           <iframe
            srcDoc={previewDoc}
            title="Live Preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-modals allow-forms allow-popups"
           />
           
           {activeTab === 'js' && (
             <div className="absolute bottom-4 right-4 bg-yellow-900/90 text-yellow-100 text-xs px-3 py-2 rounded-lg shadow-xl backdrop-blur-md border border-yellow-700 pointer-events-none opacity-90">
                Try clicking the "Toggle Dark Mode" button!
             </div>
           )}
        </div>
      </div>
    </div>
  );
};