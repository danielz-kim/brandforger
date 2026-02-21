
import React from 'react';
import { BrandIdentity } from '../types';
import { ColorPalette } from './ColorPalette';
import { Download, Smartphone, Globe, Layout, Palette, Type as TypeIcon } from 'lucide-react';

export const BrandDisplay: React.FC<{ identity: BrandIdentity; logoUrl: string | null }> = ({ identity, logoUrl }) => {
  const handleDownload = () => {
    window.print();
  };

  const primaryColor = identity.colors[0]?.hex || '#6366f1';

  return (
    <div className="space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-700 brand-guide-container pb-32">
      {/* 1. The Showcase Header */}
      <section className="text-center space-y-16 pt-12">
           <div className="flex justify-center relative">
              {logoUrl ? (
                <div className="group relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-all"></div>
                  <div className="relative p-10 bg-white rounded-[48px] shadow-2xl border border-slate-200 transition-transform hover:scale-[1.02]">
                    <img src={logoUrl} className="w-40 h-40 object-contain" alt="Logo Mark" />
                  </div>
                </div>
              ) : (
                <div className="w-40 h-40 bg-white/5 rounded-[48px] animate-pulse" />
              )}
           </div>
           
           <div className="space-y-6">
              <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter uppercase brand-serif italic leading-none">
                {identity.companyName}
              </h1>
              <div className="flex flex-col items-center gap-4">
                <p className="text-xl text-slate-400 font-light tracking-[0.4em] uppercase max-w-2xl mx-auto italic">
                  {identity.tagline}
                </p>
                <div className="h-1 w-24 bg-indigo-600 rounded-full"></div>
              </div>
           </div>
           
           <div className="no-print flex justify-center gap-4">
              <button 
                onClick={handleDownload}
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all shadow-xl shadow-white/5 active:scale-95"
              >
                <Download size={16} /> Export Assets
              </button>
           </div>
      </section>

      {/* 2. Visual Identity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto px-6">
        
        {/* Left: Strategy & Personality */}
        <div className="lg:col-span-5 bg-[#121214] rounded-[56px] p-16 border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-colors">
          <div className="space-y-12">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
               <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Brand Logic</span>
            </div>
            <p className="text-4xl text-white font-light brand-serif italic leading-[1.1]">"{identity.mission}"</p>
            
            <div className="space-y-8 pt-12 border-t border-white/5">
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Voice & Tone</h4>
                <p className="text-slate-300 text-lg italic leading-relaxed">{identity.brandVoice}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Strategic Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {identity.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] font-bold text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Colors & Type */}
        <div className="lg:col-span-7 bg-[#121214] rounded-[56px] p-16 border border-white/5 space-y-16 group hover:border-white/10 transition-colors">
           <div className="space-y-10">
              <div className="flex items-center gap-3">
                 <Palette size={16} className="text-indigo-500" />
                 <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Chromatics</span>
              </div>
              <ColorPalette colors={identity.colors} />
           </div>
           
           <div className="space-y-8 pt-12 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <TypeIcon size={16} className="text-indigo-500" />
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Typography</span>
                </div>
                <p className="text-[10px] font-bold text-white uppercase tracking-[0.5em]">{identity.typography.headingFont}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-4">
                    <p className="text-5xl font-bold tracking-tighter brand-serif italic" style={{ fontFamily: identity.typography.headingFont }}>Aa Bb Cc</p>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Primary Display</p>
                 </div>
                 <p className="text-sm text-slate-400 italic leading-relaxed">{identity.typography.reasoning}</p>
              </div>
           </div>
        </div>
      </div>

      {/* 3. The "Usable" Mockups Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex items-center gap-4">
           <Layout size={18} className="text-indigo-500" />
           <h2 className="text-2xl font-black text-white uppercase tracking-tighter brand-serif italic">Identity In Context</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* App Icon Mockup */}
            <div className="bg-[#121214] border border-white/5 rounded-[48px] p-12 flex flex-col items-center justify-center space-y-8 h-[400px]">
               <div className="relative">
                  <div className="w-28 h-28 rounded-[28px] overflow-hidden shadow-2xl transition-transform hover:scale-110 duration-500" style={{ backgroundColor: primaryColor }}>
                     {logoUrl && <img src={logoUrl} className="w-full h-full object-contain p-6 invert brightness-200" alt="App Icon" />}
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mobile Icon</div>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                  <Smartphone size={12} className="text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-400">iOS Standard</span>
               </div>
            </div>

            {/* Dark Mode Branding */}
            <div className="bg-slate-900 border border-white/5 rounded-[48px] p-12 flex flex-col items-center justify-center space-y-8 h-[400px] overflow-hidden group">
               <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
                 {logoUrl && <img src={logoUrl} className="w-24 h-24 object-contain invert grayscale brightness-200 opacity-80 group-hover:opacity-100 transition-opacity" alt="Dark Mode" />}
                 <div className="text-center">
                    <p className="text-white text-3xl font-bold tracking-tighter brand-serif italic">{identity.companyName}</p>
                    <p className="text-slate-500 text-[9px] uppercase tracking-[0.3em] font-bold mt-2">Dark Utility Mark</p>
                 </div>
               </div>
            </div>

            {/* Social/Profile Mockup */}
            <div className="bg-white border border-slate-200 rounded-[48px] p-12 flex flex-col items-center justify-center space-y-8 h-[400px] group">
               <div className="relative">
                 <div className="w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden shadow-xl transition-all group-hover:rotate-12">
                   {logoUrl && <img src={logoUrl} className="w-full h-full object-contain p-4" alt="Profile" />}
                 </div>
                 <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                 </div>
               </div>
               <div className="text-center space-y-2">
                  <p className="text-slate-900 text-2xl font-black tracking-tight">{identity.companyName}</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                    <Globe size={12} /> Verified Venture
                  </p>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
};
