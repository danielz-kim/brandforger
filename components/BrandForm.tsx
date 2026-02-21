
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
    <form onSubmit={handleSubmit} className="bg-[#121214] p-10 rounded-3xl shadow-2xl space-y-8 border border-white/5 relative">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Project Name</label>
            <input
              type="text"
              name="name"
              required
              value={inputs.name}
              onChange={handleChange}
              placeholder="e.g. Acme SaaS"
              className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:border-indigo-500/50 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sector</label>
            <input
              type="text"
              name="sector"
              required
              value={inputs.sector}
              onChange={handleChange}
              placeholder="e.g. Fintech"
              className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:border-indigo-500/50 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">What are you building?</label>
          <textarea
            name="description"
            required
            rows={2}
            value={inputs.description}
            onChange={handleChange}
            placeholder="A brief summary of your mission..."
            className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:border-indigo-500/50 outline-none transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Vibe/Style</label>
            <input
              type="text"
              name="style"
              value={inputs.style}
              onChange={handleChange}
              placeholder="e.g. Cyberpunk, Minimal"
              className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:border-indigo-500/50 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Audience</label>
            <input
              type="text"
              name="audience"
              value={inputs.audience}
              onChange={handleChange}
              placeholder="e.g. Developers"
              className="w-full px-5 py-4 rounded-xl bg-[#1a1a1e] border border-white/5 text-white focus:border-indigo-500/50 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50"
      >
        {isLoading ? 'Generating 3 Variations...' : 'Draft My Brand'}
      </button>
    </form>
  );
};
