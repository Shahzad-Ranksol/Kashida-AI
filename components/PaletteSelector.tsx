
import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, ChevronDown, Plus, X, Trash2, Save, User } from 'lucide-react';
import { ColorPalette } from '../types';
import { PALETTES } from '../constants';

interface PaletteSelectorProps {
  palettes: ColorPalette[];
  selectedPaletteName: string;
  onSelect: (name: string) => void;
  onAddPalette: (palette: ColorPalette) => void;
  onDeletePalette: (name: string) => void;
}

const PaletteSelector: React.FC<PaletteSelectorProps> = ({ 
  palettes, 
  selectedPaletteName, 
  onSelect,
  onAddPalette,
  onDeletePalette
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedPalette = palettes.find(p => p.name === selectedPaletteName) || palettes[0];

  // Creator state
  const [newName, setNewName] = useState('');
  const [newColors, setNewColors] = useState(['#000000', '#FFFFFF', '#FF0000']);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCreating(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSavePalette = () => {
    if (!newName.trim()) {
      alert("Please name your palette.");
      return;
    }
    if (palettes.some(p => p.name === newName)) {
      alert("A palette with this name already exists.");
      return;
    }
    const newPalette: ColorPalette = { name: newName, colors: newColors };
    onAddPalette(newPalette);
    onSelect(newName);
    setIsCreating(false);
    setNewName('');
    setNewColors(['#000000', '#FFFFFF', '#FF0000']);
  };

  const updateColor = (index: number, val: string) => {
    const next = [...newColors];
    next[index] = val;
    setNewColors(next);
  };

  const addColorSlot = () => {
    if (newColors.length >= 6) return;
    setNewColors([...newColors, '#CCCCCC']);
  };

  const removeColorSlot = (index: number) => {
    if (newColors.length <= 2) return;
    setNewColors(newColors.filter((_, i) => i !== index));
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 flex items-center justify-between hover:bg-gray-100 transition-all focus:ring-4 focus:ring-amber-50 focus:border-amber-900 outline-none group"
      >
        <div className="flex flex-col items-start gap-1 text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-900/60 leading-none">Artisan Palette</span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-900 truncate max-w-[120px]">{selectedPalette.name}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1.5">
            {selectedPalette.colors.map((color, i) => (
              <div 
                key={i} 
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm" 
                style={{ backgroundColor: color }} 
              />
            ))}
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-black/[0.05] overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl bg-white/95">
          
          {!isCreating ? (
            <>
              <div className="max-h-[320px] overflow-y-auto custom-scrollbar p-2">
                {palettes.map((palette) => {
                  const isSelected = palette.name === selectedPaletteName;
                  const isCustom = !PALETTES.some(p => p.name === palette.name);
                  return (
                    <div key={palette.name} className="relative group/item mb-1">
                      <button
                        onClick={() => {
                          onSelect(palette.name);
                          setIsOpen(false);
                        }}
                        className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                          isSelected ? 'bg-amber-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col items-start gap-2">
                          <div className="flex items-center gap-2">
                            {isCustom && <User className="w-3 h-3 text-amber-600" />}
                            <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                              isSelected ? 'text-amber-900' : 'text-gray-700'
                            }`}>
                              {palette.name}
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            {palette.colors.map((color, i) => (
                              <div 
                                key={i} 
                                className="w-4 h-4 rounded-full border border-black/5" 
                                style={{ backgroundColor: color }} 
                              />
                            ))}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="bg-amber-900 p-1 rounded-full shadow-lg shadow-amber-900/20">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                      
                      {isCustom && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePalette(palette.name);
                          }}
                          className="absolute right-12 top-1/2 -translate-y-1/2 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover/item:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={() => setIsCreating(true)}
                className="w-full p-5 flex items-center justify-center gap-3 bg-gray-50 hover:bg-amber-900 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] border-t border-black/5"
              >
                <Plus className="w-4 h-4" /> Create Custom Palette
              </button>
            </>
          ) : (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-900">Custom Lab</h4>
                <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">Palette Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Indigo Dream"
                    className="w-full bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs font-bold outline-none focus:border-amber-900 transition-colors"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[8px] font-black uppercase tracking-widest text-gray-400">Colors (Min 2, Max 6)</label>
                    <button onClick={addColorSlot} className="text-[9px] font-black uppercase text-amber-600 hover:text-amber-800 disabled:opacity-30" disabled={newColors.length >= 6}>
                      + Add
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {newColors.map((color, i) => (
                      <div key={i} className="relative group">
                        <input 
                          type="color" 
                          value={color}
                          onChange={(e) => updateColor(i, e.target.value)}
                          className="w-full aspect-square rounded-lg cursor-pointer border-none p-0 overflow-hidden shadow-sm"
                        />
                        {newColors.length > 2 && (
                          <button 
                            onClick={() => removeColorSlot(i)}
                            className="absolute -top-1 -right-1 bg-white rounded-full shadow-md p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-2.5 h-2.5 text-red-500" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSavePalette}
                className="w-full py-4 bg-amber-950 text-white rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-amber-900/10 hover:bg-black transition-all"
              >
                <Save className="w-4 h-4" /> Save Master Palette
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaletteSelector;
