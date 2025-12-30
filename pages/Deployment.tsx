import React, { useState } from 'react';
import { Cloud, Upload, Link as LinkIcon, PartyPopper, FolderOpen, ArrowRight, Github, RefreshCw, Info, ExternalLink } from 'lucide-react';

export const Deployment: React.FC = () => {
  const [method, setMethod] = useState<'drop' | 'github'>('drop');

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8 pb-24">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Step 3: Show the World</h1>
        
        {/* CLARIFICATION BOX */}
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3 text-left max-w-2xl mx-auto mb-8">
          <Info className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-blue-400 text-base">Wait, do I need to download Netlify?</h4>
            <p className="text-sm text-blue-200/70 mt-1 leading-relaxed">
              <strong>No!</strong> Netlify is a website (a cloud platform). You do <span className="underline decoration-wavy decoration-blue-400/50">not</span> install it on your computer. 
              You just create an account and log in via your browser, exactly like you would for Gmail or Facebook.
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          Your code currently lives on your computer (localhost). Let's move it to the internet using <strong>Netlify</strong>.
        </p>

        {/* Method Toggles */}
        <div className="inline-flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setMethod('drop')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              method === 'drop' 
                ? 'bg-emerald-500 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Method 1: Drag & Drop (Simple)
          </button>
          <button
            onClick={() => setMethod('github')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              method === 'github' 
                ? 'bg-[#24292e] text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Method 2: GitHub (Professional)
          </button>
        </div>
      </div>

      {method === 'drop' ? (
        <div className="grid md:grid-cols-2 gap-8 items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Instruction Card - DROP */}
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-emerald-400" />
                Netlify Drop
              </h3>
              <ol className="space-y-6 relative border-l border-slate-800 ml-3">
                <li className="pl-8 relative">
                  <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">1</span>
                  <p className="text-slate-300">Open <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-emerald-400 underline decoration-dotted underline-offset-4 hover:text-emerald-300">Netlify Drop website</a> in a new tab.</p>
                </li>
                <li className="pl-8 relative">
                  <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">2</span>
                  <p className="text-slate-300">Locate your <strong>my-website</strong> folder on your Desktop.</p>
                </li>
                <li className="pl-8 relative">
                  <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">3</span>
                  <p className="text-slate-300">Drag the <strong>entire folder</strong> onto the circle area on the Netlify page.</p>
                </li>
              </ol>
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex gap-3">
              <PartyPopper className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-400">That's it!</h4>
                <p className="text-sm text-emerald-200/70">Netlify will give you a random URL. You can share this link instantly.</p>
              </div>
            </div>
          </div>

          {/* Visual Simulation - DROP */}
          <div className="bg-slate-200 rounded-xl p-8 aspect-square flex flex-col items-center justify-center relative overflow-hidden group border-4 border-dashed border-slate-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-100 to-slate-200"></div>
            
            <div className="relative z-10 w-32 h-24 bg-blue-100 rounded-lg border-2 border-blue-300 flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-500 cursor-grab active:cursor-grabbing">
              <FolderOpen className="w-10 h-10 text-blue-500" />
              <div className="absolute -bottom-6 text-slate-500 font-mono text-sm">my-website</div>
            </div>

            <div className="relative z-0 mt-8">
              <ArrowRight className="w-8 h-8 text-slate-400 rotate-90 animate-bounce" />
            </div>

            <div className="relative z-0 mt-4 w-48 h-48 rounded-full border-4 border-dashed border-emerald-400/50 flex items-center justify-center bg-white/50">
              <div className="text-center">
                <Upload className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Drop Here</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {/* GitHub Guide */}
           <div className="grid md:grid-cols-2 gap-8">
             <div className="space-y-6">
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-full">
                 <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                   <div className="bg-white/10 p-1.5 rounded-lg">
                    <Github className="w-5 h-5 text-white" />
                   </div>
                   1. Put code on GitHub
                 </h3>
                 <p className="text-slate-400 text-sm mb-6 border-b border-slate-800 pb-4">
                   GitHub is a cloud storage website for code.
                 </p>
                 <ol className="space-y-6 relative border-l border-slate-800 ml-3">
                    <li className="pl-8 relative">
                      <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">1</span>
                      <p className="text-slate-300 text-sm">
                        Create a free account at <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">github.com <ExternalLink className="w-3 h-3"/></a>.
                        <br/><span className="text-orange-400 text-xs mt-1 block">Important: Go to your email and verify your account!</span>
                      </p>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">2</span>
                      <p className="text-slate-300 text-sm">Log in. Click the <strong>+</strong> icon (top right) and select <strong>New repository</strong>.</p>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">3</span>
                      <p className="text-slate-300 text-sm">Repo name: <code>fitstart-app</code>. Scroll down and click <strong className="text-green-400">Create repository</strong>.</p>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">4</span>
                      <p className="text-slate-300 text-sm">Look for the link that says: <span className="text-blue-300 italic">uploading an existing file</span>. Click it.</p>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">5</span>
                      <p className="text-slate-300 text-sm">Drag your <code>index.html</code> and <code>style.css</code> files onto the screen. Wait for them to load.</p>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">6</span>
                      <p className="text-slate-300 text-sm">Click the green <strong className="bg-green-600/20 text-green-400 px-1.5 py-0.5 rounded border border-green-600/50">Commit changes</strong> button at the bottom.</p>
                    </li>
                 </ol>
               </div>
             </div>

             <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-full">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="bg-emerald-500/20 p-1.5 rounded-lg">
                      <Cloud className="w-5 h-5 text-emerald-400" />
                    </div>
                    2. Connect Netlify
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 border-b border-slate-800 pb-4">
                    Now we connect the Netlify website to your GitHub account.
                  </p>
                  <ol className="space-y-6 relative border-l border-slate-800 ml-3">
                      <li className="pl-8 relative">
                        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">1</span>
                        <p className="text-slate-300 text-sm">Go to <a href="https://app.netlify.com" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline inline-flex items-center gap-1">netlify.com <ExternalLink className="w-3 h-3"/></a>. Sign up (it's free).</p>
                      </li>
                      <li className="pl-8 relative">
                        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">2</span>
                        <p className="text-slate-300 text-sm">Once logged in, click <strong>Add new site</strong> then select <strong>Import from an existing project</strong>.</p>
                      </li>
                      <li className="pl-8 relative">
                        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">3</span>
                        <p className="text-slate-300 text-sm">Click the big <strong>GitHub</strong> button. <br/><span className="text-slate-400 text-xs">A popup window will appear. Click "Authorize Netlify" to give permission.</span></p>
                      </li>
                      <li className="pl-8 relative">
                        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">4</span>
                        <p className="text-slate-300 text-sm">You will see a list of repos. Click <strong>fitstart-app</strong>.</p>
                      </li>
                      <li className="pl-8 relative">
                        <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white">5</span>
                        <p className="text-slate-300 text-sm">Click the blue <strong className="text-blue-400">Deploy Fitstart-app</strong> button.</p>
                      </li>
                  </ol>
                </div>
             </div>
           </div>

           <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3">
              <RefreshCw className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h4 className="font-bold text-blue-400">Why do it this way?</h4>
                <p className="text-sm text-blue-200/70">
                  This is "Continuous Deployment". If you edit your file on GitHub (or upload a new one), your website updates automatically within seconds. This is how pros do it!
                </p>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};