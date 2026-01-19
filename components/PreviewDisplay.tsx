
import React, { useState, useMemo } from 'react';
import { Download, Maximize, Layers, Repeat, BookOpen, ShieldCheck, Ruler, Palette, FileJson, ZoomIn } from 'lucide-react';
import { GeneratedPattern } from '../types';

interface PreviewDisplayProps {
  pattern: GeneratedPattern | null;
  isGenerating: boolean;
}

const PreviewDisplay: React.FC<PreviewDisplayProps> = ({ pattern, isGenerating }) => {
  const [isPreviewTiled, setIsPreviewTiled] = useState(false);
  const [zoom, setZoom] = useState(33.33);

  const tileStyle = useMemo(() => {
    if (!pattern || !isPreviewTiled) return {};

    const baseSize = `${zoom}%`;
    const url = `url(${pattern.imageUrl})`;

    if (pattern.prompt.toLowerCase().includes('half-drop')) {
       return {
         backgroundImage: `${url}, ${url}`,
         backgroundSize: `${baseSize} ${baseSize}`,
         backgroundRepeat: 'repeat',
         backgroundPosition: `0 0, calc(${baseSize} * 0.5) calc(${baseSize} * 0.5)`
       };
    }

    if (pattern.prompt.toLowerCase().includes('brick')) {
       return {
         backgroundImage: `${url}, ${url}`,
         backgroundSize: `${baseSize} ${baseSize}`,
         backgroundRepeat: 'repeat',
         backgroundPosition: `0 0, calc(${baseSize} * 0.5) calc(${baseSize} * 0.5)`
       };
    }

    return {
      backgroundImage: url,
      backgroundSize: `${baseSize} ${baseSize}`,
      backgroundRepeat: 'repeat'
    };
  }, [pattern, isPreviewTiled, zoom]);

  if (isGenerating) {
    return (
      <div className="w-full aspect-square bg-[#fdfdfb] rounded-[3rem] flex flex-col items-center justify-center border-2 border-dashed border-amber-200 overflow-hidden relative shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/40 via-transparent to-amber-50/20 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-8">
                <div className="w-20 h-20 border-[3px] border-amber-100 border-t-amber-900 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="w-7 h-7 text-amber-900 animate-bounce" />
                </div>
            </div>
            <p className="text-amber-950 font-serif text-2xl font-bold italic">Synthesizing Textile DNA</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
              <p className="text-[10px] text-amber-900/60 font-black uppercase tracking-[0.4em]">Aligning Heritage Tensors</p>
            </div>
        </div>
      </div>
    );
  }

  if (!pattern) {
    return (
      <div className="w-full aspect-square bg-white rounded-[3rem] flex flex-col items-center justify-center border border-gray-100 p-12 text-center group shadow-sm">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-inner group-hover:bg-amber-50 transition-colors duration-700">
          <Layers className="text-gray-200 w-10 h-10 group-hover:text-amber-200 transition-colors duration-700" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-gray-800">The Loom is Ready</h3>
        <p className="text-sm text-gray-400 mt-4 max-w-xs leading-relaxed font-medium">
          Choose your heritage library and artisan studio parameters to begin the synthesis process.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-12 duration-1000">
      <div className="relative group">
        <div 
          className={`w-full aspect-square rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(26,24,20,0.15)] transition-all duration-700 bg-white ring-1 ring-black/5`}
          style={tileStyle}
        >
          {!isPreviewTiled && (
            <img 
              src={pattern.imageUrl} 
              alt="Generated textile pattern" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
            />
          )}
        </div>

        {/* Action Controls */}
        <div className="absolute top-10 right-10 flex flex-col gap-4">
           <button 
            onClick={() => setIsPreviewTiled(!isPreviewTiled)}
            className={`p-5 rounded-[1.5rem] shadow-2xl transition-all active:scale-95 flex items-center justify-center ${
                isPreviewTiled 
                ? 'bg-amber-950 text-white' 
                : 'bg-white/95 backdrop-blur text-amber-950 hover:bg-white'
            }`}
          >
            <Repeat className={`w-6 h-6 ${isPreviewTiled ? 'animate-spin-slow' : ''}`} />
          </button>
          {isPreviewTiled && (
            <div className="p-4 bg-white/95 backdrop-blur rounded-[1.5rem] shadow-2xl flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
               <ZoomIn className="w-4 h-4 text-amber-900/40" />
               <input 
                type="range" 
                min="10" 
                max="100" 
                value={zoom} 
                onChange={(e) => setZoom(Number(e.target.value))}
                className="h-24 w-1 bg-gray-100 appearance-none rounded-full cursor-pointer accent-amber-900"
                style={{ writingMode: 'vertical-lr' as any }}
               />
            </div>
          )}
          <a 
            href={pattern.imageUrl} 
            download={`kashida-artisan-${Date.now()}.png`}
            className="p-5 bg-white/95 backdrop-blur rounded-[1.5rem] shadow-2xl hover:bg-white text-amber-950 transition-all active:scale-95"
          >
            <Download className="w-6 h-6" />
          </a>
        </div>

        {/* Floating Design Label */}
        <div className="absolute bottom-10 left-10 right-10">
            <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-2xl border border-white/50">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-[10px] font-black text-amber-900 uppercase tracking-[0.3em]">Artisan Verification</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{new Date().toLocaleDateString()}</span>
                </div>
                <h4 className="font-serif text-2xl font-bold text-gray-900 truncate tracking-tight">{pattern.motif}</h4>
            </div>
        </div>
      </div>

      {/* Production Specs & Reasoning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-black/[0.02] flex flex-col gap-6">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-50">
            <div className="bg-amber-950/5 p-3 rounded-2xl">
                <BookOpen className="w-5 h-5 text-amber-950" />
            </div>
            <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-950">Cultural Synthesis</h5>
                <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Heritage Logic Engine</p>
            </div>
          </div>
          <p className="text-[14px] text-gray-600 leading-relaxed font-medium italic text-pretty">
            "{pattern.reasoning}"
          </p>
        </div>

        <div className="bg-zinc-900 p-10 rounded-[3rem] shadow-xl text-white flex flex-col gap-6">
          <div className="flex items-center gap-4 pb-4 border-b border-zinc-800">
            <div className="bg-white/10 p-3 rounded-2xl">
                <Ruler className="w-5 h-5 text-amber-400" />
            </div>
            <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">Technical Specs</h5>
                <p className="text-[9px] text-zinc-500 font-bold uppercase mt-1">Production Readiness</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block mb-1">DPI Target</span>
               <span className="text-sm font-bold text-white">300 Optimized</span>
             </div>
             <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Color Mode</span>
               <span className="text-sm font-bold text-white">CMYK / Pantone</span>
             </div>
             <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Repeat Type</span>
               <span className="text-sm font-bold text-white truncate">{pattern.prompt.split('Repeat: ')[1] || 'Seamless'}</span>
             </div>
             <div className="bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/50">
               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest block mb-1">File Format</span>
               <span className="text-sm font-bold text-white">Lossless PNG</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDisplay;
