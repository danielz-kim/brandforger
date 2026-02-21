
import React, { useState, useEffect } from 'react';
import { BrandForm } from './components/BrandForm';
import { BrandDisplay } from './components/BrandDisplay';
import { BrandState, BrandFormInputs } from './types';
import { generateBrandIdentities, generateBrandLogo } from './services/geminiService';
import { Zap, Clock, Rocket, CheckCircle2, LayoutGrid } from 'lucide-react';

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
    identities: null,
    selectedIndex: 0,
    logoUrls: [null, null, null],
    loading: false,
    error: null
  });

  const handleForgeBrand = async (inputs: BrandFormInputs) => {
    setState({ ...state, loading: true, error: null, identities: null, logoUrls: [null, null, null] });
    try {
      const identities = await generateBrandIdentities(inputs);
      setState(prev => ({ ...prev, identities }));

      // Generate all 3 logos in parallel
      const logoPromises = identities.map(identity => generateBrandLogo(identity));
      const logos = await Promise.all(logoPromises);
      
      setState(prev => ({ 
        ...prev, 
        logoUrls: logos, 
        loading: false 
      }));
    } catch (err: any) {
      console.error(err);
      setState({
        ...state,
        loading: false,
        error: err.message || 'The forging process was interrupted.'
      });
    }
  };

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setState({ identities: null, selectedIndex: 0, logoUrls: [null, null, null], loading: false, error: null }), 300);
  };

  const setSelectedIndex = (index: number) => {
    setState(prev => ({ ...prev, selectedIndex: index }));
  };

  return (
    <div className="min-h-screen selection:bg-indigo-500 selection:text-white bg-[#0a0a0c]">
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-8 no-print">
         <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={handleReset}>
               <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                  <Zap size={18} className="text-white fill-white" />
               </div>
               <span className="text-lg font-black text-white uppercase tracking-tighter brand-serif italic">
                 Brand<span className="text-indigo-500">Dash</span>
               </span>
            </div>
            
            <div className="flex items-center gap-6">
               {state.identities && !state.loading && (
                  <button 
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
                  >
                    New Search
                  </button>
               )}
            </div>
         </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32">
        {!state.identities && !state.loading ? (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center mb-32">
               <div className="lg:col-span-7 space-y-12">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                     <Clock size={14} className="text-indigo-400" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Zero to Hero in 30s</span>
                  </div>
                  
                  <h1 className="text-6xl md:text-[80px] lg:text-[90px] font-black text-white leading-[0.9] tracking-tighter uppercase brand-serif italic">
                    <TypewriterText text="Stop Stalling" delay={200} className="block" />
                    <TypewriterText text="Start Building." delay={1000} className="text-indigo-500 block" />
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-400 font-light max-w-xl leading-relaxed">
                    Get professional branding in seconds. We handle the aesthetics so you can focus on the work that actually matters.
                  </p>

                  <div className="flex flex-wrap gap-8 pt-8">
                     {[
                       { icon: <CheckCircle2 size={18} />, label: '3 Distinct Concepts' },
                       { icon: <Rocket size={18} />, label: 'Instant SVG Logos' },
                       { icon: <LayoutGrid size={18} />, label: 'Full Guide' }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-3">
                          <span className="text-indigo-500">{item.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="lg:col-span-5 relative">
                  <BrandForm onSubmit={handleForgeBrand} isLoading={state.loading} />
               </div>
            </div>
          </div>
        ) : state.loading ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate-in fade-in duration-700">
            <div className="relative">
              <div className="w-24 h-24 border-2 border-indigo-500/20 rounded-full flex items-center justify-center">
                 <div className="w-16 h-16 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
              </div>
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500 w-8 h-8 animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white uppercase tracking-tighter brand-serif italic">Generating Concepts</h3>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] mt-2">Dashing through the design space...</p>
            </div>
          </div>
        ) : state.error ? (
          <div className="max-w-2xl mx-auto py-20 text-center space-y-12">
            <div className="p-10 bg-red-500/5 rounded-[40px] border border-red-500/10">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter brand-serif italic mb-4">Draft Failed</h3>
              <p className="text-slate-400 font-light">{state.error}</p>
            </div>
            <button onClick={handleReset} className="px-12 py-4 bg-white text-black rounded-full font-bold uppercase text-xs">Retry</button>
          </div>
        ) : (
          state.identities && (
            <div className="animate-in fade-in duration-500">
              {/* Concept Selector Tabs */}
              <div className="flex justify-center mb-12 sticky top-24 z-50 no-print">
                <div className="bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10 flex gap-2">
                  {state.identities.map((identity, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedIndex(i)}
                      className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        state.selectedIndex === i 
                        ? 'bg-white text-black shadow-xl' 
                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Concept {['Alpha', 'Beta', 'Gamma'][i]}
                    </button>
                  ))}
                </div>
              </div>
              <BrandDisplay 
                identity={state.identities[state.selectedIndex]} 
                logoUrl={state.logoUrls[state.selectedIndex]} 
              />
            </div>
          )
        )}
      </main>
      
      <footer className="mt-32 border-t border-white/5 py-12 px-8 no-print text-center">
        <div className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">
          BrandDash &copy; 2024 / Quick identities for rapid builders
        </div>
      </footer>
    </div>
  );
};

export default App;
