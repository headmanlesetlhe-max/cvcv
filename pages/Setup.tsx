import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, Layers, MonitorPlay, Info } from 'lucide-react';

export const Setup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Step 1: The Toolbox</h1>
        <p className="text-slate-400 text-lg">
          Before we cook, we need a kitchen. In web development, our kitchen is a "Code Editor". 
        </p>

        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3 mt-6">
          <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-100/80">
            <strong>Reality Check:</strong> VS Code is the <span className="underline decoration-wavy">only</span> software you need to install on your computer for this entire course. Everything else (like Netlify or GitHub) runs in your web browser.
          </p>
        </div>
      </div>

      {/* VS Code Section */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center gap-4">
          <div className="bg-[#007ACC] p-3 rounded-lg">
            <MonitorPlay className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Visual Studio Code</h2>
            <p className="text-slate-400 text-sm">Not to be confused with "Visual Studio"</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold text-white">Instructions:</h3>
              <ol className="space-y-4 text-slate-300 list-decimal pl-5">
                <li>Go to <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">code.visualstudio.com</a>.</li>
                <li>Click the big download button for your OS (Windows, Mac, etc).</li>
                <li>Install it just like any other program (Next, Next, Finish).</li>
                <li>Open the app! It should look dark and somewhat empty.</li>
              </ol>
            </div>
            <div className="w-full md:w-64 bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
              <Download className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-xs text-slate-500">
                Don't have it installed? <br/>
                We can wait.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extensions Section */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center gap-4">
          <div className="bg-purple-600 p-3 rounded-lg">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Superpowers (Extensions)</h2>
            <p className="text-slate-400 text-sm">Let's make coding easier.</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-slate-300 mb-6">
            Inside VS Code, look for the "Extensions" icon on the left sidebar (it looks like squares). 
            Search for and install <strong>"Live Server"</strong>.
          </p>
          
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center gap-4">
            <div className="h-12 w-12 bg-purple-500/20 rounded flex items-center justify-center text-purple-400 font-bold">
              LS
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white">Live Server</h4>
              <p className="text-sm text-slate-500">By Ritwick Dey</p>
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20">
              Essential
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            <strong>Why?</strong> This lets you right-click your HTML file and select "Open with Live Server" 
            to see your website update instantly in Chrome as you type!
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button
          onClick={() => navigate('/code')}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-all"
        >
          I have installed everything <Check className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};