
import React from 'react';
import { BrandFormInputs } from '../types';

interface BrandFormProps {
  onSubmit: (inputs: BrandFormInputs) => void;
  isLoading: boolean;
}

export const BrandForm: React.FC<BrandFormProps> = ({ onSubmit, isLoading }) => {
  const [inputs, setInputs] = React.useState<BrandFormInputs>({
    name: '',
    sector: '',
    description: '',
    style: '',
    audience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#121214] p-10 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] space-y-8 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Name</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="e.g. Luminara"
            className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-slate-700 font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Sector</label>
          <input
            type="text"
            name="sector"
            required
            value={inputs.sector}
            onChange={handleChange}
            placeholder="e.g. Aerospace"
            className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-slate-700 font-medium"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Description</label>
        <textarea
          name="description"
          required
          rows={3}
          value={inputs.description}
          onChange={handleChange}
          placeholder="What do you do?"
          className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:ring-1 focus:ring-white/20 transition-all outline-none resize-none placeholder:text-slate-700 font-medium leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Style</label>
          <input
            type="text"
            name="style"
            required
            value={inputs.style}
            onChange={handleChange}
            placeholder="e.g. Minimal, Bold"
            className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-slate-700 font-medium"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">Audience</label>
          <input
            type="text"
            name="audience"
            required
            value={inputs.audience}
            onChange={handleChange}
            placeholder="e.g. Young creatives"
            className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:ring-1 focus:ring-white/20 transition-all outline-none placeholder:text-slate-700 font-medium"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`group w-full py-5 px-6 rounded-2xl font-bold transition-all ${
          isLoading ? 'bg-slate-800 cursor-not-allowed text-slate-500' : 'bg-white text-black hover:bg-indigo-50 hover:scale-[1.01] active:scale-[0.99]'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-indigo-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Identity...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2 uppercase tracking-[0.15em] text-xs">
            Initiate Brand Forging
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        )}
      </button>
    </form>
  );
};
