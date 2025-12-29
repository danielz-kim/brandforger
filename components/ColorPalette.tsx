
import React from 'react';
import { ColorSwatch } from '../types';

export const ColorPalette: React.FC<{ colors: ColorSwatch[] }> = ({ colors }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {colors.map((color, idx) => (
        <div key={idx} className="group relative">
          <div 
            className="h-24 w-full rounded-xl shadow-inner border border-slate-700 transition-transform hover:scale-105"
            style={{ backgroundColor: color.hex }}
          />
          <div className="mt-3">
            <p className="text-xs font-bold text-slate-100 uppercase tracking-wider">{color.hex}</p>
            <p className="text-sm font-medium text-slate-400">{color.name}</p>
            <p className="text-[10px] text-slate-500 mt-1 leading-tight">{color.usage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
