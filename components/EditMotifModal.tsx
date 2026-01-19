
import React, { useState } from 'react';
import { X, Save, Edit2, FileText } from 'lucide-react';
import { Motif } from '../types';

interface EditMotifModalProps {
  motif: Motif;
  onClose: () => void;
  onSave: (id: string, name: string, description: string) => void;
}

const EditMotifModal: React.FC<EditMotifModalProps> = ({ motif, onClose, onSave }) => {
  const [name, setName] = useState(motif.name);
  const [description, setDescription] = useState(motif.description);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(motif.id, name, description);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-amber-950/20 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        <div className="relative h-48 bg-gray-100">
           <img src={motif.previewUrl} alt={motif.name} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
           <button 
             onClick={onClose}
             className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors shadow-lg"
           >
             <X className="w-4 h-4 text-gray-500" />
           </button>
        </div>

        <div className="p-10 space-y-8">
            <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-900 mb-1 block">Artisan Label</span>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Modify Design Metadata</h3>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
                        <Edit2 className="w-3 h-3" /> Motif Name
                    </label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter motif name..."
                      className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm font-bold outline-none focus:border-amber-900 transition-colors"
                      autoFocus
                    />
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400">
                        <FileText className="w-3 h-3" /> Artisan Description
                    </label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the cultural origin or visual style..."
                      className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm font-medium outline-none focus:border-amber-900 transition-colors h-32 resize-none"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
                >
                  Discard Changes
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="flex-[2] py-4 bg-amber-950 text-white rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-amber-950/20 hover:bg-black transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> Finalize Meta
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditMotifModal;
