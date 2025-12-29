import React, { useState, useEffect } from 'react';
import { BrandForm } from './components/BrandForm';
import { BrandDisplay } from './components/BrandDisplay';
import { BrandState, BrandFormInputs } from './types';
import { generateBrandIdentity, generateBrandLogo } from './services/geminiService';
import { Sparkles, Layers, Cpu, Globe } from 'lucide-react';

const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({ text, delay = 0, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [text, isStarted]);

  return (
    <span className={`${className} transition-opacity duration-300 ${isStarted ? 'opacity-100' : 'opacity-0'}`}>
      {displayedText}
      <span className="inline-block w-[2px] h-[0.8em] bg-indigo-500 ml-1 animate-pulse"></span>
    </span>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<BrandState>({
    identity: null,
    logoUrl: null,
    loading: false,
    error: null
  });

  const handleForgeBrand = async (inputs: BrandFormInputs) => {
    setState({ ...state, loading: true, error: null, identity: null, logoUrl: null });
    try {
      const identity = await generateBrandIdentity(inputs);
      setState(prev => ({ ...prev, identity }));

      const logoUrl = await generateBrandLogo(identity);
      setState(prev => ({ ...prev, logoUrl, loading: false }));
    } catch (err: any) {
      console.error(err);
      setState({
        ...state,
        loading: false,
        error: err.message || 'The forging process was interrupted by a synthesis error.'
      });
    }
  };

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setState({ identity: null, logoUrl: null, loading: false, error: null }), 300);
  };

  return (
    <div className="min-h-screen selection:bg-white selection:text-black bg-[#0a0a0c]">
      {/* Editorial Navbar */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-8 no-print animate-reveal-1">
         <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={handleReset}>
               <span className="text-[10px] font-black text-white uppercase tracking-[0.5em] brand-serif italic">
                 BrandForge <span className="text-indigo-500">Studio</span>
               </span>
            </div>
            
            <div className="flex items-center">
               {state.identity && !state.loading && (
                  <button 
                    onClick={handleReset}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
                  >
                    Reset Identity
                  </button>
               )}
            </div>
         </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32">
        {!state.identity && !state.loading ? (
          <div>
            {/* Massive Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-32">
               <div className="lg:col-span-7 space-y-12">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full animate-reveal-2">
                     <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                     </span>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Core Engine Online</span>
                  </div>
                  
                  <h1 className="text-6xl md:text-[90px] lg:text-[100px] font-black text-white leading-[0.85] tracking-tighter uppercase brand-serif italic min-h-[1.8em]">
                    <TypewriterText text="Identity is" delay={2100} className="block" />
                    <TypewriterText text="Architected." delay={3000} className="text-slate-800 block" />
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-400 font-light max-w-xl leading-relaxed animate-reveal-3">
                    Transcending generic automation. Synthesis of industry intelligence and bespoke visual craft for the next era of ventures.
                  </p>

                  <div className="flex flex-wrap gap-12 pt-8 animate-reveal-4">
                     {[
                       { icon: <Layers size={18} />, label: 'Visual Synthesis' },
                       { icon: <Cpu size={18} />, label: 'Logic-Driven Craft' },
                       { icon: <Globe size={18} />, label: 'Universal Scale' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-3">
                          <span className="text-slate-600">{item.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="lg:col-span-5 relative animate-reveal-3">
                  <BrandForm onSubmit={handleForgeBrand} isLoading={state.loading} />
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full blur-[140px] opacity-20 pointer-events-none"></div>
               </div>
            </div>

            {/* Credibility Sections */}
            <div className="border-t border-white/5 py-24 grid grid-cols-1 md:grid-cols-3 gap-16 animate-reveal-4">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Synthesis Mode</h4>
                  <p className="text-slate-300 font-light leading-relaxed italic">Our algorithm doesn't just "generate"—it architecturally synthesizes your vision through the lens of modern design principles.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Standards</h4>
                  <p className="text-slate-300 font-light leading-relaxed italic">Outputting assets that meet the technical and aesthetic requirements of top-tier venture capital and global market entry.</p>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Future Resilience</h4>
                  <p className="text-slate-300 font-light leading-relaxed italic">Identity marks designed to remain relevant in a post-noise digital economy. Simplicity as the ultimate sophistication.</p>
               </div>
            </div>
          </div>
        ) : state.loading ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12 animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative group">
               <div className="w-48 h-48 border-[1px] border-white/5 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 border-[1px] border-white/10 rounded-full animate-[spin_10s_linear_infinite] border-t-indigo-500"></div>
                  <Sparkles className="absolute text-indigo-500 w-8 h-8 animate-pulse" />
               </div>
            </div>
            <div className="text-center space-y-6">
               <h3 className="text-4xl font-black text-white uppercase tracking-tighter brand-serif italic">Forging Your Identity</h3>
               <div className="flex justify-center gap-8">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] animate-pulse">Calculating Proportions</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] animate-pulse delay-150">Selecting Palette</p>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] animate-pulse delay-300">Rendering Mark</p>
               </div>
            </div>
          </div>
        ) : state.error ? (
          <div className="max-w-2xl mx-auto py-20 text-center space-y-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="inline-block p-10 bg-white/5 rounded-[40px] border border-white/5">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter brand-serif italic mb-4">Synthesis Failure</h3>
              <p className="text-slate-400 font-light leading-relaxed max-w-md mx-auto">{state.error}</p>
            </div>
            <button 
              onClick={handleReset}
              className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all"
            >
              Re-initiate Protocol
            </button>
          </div>
        ) : (
          state.identity && <BrandDisplay identity={state.identity} logoUrl={state.logoUrl} />
        )}
      </main>

      {/* Boutique Footer */}
      <footer className="mt-32 border-t border-white/5 py-12 px-8 no-print">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
              &copy; 2024 BrandForge Studio / Identity Architect v3.1
            </div>
            <div className="flex gap-8">
               <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Privacy</a>
               <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Terms</a>
               <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Agency</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;