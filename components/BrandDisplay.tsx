
import React from 'react';
import { BrandIdentity } from '../types';
import { ColorPalette } from './ColorPalette';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, Share2, Printer, Type as TypeIcon, Palette as PaletteIcon, Target, Box, ChevronRight, Maximize2 } from 'lucide-react';

export const BrandDisplay: React.FC<{ identity: BrandIdentity; logoUrl: string | null }> = ({ identity, logoUrl }) => {
  const chartData = [
    { x: identity.marketPositioning.valueX, y: identity.marketPositioning.valueY, name: identity.companyName }
  ];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="space-y-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 brand-guide-container pb-32 selection:bg-indigo-500/30">
      {/* Title / Hero Header */}
      <section className="relative pt-24 pb-40 border-b border-white/5 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-16">
           <div className="inline-block no-print animate-float">
             <div className="p-2 rounded-[2.5rem]">
              {logoUrl ? (
                <img src={logoUrl} className="w-32 h-32 object-contain rounded-2xl shadow-2xl mix-blend-lighten" alt="Logo" />
              ) : (
                <div className="w-24 h-24 bg-slate-100 rounded-xl animate-pulse" />
              )}
             </div>
           </div>
           
           <div className="space-y-8">
              <h1 className="text-[120px] font-black text-white tracking-tighter uppercase brand-serif italic leading-[0.8]">
                {identity.companyName}
              </h1>
              <div className="flex items-center justify-center gap-6">
                <div className="h-px w-12 bg-indigo-500/30"></div>
                <p className="text-2xl text-slate-400 font-light tracking-[0.4em] uppercase">
                  {identity.tagline}
                </p>
                <div className="h-px w-12 bg-indigo-500/30"></div>
              </div>
           </div>
           
           <div className="flex justify-center gap-8 pt-12 no-print">
              <button 
                onClick={handleDownload}
                className="group flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-indigo-50 transition-all shadow-2xl active:scale-[0.98]"
              >
                <Download size={16} /> Export Master Brand Guide
              </button>
           </div>
        </div>
      </section>

      {/* Visual Identity Section - Deep Dive on the Mark */}
      <section className="px-6 py-40 bg-white text-black rounded-[80px] mx-4 shadow-[0_40px_100px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-8">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.5em]">Section 01 / The Mark</span>
              <h2 className="text-8xl font-black tracking-tighter brand-serif italic leading-none">The Artifact.</h2>
              <div className="h-2 w-32 bg-black"></div>
            </div>
            <div className="max-w-lg space-y-6">
              <p className="text-xl text-slate-800 leading-relaxed font-light">
                Our visual identity is anchored by a singular, mathematically constructed mark. It is a distillation of the brand's essence into its purest geometric form.
              </p>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Maximize2 size={14} /> Edge-to-Edge Vector Definition
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Showcase */}
            <div className="lg:col-span-8 bg-[#f5f5f7] rounded-[60px] aspect-video flex items-center justify-center p-20 border border-slate-100 shadow-inner group overflow-hidden">
               {logoUrl ? (
                 <img src={logoUrl} alt="Main Logo" className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[3s] group-hover:scale-110" />
               ) : (
                 <div className="animate-pulse text-slate-300 uppercase tracking-[0.8em] text-xs font-bold">Synthesizing Core Mark...</div>
               )}
            </div>
            
            {/* Tech Specs */}
            <div className="lg:col-span-4 flex flex-col gap-12">
               <div className="bg-slate-900 rounded-[60px] p-12 flex flex-col justify-between aspect-square shadow-2xl group overflow-hidden border border-white/5">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Dark Application</p>
                    <div className="h-px w-8 bg-white/20"></div>
                  </div>
                  <div className="flex justify-center items-center py-4">
                    {logoUrl && <img src={logoUrl} className="w-full h-full object-contain invert grayscale transition-all duration-1000 group-hover:scale-110 mix-blend-screen" alt="Logo Inverse" />}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="h-8 w-8 rounded-full border border-white/10"></div>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">v1.0.24</span>
                  </div>
               </div>
               
               <div className="bg-indigo-50 rounded-[60px] p-16 flex flex-col justify-center space-y-6 border border-indigo-100">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-900/50">Geometric Fidelity</h4>
                  <p className="text-sm text-indigo-900/70 font-light italic leading-relaxed">
                    The mark's construction leverages clear mathematical proportions, ensuring it retains impact across micro-displays and large-format installations.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Editorial Style */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start px-6 max-w-7xl mx-auto">
        <div className="lg:col-span-5 space-y-8">
           <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-[0.5em]">Section 02 / Strategic Core</span>
           <h2 className="text-7xl font-bold text-white leading-tight brand-serif italic">The Visionary <br/> Narrative.</h2>
           <div className="p-12 bg-white/5 rounded-[48px] border border-white/5 backdrop-blur-3xl space-y-8">
              <div className="flex items-center gap-4">
                 <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Target Audience Profile</p>
              </div>
              <p className="text-2xl text-slate-200 leading-relaxed font-light">{identity.targetAudience}</p>
           </div>
        </div>
        <div className="lg:col-span-7 space-y-20 pt-12">
           <div className="relative">
             <p className="text-6xl text-slate-100 leading-[1.1] font-light brand-serif">
               “{identity.mission}”
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-white/10 pt-16">
             <div className="space-y-6">
               <h4 className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-[0.4em]">
                 <Box size={16} className="text-indigo-400" /> Tonal Signature
               </h4>
               <p className="text-slate-400 text-xl leading-relaxed font-light italic">{identity.brandVoice}</p>
             </div>
             <div className="flex flex-wrap gap-4 items-start">
                {identity.keywords.map((kw, i) => (
                  <div key={i} className="text-[10px] font-bold text-slate-300 border border-white/10 px-6 py-4 rounded-full uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                    {kw}
                  </div>
                ))}
             </div>
           </div>
        </div>
      </section>

      {/* Chromatic System & Type */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-32 px-6 max-w-7xl mx-auto">
        <div className="space-y-20">
           <div className="space-y-8">
              <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-[0.5em]">Section 03 / Visual Vocabulary</span>
              <h2 className="text-7xl font-bold text-white brand-serif italic leading-none">Chromatic Logic.</h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed max-w-md">Our colors aren't just decorative; they are communicative. Each hue has been selected to evoke specific psychological responses.</p>
           </div>
           <ColorPalette colors={identity.colors} />
        </div>

        <div className="space-y-16 bg-[#0e0e11] p-20 rounded-[64px] border border-white/5 shadow-3xl">
           <div className="space-y-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    <TypeIcon size={20} className="text-indigo-400" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Typeface: {identity.typography.headingFont}</p>
                </div>
                <h3 className="text-8xl font-bold text-white leading-[0.8] tracking-tighter brand-serif italic">
                  Visual <br/> Dialect.
                </h3>
              </div>
              <div className="h-px bg-white/5 w-full"></div>
              <div className="space-y-8">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Body Copy: {identity.typography.bodyFont}</p>
                <p className="text-2xl text-slate-300 leading-relaxed font-light italic opacity-90">
                  "Good design is obvious. Great design is transparent." Our typographic framework balances brutalist headlines with absolute clarity in reading.
                </p>
              </div>
              <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/5">
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  {identity.typography.reasoning}
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* Final Application - Editorial Grid */}
      <section className="max-w-7xl mx-auto px-6 space-y-24 pt-20">
         <div className="flex flex-col items-center text-center space-y-8">
           <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.6em]">Section 04 / In-Situ</span>
           <h2 className="text-8xl font-black text-white brand-serif italic leading-none">Contextualized Identity.</h2>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* Business Card Style */}
            <div className="group relative aspect-[1.4/1] bg-[#121214] border border-white/5 rounded-[70px] p-20 flex flex-col justify-between overflow-hidden transition-all hover:bg-[#161618] hover:border-indigo-500/30 shadow-3xl">
               <div className="flex justify-between items-start relative z-10">
                  <div className="transition-transform duration-1000 group-hover:rotate-[360deg]">
                    {logoUrl && <img src={logoUrl} className="h-24 w-24 object-contain invert grayscale mix-blend-screen" alt="Logo" />}
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600">Confidential</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500/40">v1.2024</p>
                  </div>
               </div>
               <div className="space-y-6 relative z-10">
                  <h3 className="text-6xl font-bold text-white tracking-tighter brand-serif italic">{identity.companyName}</h3>
                  <div className="h-px w-20 bg-indigo-500"></div>
                  <div className="pt-4 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">Principal Office</p>
                      <p className="text-xs text-slate-600 font-light italic">hq@{identity.companyName.toLowerCase().replace(/\s/g, '')}.com</p>
                    </div>
                    <Share2 size={16} className="text-slate-800" />
                  </div>
               </div>
               <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-600/5 blur-[100px] rounded-full"></div>
            </div>

            {/* Digital Frame */}
            <div className="group aspect-[1.4/1] bg-white rounded-[70px] overflow-hidden flex flex-col shadow-3xl transition-all duration-1000 hover:-translate-y-4 border border-slate-100">
               <nav className="p-10 bg-slate-50/30 backdrop-blur-xl border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-6">
                     <div className="transition-all">
                       {logoUrl && <img src={logoUrl} className="h-10 w-10 object-contain mix-blend-multiply" alt="Logo Small" />}
                     </div>
                     <span className="text-[11px] font-black uppercase text-slate-900 tracking-[0.4em]">{identity.companyName}</span>
                  </div>
                  <div className="flex gap-8">
                     <div className="h-1.5 w-12 bg-slate-200 rounded-full"></div>
                     <div className="h-1.5 w-12 bg-slate-200 rounded-full"></div>
                  </div>
               </nav>
               <div className="flex-1 p-20 space-y-10 flex flex-col justify-center text-slate-900 relative">
                  <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-600">The New Standard</span>
                  <h4 className="text-7xl font-black tracking-tighter leading-[0.85] brand-serif italic">Architecture <br/> for the modern era.</h4>
                  <div className="flex gap-8 pt-6">
                    <div className="h-16 px-10 rounded-full flex items-center justify-center text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 transition-transform" style={{ backgroundColor: identity.colors[0]?.hex }}>
                      Initialize Session
                    </div>
                    <div className="h-16 w-16 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-500 group-hover:border-indigo-100 transition-all">
                      <ChevronRight size={24} />
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* Editorial Footer Decoration */}
      <section className="text-center pt-40 opacity-20 no-print pb-20">
        <p className="text-[11px] font-black uppercase tracking-[1.5em] text-slate-600">Brand Identity Synthesis Finalized</p>
      </section>
    </div>
  );
};
