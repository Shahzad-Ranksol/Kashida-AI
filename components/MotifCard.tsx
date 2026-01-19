
import React, { useState } from 'react';
import { Motif, Culture } from '../types';
import { ZoomIn, Zap, Eye, Info, Sparkles, Database } from 'lucide-react';

interface MotifCardProps {
  motif: Motif;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const MotifCard: React.FC<MotifCardProps> = ({ motif, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define accent colors based on culture
  const isPakistan = motif.culture === Culture.PAKISTAN;
  const isChina = motif.culture === Culture.CHINA;
  
  const cultureColor = isPakistan ? 'text-amber-600' : (isChina ? 'text-blue-600' : 'text-amber-900');
  const accentBg = isPakistan ? 'bg-amber-600' : (isChina ? 'bg-blue-600' : 'bg-amber-950');
  
  const borderActive = isPakistan 
    ? 'border-amber-600 ring-4 ring-amber-100/50 shadow-2xl shadow-amber-900/20' 
    : (isChina ? 'border-blue-600 ring-4 ring-blue-100/50 shadow-2xl shadow-blue-900/20' : 'border-amber-900 ring-4 ring-amber-100/50 shadow-2xl shadow-amber-900/20');

  return (
    <div className={`relative transition-all duration-300 ${isHovered ? 'z-50' : 'z-10'}`}>
      <button
        onClick={() => onSelect(motif.id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative w-full aspect-square rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
          isSelected 
            ? `bg-white ${borderActive} scale-[1.02]` 
            : 'border-gray-100 bg-white hover:border-amber-200 hover:scale-[1.02] shadow-sm hover:shadow-xl'
        }`}
      >
        {/* Detail Zoom Image Layer */}
        <div className="absolute inset-0 overflow-hidden bg-gray-100">
           <img 
            src={motif.previewUrl} 
            alt={motif.name}
            className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${
              isHovered ? 'scale-150 rotate-2' : 'scale-100'
            }`}
           />
           {/* Gradient Scrim */}
           <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isHovered || isSelected ? 'opacity-100' : 'opacity-40'}`} />
        </div>

        {/* Content Overlay (Static) */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-left z-20">
          <div className="flex flex-col gap-0.5">
            <span className={`text-[10px] font-black uppercase tracking-[0.15em] drop-shadow-md text-white/90 flex items-center gap-1`}>
              {motif.isCustom && <Database className="w-2.5 h-2.5" />}
              {motif.isCustom ? 'Dataset' : motif.culture}
            </span>
            <span className="font-serif text-sm font-bold text-white drop-shadow-md leading-tight truncate w-full">
              {motif.name}
            </span>
          </div>
        </div>

        {/* Detail Reveal Panel (Hover/Selected Only) */}
        <div 
          className={`absolute inset-0 bg-white/95 backdrop-blur-md p-5 flex flex-col transition-all duration-500 ease-in-out z-30 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
             <div className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest text-white ${accentBg}`}>
               {motif.isCustom ? 'Artisan Data' : 'Details'}
             </div>
             <Info className={`w-3.5 h-3.5 ${cultureColor}`} />
          </div>
          
          <h4 className="font-serif text-sm font-bold text-gray-900 mb-2 leading-tight">
            {motif.name}
          </h4>
          
          <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-6 italic mb-4">
            "{motif.description}"
          </p>

          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> {motif.isCustom ? 'Knowledge Basis' : 'High Fidelity'}
            </span>
            {isSelected && (
               <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[9px] font-black text-green-600 uppercase">Active</span>
               </div>
            )}
          </div>
        </div>

        {/* Selected Badge */}
        {isSelected && !isHovered && (
          <div className={`absolute top-3 right-3 w-6 h-6 rounded-full shadow-lg flex items-center justify-center z-40 animate-in fade-in zoom-in duration-300 ${accentBg}`}>
            <Zap className="w-3 h-3 text-white fill-white" />
          </div>
        )}

        {/* Hover Cue */}
        {!isSelected && !isHovered && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm p-1.5 rounded-full z-40">
            <Eye className="w-3 h-3 text-white" />
          </div>
        )}
      </button>
    </div>
  );
};

export default MotifCard;
