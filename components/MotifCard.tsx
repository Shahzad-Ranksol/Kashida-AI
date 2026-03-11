
import React, { useState } from 'react';
import { Motif, Culture } from '../types';
import { Zap, Info, Sparkles, Database, Bookmark, Maximize2, X } from 'lucide-react';

interface MotifCardProps {
  motif: Motif;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const MotifCard: React.FC<MotifCardProps> = ({ motif, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const isPakistan = motif.culture === Culture.PAKISTAN;
  const isChina = motif.culture === Culture.CHINA;
  const isFusion = motif.culture === Culture.FUSION;
  
  const cultureColor = isPakistan ? 'text-amber-600' : (isChina ? 'text-blue-600' : 'text-purple-600');
  const accentBg = isPakistan ? 'bg-amber-600' : (isChina ? 'bg-blue-600' : 'bg-amber-950');
  
  const borderActive = isPakistan 
    ? 'border-amber-600 ring-4 ring-amber-100/50 shadow-2xl shadow-amber-900/20' 
    : (isChina ? 'border-blue-600 ring-4 ring-blue-100/50 shadow-2xl shadow-blue-900/20' : 'border-amber-900 ring-4 ring-amber-100/50 shadow-2xl shadow-amber-900/20');

  return (
    <>
      <div className={`relative transition-all duration-300 ${isHovered ? 'z-50' : 'z-10'}`}>
        <div
          onClick={() => onSelect(motif.id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group relative w-full aspect-square rounded-2xl border-2 transition-all duration-500 overflow-hidden cursor-pointer ${
            isSelected 
              ? `bg-white ${borderActive} scale-[1.02]` 
              : 'border-gray-100 bg-white hover:border-amber-200 hover:scale-[1.02] shadow-sm hover:shadow-xl'
          }`}
        >
          {/* Visual Layer: Image for custom, Typographic for default */}
          <div className="absolute inset-0 overflow-hidden bg-gray-50 flex items-center justify-center">
            {motif.previewUrl ? (
              <img 
                src={motif.previewUrl} 
                alt={motif.name}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  isHovered ? 'scale-110 -rotate-2 brightness-110' : 'scale-100 rotate-0 brightness-100'
                }`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center transition-all ${isSelected ? accentBg : 'bg-gray-100'}`}>
                    <Bookmark className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-300'}`} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isSelected ? cultureColor : 'text-gray-400'}`}>
                    {motif.culture}
                  </span>
                  <span className="font-serif text-xs font-bold text-gray-800 leading-tight">
                    {motif.name}
                  </span>
              </div>
            )}
            {/* Gradient Scrim for images */}
            {motif.previewUrl && (
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${isHovered || isSelected ? 'opacity-100' : 'opacity-40'}`} />
            )}
          </div>

          {/* Content Overlay */}
          {motif.previewUrl && (
            <div className="absolute inset-x-0 bottom-0 p-4 text-left z-20">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-black uppercase tracking-[0.15em] drop-shadow-md text-white/90 flex items-center gap-1">
                  <Database className="w-2.5 h-2.5" /> Dataset
                </span>
                <span className="font-serif text-sm font-bold text-white drop-shadow-md leading-tight truncate w-full">
                  {motif.name}
                </span>
              </div>
            </div>
          )}

          {/* Detail Panel */}
          <div 
            className={`absolute inset-0 bg-white/95 backdrop-blur-md p-5 flex flex-col transition-all duration-500 ease-in-out z-30 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest text-white ${accentBg}`}>
                {motif.isCustom ? 'User Data' : 'Heritage Block'}
              </div>
              <Info className={`w-3.5 h-3.5 ${cultureColor}`} />
            </div>
            
            <h4 className="font-serif text-sm font-bold text-gray-900 mb-2 leading-tight">
              {motif.name}
            </h4>
            
            <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-4 italic mb-4">
              "{motif.description}"
            </p>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview(true);
              }}
              className="w-full mt-auto py-3 bg-gray-50 hover:bg-amber-900 hover:text-white rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Detailed Dossier
            </button>

            <div className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Pure Semantic Synthesis
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
        </div>
      </div>

      {/* Detailed Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowPreview(false)} />
          <div className="relative w-full max-w-6xl bg-white rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 duration-500">
            {/* Left Side: Visual Dossier */}
            <div className="flex-1 bg-gray-50 relative min-h-[350px] md:min-h-[600px] border-b md:border-b-0 md:border-r border-gray-100">
              {motif.previewUrl ? (
                <img src={motif.previewUrl} className="w-full h-full object-cover" alt={motif.name} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                  <Bookmark className="w-32 h-32 text-gray-100" />
                  <span className="text-[12px] font-black uppercase tracking-[0.5em] text-gray-300">Semantic Data Point</span>
                </div>
              )}
              <div className="absolute top-10 left-10">
                <div className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-2xl shadow-black/20 ${accentBg}`}>
                  {motif.culture} Archive
                </div>
              </div>
            </div>
            
            {/* Right Side: Heritage Info */}
            <div className="w-full md:w-[450px] p-12 md:p-16 flex flex-col justify-center gap-10 bg-white">
              <button 
                onClick={() => setShowPreview(false)} 
                className="absolute top-10 right-10 p-4 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-all shadow-sm active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${accentBg}`} />
                  <span className="text-[12px] font-black uppercase tracking-[0.4em] text-amber-900/40">Heritage Master Class</span>
                </div>
                <h3 className="text-5xl font-serif font-bold text-gray-900 leading-tight tracking-tight">{motif.name}</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-amber-900" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Provenance & Geometry</span>
                </div>
                <p className="text-xl text-gray-700 leading-relaxed font-serif italic border-l-4 border-gray-50 pl-6 py-2">
                  "{motif.description}"
                </p>
              </div>
              
              <div className="pt-10 border-t border-gray-100 space-y-6">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-amber-50 rounded-[1.5rem] border border-amber-100">
                    <Sparkles className="w-6 h-6 text-amber-900" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-amber-950 mb-1">AI Synthesis Logic</h5>
                    <p className="text-[11px] font-medium text-gray-400 leading-snug">
                      This block is mathematically encoded for high-fidelity pattern synthesis in the {motif.culture} studio.
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    onSelect(motif.id);
                    setShowPreview(false);
                  }}
                  className={`w-full py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all shadow-xl active:scale-[0.98] ${
                    isSelected 
                      ? 'bg-amber-950 text-white' 
                      : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-amber-900 hover:text-amber-900'
                  }`}
                >
                  {isSelected ? 'Active in Studio' : 'Integrate into Studio'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MotifCard;
