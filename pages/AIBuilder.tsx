import React, { useState, useRef, useEffect } from 'react';
import { 
  Wand2, Download, Code, Eye, Send, Paperclip, 
  Bot, User, Loader2, ArrowRight, X, Image as ImageIcon, Sparkles, UploadCloud,
  Monitor, Smartphone, Tablet, FileCode, Palette, Undo, Redo,
  LayoutGrid, Clock, AlertTriangle
} from 'lucide-react';
import { chatWithArchitect, ArchitectResponse } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';
import { ChatMessage } from '../types';

export const AIBuilder: React.FC = () => {
  const navigate = useNavigate();
  
  // -- State --
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  
  // Quota Timer State
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  
  // Image handling
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageArrangement, setImageArrangement] = useState<string>('Auto');
  const [imageTheme, setImageTheme] = useState<string>('Auto');
  const themes = ['Auto', 'Nature', 'Technology', 'Abstract', 'Modern', 'Minimalist', 'Neon', 'Vintage', 'Business', 'Cyberpunk'];
  
  // Site State
  const [currentHtml, setCurrentHtml] = useState('');
  const [currentCss, setCurrentCss] = useState('');
  const [currentJs, setCurrentJs] = useState('');

  // History State for Undo/Redo
  const [history, setHistory] = useState<{html: string, css: string, js: string, images: string[]}[]>([{html: '', css: '', js: '', images: []}]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // UI State
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [codeFileTab, setCodeFileTab] = useState<'html' | 'css' | 'js'>('html');
  const [mobileTab, setMobileTab] = useState<'chat' | 'result'>('chat'); 
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectImportRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // -- Quota Timer Logic --
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setInterval(() => {
        setCooldownSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownSeconds]);

  // -- Scroll to bottom of chat --
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // -- Calculate Scale for Preview --
  useEffect(() => {
    const calculateScale = () => {
      if (!previewContainerRef.current || previewDevice === 'desktop') {
        setScale(1);
        return;
      }
      const parent = previewContainerRef.current;
      const availableWidth = parent.clientWidth - 40; 
      const availableHeight = parent.clientHeight - 40;
      const targetWidth = previewDevice === 'tablet' ? 768 : 375;
      const targetHeight = previewDevice === 'tablet' ? 1024 : 667;
      const scaleX = availableWidth / targetWidth;
      const scaleY = availableHeight / targetHeight;
      const newScale = Math.min(scaleX, scaleY, 0.85);
      setScale(newScale);
    };
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [previewDevice, mobileTab, activeTab]);

  const updateCode = (newHtml: string, newCss: string, newJs: string, newImages: string[]) => {
    const activeImages = newImages.length > 0 ? newImages : (history[historyIndex]?.images || []);
    if (history[historyIndex] && 
        history[historyIndex].html === newHtml && 
        history[historyIndex].css === newCss &&
        history[historyIndex].js === newJs &&
        JSON.stringify(history[historyIndex].images) === JSON.stringify(activeImages)
       ) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ html: newHtml, css: newCss, js: newJs, images: activeImages });
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentHtml(newHtml);
    setCurrentCss(newCss);
    setCurrentJs(newJs);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentHtml(history[newIndex].html);
      setCurrentCss(history[newIndex].css);
      setCurrentJs(history[newIndex].js);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentHtml(history[newIndex].html);
      setCurrentCss(history[newIndex].css);
      setCurrentJs(history[newIndex].js);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const promises = newFiles.map(file => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      }));
      Promise.all(promises).then(base64Images => {
        setSelectedImages(prev => [...prev, ...base64Images]);
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if ((!textToSend.trim() && selectedImages.length === 0) || isGenerating || cooldownSeconds > 0) return;

    const imagesToSend = [...selectedImages];
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend || (imagesToSend.length > 0 ? `Attached ${imagesToSend.length} image(s).` : ""),
      images: imagesToSend.length > 0 ? imagesToSend : undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setSelectedImages([]); 
    setSuggestions([]); 
    setIsGenerating(true);
    
    if (messages.length === 0) setMobileTab('result');

    const result = await chatWithArchitect([...messages, newUserMsg], currentHtml, currentCss, imagesToSend, imageTheme, imageArrangement);

    if (result) {
      if (result.quotaExceeded) {
        setCooldownSeconds(result.retryAfterSeconds || 60);
      } else {
        updateCode(result.html, result.css, result.javascript || '', imagesToSend);
        setSuggestions(result.suggestions || []);
      }
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.message,
        timestamp: new Date()
      }]);
    } else {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Sorry, I encountered an error while building. Please try again.",
        timestamp: new Date()
      }]);
    }

    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!currentHtml) return;
    let finalHtml = currentHtml;
    const activeImages = history[historyIndex]?.images || [];
    if (activeImages.length > 0) {
      activeImages.forEach((img, idx) => {
        finalHtml = finalHtml.replace(new RegExp(`__USER_IMAGE_${idx}__`, 'g'), img);
        if (idx === 0) finalHtml = finalHtml.replace(/__USER_IMAGE__/g, img);
      });
    }
    const htmlBlob = new Blob([finalHtml], { type: 'text/html' });
    const cssBlob = new Blob([currentCss], { type: 'text/css' });
    const jsBlob = new Blob([currentJs], { type: 'text/javascript' });
    
    const downloadFile = (blob: Blob, name: string) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    downloadFile(htmlBlob, 'index.html');
    setTimeout(() => downloadFile(cssBlob, 'style.css'), 200);
    setTimeout(() => downloadFile(jsBlob, 'script.js'), 400);
  };

  const getPreviewDoc = () => {
    if (!currentHtml) return '';
    let doc = currentHtml;
    if (!doc.includes('name="viewport"')) doc = doc.replace('<head>', '<head><meta name="viewport" content="width=device-width, initial-scale=1.0">');
    if (doc.includes('href="style.css"')) doc = doc.replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${currentCss}</style>`);
    else doc = doc.replace('<head>', `<head><style>${currentCss}</style>`);
    if (doc.includes('src="script.js"')) doc = doc.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/i, `<script>${currentJs}</script>`);
    else doc = doc.replace('</body>', `<script>${currentJs}</script></body>`);

    const activeImages = history[historyIndex]?.images || [];
    if (activeImages.length > 0) {
      activeImages.forEach((img, idx) => {
        doc = doc.replace(new RegExp(`__USER_IMAGE_${idx}__`, 'g'), img);
        if (idx === 0) doc = doc.replace(/__USER_IMAGE__/g, img);
      });
    }
    return doc;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 overflow-hidden">
      <input type="file" ref={projectImportRef} className="hidden" accept=".html,.css,.js" multiple />

      <div className="md:hidden flex border-b border-slate-800 bg-slate-900">
        <button onClick={() => setMobileTab('chat')} className={`flex-1 py-3 text-sm font-medium ${mobileTab === 'chat' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}>Chat</button>
        <button onClick={() => setMobileTab('result')} className={`flex-1 py-3 text-sm font-medium ${mobileTab === 'result' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400'}`}>Result</button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className={`w-full md:w-[400px] lg:w-[450px] flex flex-col border-r border-slate-800 bg-slate-900 ${mobileTab === 'result' ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-purple-500 to-indigo-500 p-2 rounded-lg shadow-lg">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white">AI Architect</h2>
                <p className="text-xs text-slate-400">Gemini Builder</p>
              </div>
            </div>
            {cooldownSeconds > 0 && (
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full animate-pulse">
                <Clock className="w-3 h-3 text-amber-500" />
                <span className="text-xs font-bold text-amber-500 font-mono">Cooldown: {cooldownSeconds}s</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.length === 0 && (
              <div className="text-center mt-10 space-y-4">
                <Bot className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="text-slate-400 text-sm max-w-[250px] mx-auto">Tell me what to build. I can handle layouts, logic, and multi-page apps.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"><Bot className="w-4 h-4 text-indigo-400" /></div>}
                <div className={`max-w-[85%] space-y-2 p-3 text-sm rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                  {msg.text.includes('Limit Reached') ? (
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-amber-400 font-bold">
                         <AlertTriangle className="w-4 h-4" /> Traffic Limit!
                       </div>
                       <p>{msg.text}</p>
                    </div>
                  ) : msg.text}
                </div>
                {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30"><User className="w-4 h-4 text-emerald-400" /></div>}
              </div>
            ))}
            {isGenerating && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30"><Loader2 className="w-4 h-4 text-indigo-400 animate-spin" /></div>
                <div className="bg-slate-800 text-slate-400 p-3 rounded-2xl rounded-bl-none border border-slate-700 text-sm italic">Architect is designing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {suggestions.length > 0 && !isGenerating && cooldownSeconds === 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s, i) => <button key={i} onClick={() => handleSendMessage(s)} className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-3 py-1.5 rounded-full transition-colors">{s}</button>)}
            </div>
          )}

          <div className="p-4 bg-slate-900 border-t border-slate-800">
            {cooldownSeconds > 0 && (
               <div className="mb-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-amber-500 animate-pulse" />
                 </div>
                 <div>
                   <h4 className="text-sm font-bold text-amber-500">Wait for Quota Reset</h4>
                   <p className="text-[10px] text-amber-500/70">Google throttles free users. Next request available in <span className="font-mono font-bold underline">{cooldownSeconds}s</span>.</p>
                 </div>
               </div>
            )}

            <div className="relative flex items-end gap-2">
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={cooldownSeconds > 0}
                className={`p-3 rounded-xl transition-colors ${cooldownSeconds > 0 ? 'bg-slate-800 opacity-30 cursor-not-allowed' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                <Paperclip className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isGenerating || cooldownSeconds > 0}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder={cooldownSeconds > 0 ? `Wait ${cooldownSeconds}s...` : "Modify your app..."}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 disabled:opacity-50 resize-none"
                  rows={1}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={(!input.trim() && selectedImages.length === 0) || isGenerating || cooldownSeconds > 0}
                  className="absolute right-2 bottom-2 p-1.5 bg-indigo-500 text-white rounded-lg disabled:opacity-50"
                >
                  {cooldownSeconds > 0 ? <span className="text-[10px] font-bold font-mono">{cooldownSeconds}</span> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex-1 flex flex-col bg-slate-100 ${mobileTab === 'chat' ? 'hidden md:flex' : 'flex'}`}>
          <div className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button onClick={handleUndo} disabled={historyIndex <= 0} className="p-1.5 rounded-md disabled:text-slate-300"><Undo className="w-4 h-4" /></button>
                <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="p-1.5 rounded-md disabled:text-slate-300"><Redo className="w-4 h-4" /></button>
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button onClick={() => setActiveTab('preview')} className={`px-3 py-1.5 rounded-md text-xs font-bold ${activeTab === 'preview' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Preview</button>
                <button onClick={() => setActiveTab('code')} className={`px-3 py-1.5 rounded-md text-xs font-bold ${activeTab === 'code' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Code</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentHtml && <button onClick={handleDownload} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold"><Download className="w-3 h-3" /> Download</button>}
              <button onClick={() => navigate('/deploy')} className="text-slate-500 hover:text-slate-900 text-xs font-medium flex items-center gap-1">Deploy <ArrowRight className="w-3 h-3" /></button>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden flex flex-col">
            {!currentHtml ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400"><Wand2 className="w-12 h-12 mb-4 opacity-20" /><p>Start a conversation to build your site</p></div>
            ) : (
              activeTab === 'preview' ? (
                <div ref={previewContainerRef} className="w-full h-full p-4 flex items-center justify-center bg-slate-200/50">
                  <div className={`bg-white shadow-2xl transition-all duration-300 ${previewDevice === 'desktop' ? 'w-full h-full' : 'w-[375px] h-[667px] rounded-[2rem] border-[8px] border-slate-800'}`} style={{ transform: previewDevice !== 'desktop' ? `scale(${scale})` : 'none' }}>
                    <iframe srcDoc={getPreviewDoc()} className="w-full h-full border-none" sandbox="allow-scripts allow-modals allow-forms allow-popups" />
                  </div>
                </div>
              ) : (
                <div className="h-full bg-[#1e1e1e] flex flex-col">
                   <div className="flex border-b border-slate-700">
                     {['html', 'css', 'js'].map(t => <button key={t} onClick={() => setCodeFileTab(t as any)} className={`px-4 py-2 text-xs font-mono ${codeFileTab === t ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>{t.toUpperCase()}</button>)}
                   </div>
                   <pre className="p-4 text-xs font-mono text-slate-300 overflow-auto whitespace-pre-wrap">{codeFileTab === 'html' ? currentHtml : codeFileTab === 'css' ? currentCss : currentJs}</pre>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}