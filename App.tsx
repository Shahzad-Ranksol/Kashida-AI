
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Palette, 
  RefreshCcw,
  Languages,
  Scissors,
  Grid3X3,
  Dna,
  History,
  FolderPlus,
  Cpu,
  BrainCircuit,
  Settings2,
  Lock,
  Terminal,
  Activity,
  CheckCircle2,
  HardDrive,
  X,
  ChevronRight,
  ShieldCheck,
  Image as ImageIcon,
  UploadCloud,
  Layers,
  Fingerprint,
  Key,
  Maximize2,
  Shapes,
  EyeOff,
  Dices,
  RotateCcw,
  Brush,
  Wind,
  Spline,
  BoxSelect,
  CloudSun
} from 'lucide-react';
import { Culture, Motif, GeneratedPattern, GenerationConfig, ColorPalette, ArtisanProfile } from './types';
import { MOTIFS, PALETTES, ART_STYLES } from './constants';
import { generateTextilePattern, trainArtisanModel } from './services/gemini';
import MotifCard from './components/MotifCard';
import PreviewDisplay from './components/PreviewDisplay';
import PaletteSelector from './components/PaletteSelector';
import EditMotifModal from './components/EditMotifModal';

const STORAGE_KEY = 'kashida_artisan_database_v2';
const PROFILE_STORAGE_KEY = 'kashida_artisan_profile_v2';

const COMMON_NEGATIVES = [
  "No Gradients", "No 3D", "No Shadows", "No Blurriness", "No Realism", "No Modernism", "No People", "No Text", "No Folds"
];

function App() {
  const [loading, setLoading] = useState(false);
  const [training, setTraining] = useState(false);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [trainingAccuracy, setTrainingAccuracy] = useState(0);
  const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  const [culture, setCulture] = useState<Culture>(Culture.FUSION);
  const [selectedMotifIds, setSelectedMotifIds] = useState<string[]>(['fusion_design_1']);
  const [customPalettes, setCustomPalettes] = useState<ColorPalette[]>([]);
  const [selectedPalette, setSelectedPalette] = useState(PALETTES[0].name);
  const [complexity, setComplexity] = useState<'Minimal' | 'Balanced' | 'Maximal'>('Balanced');
  const [repeatType, setRepeatType] = useState<'Grid' | 'Half-Drop' | 'Brick'>('Grid');
  const [selectedArtStyleId, setSelectedArtStyleId] = useState<string>(ART_STYLES[0].id);
  
  // Advanced State
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<GenerationConfig['aspectRatio']>("1:1");
  const [imageSize, setImageSize] = useState<GenerationConfig['imageSize']>("2K");
  const [seed, setSeed] = useState<number | undefined>(undefined);
  const [negativePrompt, setNegativePrompt] = useState("");

  const [customMotifs, setCustomMotifs] = useState<Motif[]>([]);
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sourceImageInputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const [currentPattern, setCurrentPattern] = useState<GeneratedPattern | null>(null);
  const [history, setHistory] = useState<GeneratedPattern[]>([]);

  useEffect(() => {
    const checkKey = async () => {
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const selected = await aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [trainingLogs]);

  useEffect(() => {
    const savedMotifs = localStorage.getItem(STORAGE_KEY);
    if (savedMotifs) {
      try {
        const parsed = JSON.parse(savedMotifs);
        if (Array.isArray(parsed)) setCustomMotifs(parsed);
      } catch (e) { console.error("DB Load Error", e); }
    }
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setArtisanProfile(parsed);
      } catch (e) { console.error("Profile Load Error", e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customMotifs));
  }, [customMotifs]);

  useEffect(() => {
    if (artisanProfile) localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(artisanProfile));
  }, [artisanProfile]);

  const allPalettes = useMemo(() => [...PALETTES, ...customPalettes], [customPalettes]);

  const filteredMotifs = useMemo(() => {
    if (culture === Culture.FUSION) return [...customMotifs, ...MOTIFS];
    return [...customMotifs.filter(m => m.culture === culture), ...MOTIFS.filter(m => m.culture === culture)];
  }, [culture, customMotifs]);

  const toggleMotifSelection = (id: string) => {
    setSelectedMotifIds(prev => {
      if (prev.includes(id)) return prev.filter(p => p !== id);
      if (prev.length >= 4) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file: any) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        const newMotif: Motif = {
          id: `usr_${Math.random().toString(36).substr(2, 9)}`,
          name: file.name.split('.')[0],
          description: `Custom artisan sample.`,
          culture: culture === Culture.FUSION ? Culture.PAKISTAN : culture,
          previewUrl: base64,
          imageData: base64,
          isCustom: true
        };
        setCustomMotifs(prev => [newMotif, ...prev]);
        setSelectedMotifIds(prev => prev.length < 4 ? [...prev, newMotif.id] : [...prev.slice(1), newMotif.id]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSourceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => setSourceImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleStartTraining = async () => {
    const motifsToTrain = customMotifs.length > 0 ? customMotifs : filteredMotifs.slice(0, 4);
    setTraining(true);
    setTrainingLogs([]);
    try {
      const profile = await trainArtisanModel(
        motifsToTrain,
        (log) => setTrainingLogs(prev => [...prev, log]),
        (acc) => setTrainingAccuracy(acc)
      );
      setArtisanProfile(profile);
    } catch (err) {
      alert("Training Pipeline Disrupted.");
    } finally {
      setTimeout(() => setTraining(false), 1500);
    }
  };

  const handleOpenKeyDialog = async () => {
    const aistudio = (window as any).aistudio;
    if (aistudio) {
      await aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const randomizeSeed = () => setSeed(Math.floor(Math.random() * 1000000));

  const toggleNegativeTag = (tag: string) => {
    setNegativePrompt(prev => {
      const tags = prev.split(',').map(t => t.trim()).filter(Boolean);
      if (tags.includes(tag)) {
        return tags.filter(t => t !== tag).join(', ');
      }
      return [...tags, tag].join(', ');
    });
  };

  const handleRestoreFromArchive = (pattern: GeneratedPattern) => {
    if (!pattern.config) {
      setCurrentPattern(pattern);
      return;
    }
    const { config } = pattern;
    setCulture(config.culture);
    setSelectedMotifIds(config.motifIds);
    setSelectedPalette(config.colorPalette);
    setComplexity(config.complexity);
    setRepeatType(config.repeatType);
    setSelectedArtStyleId(config.artStyleId || ART_STYLES[0].id);
    setSourceImage(config.sourceImage || null);
    if (config.aspectRatio) setAspectRatio(config.aspectRatio);
    if (config.imageSize) setImageSize(config.imageSize);
    if (config.seed !== undefined) setSeed(config.seed);
    if (config.negativePrompt) setNegativePrompt(config.negativePrompt);
    else setNegativePrompt("");
    
    if (config.aspectRatio || config.seed || config.negativePrompt) {
      setShowAdvanced(true);
    }
    
    setCurrentPattern(pattern);
  };

  const handleGenerate = async () => {
    if (selectedMotifIds.length === 0) return;
    if (!hasApiKey) {
      await handleOpenKeyDialog();
    }
    setLoading(true);
    try {
      const config: GenerationConfig = {
        culture,
        motifIds: selectedMotifIds,
        colorPalette: selectedPalette,
        complexity,
        repeatType,
        artStyleId: selectedArtStyleId,
        customMotifs,
        artisanProfile: artisanProfile || undefined,
        sourceImage: sourceImage || undefined,
        aspectRatio,
        imageSize,
        seed,
        negativePrompt: negativePrompt || undefined
      };
      const result = await generateTextilePattern(config);
      const motifNames = selectedMotifIds.map(id => [...MOTIFS, ...customMotifs].find(m => m.id === id)?.name || 'Design Block').join(' & ');
      const newPattern: GeneratedPattern = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: result.imageUrl,
        prompt: `Artisan ${culture} synthesis. Style: ${ART_STYLES.find(s => s.id === selectedArtStyleId)?.name}. Complexity: ${complexity}. Repeat: ${repeatType}${sourceImage ? ' (Ref Guided)' : ''}${aspectRatio !== '1:1' ? ` Ratio: ${aspectRatio}` : ''}`,
        reasoning: result.reasoning,
        culture,
        motif: motifNames,
        timestamp: Date.now(),
        config: { ...config }
      };
      setCurrentPattern(newPattern);
      setHistory(prev => [newPattern, ...prev]);
    } catch (error: any) {
      if (error?.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("API Key configuration error. Please authorize again.");
      } else {
        alert('Synthesis failed. Ensure Pro-model authorization is active.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] text-[#1a1a1a] selection:bg-amber-100 selection:text-amber-950">
      {/* Training Modal */}
      {training && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" />
          <div className="relative bg-[#050505] border border-zinc-800 rounded-[3rem] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[85vh] animate-in zoom-in duration-500">
            <div className="p-12 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                  <Cpu className="text-amber-500 w-10 h-10 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white text-3xl font-bold font-serif">Artisan Fine-tuning</h3>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                    <Activity className="w-3 h-3 text-amber-500" /> Computing Stylistic Vectors
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-amber-500 text-5xl font-black tracking-tighter">{trainingAccuracy.toFixed(1)}%</div>
                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] mt-2">Accuracy Convergence</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-12 space-y-4 font-mono text-[12px] custom-scrollbar bg-black/20">
              {trainingLogs.map((log, i) => (
                <div key={i} className="flex gap-6 text-zinc-500">
                  <span className="opacity-20 shrink-0">{(i+1).toString().padStart(3, '0')}</span>
                  <span className="whitespace-pre-wrap">{log}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="border-b border-black/5 px-10 py-6 flex justify-between items-center bg-white/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-amber-950 p-3 rounded-2xl shadow-xl shadow-amber-950/30">
            <Scissors className="text-white w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-3xl font-bold tracking-tight text-amber-950 block leading-none">Kashida AI</span>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-900/40 mt-1 block">Artisan Design Studio</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           {!hasApiKey && (
             <button 
               onClick={handleOpenKeyDialog}
               className="flex items-center gap-2.5 px-6 py-3 bg-amber-50 text-amber-900 rounded-full border border-amber-200 text-[10px] font-black uppercase tracking-widest hover:bg-amber-100 transition-all shadow-sm group"
             >
               <Key className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
               Authorize Pro Studio
             </button>
           )}
           {artisanProfile && (
             <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-emerald-50 rounded-full border border-emerald-100 ring-1 ring-emerald-500/10 group relative transition-all hover:bg-emerald-100">
               <BrainCircuit className="w-4 h-4 text-emerald-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900">Artisan DNA Optimized</span>
               <button onClick={() => setArtisanProfile(null)} className="absolute -right-2 -top-2 bg-rose-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                 <X className="w-2.5 h-2.5" />
               </button>
             </div>
           )}
           <button onClick={handleStartTraining} className="hidden md:flex items-center gap-3 bg-amber-950 hover:bg-black text-white px-8 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-2xl shadow-amber-950/20 active:scale-95 group">
             <Terminal className="w-4 h-4 group-hover:text-amber-400" /> Fine-tune Model
           </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto p-12 lg:p-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          <div className="lg:col-span-7 space-y-20">
            <header className="space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5 px-5 py-2 bg-amber-950 text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-lg">
                  <HardDrive className="w-3 h-3" /> Compute Cluster Active
                </div>
                <div className="flex items-center gap-2.5 px-5 py-2 bg-amber-50 rounded-full text-[10px] font-black text-amber-900 uppercase tracking-widest border border-amber-100">
                   {selectedMotifIds.length} / 4 Blocks Integrated
                </div>
              </div>
              <h2 className="text-6xl md:text-8xl font-serif font-bold leading-[1] tracking-tight text-amber-950">
                Studio <span className="text-amber-900/40 italic font-normal">Synthesis</span>
              </h2>
            </header>

            <section className="bg-white p-12 md:p-20 rounded-[4.5rem] shadow-2xl shadow-black/[0.03] border border-black/[0.02] space-y-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] pointer-events-none" />

              {/* Studio Mode */}
              <div className="space-y-10">
                <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                  <Languages className="w-4 h-4" /> 01 / Studio Mode
                </label>
                <div className="grid grid-cols-3 gap-6">
                  {Object.values(Culture).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCulture(c)}
                      className={`py-8 rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.25em] transition-all border-2 ${
                        culture === c 
                        ? 'bg-amber-950 border-amber-950 text-white shadow-2xl -translate-y-1.5' 
                        : 'bg-[#fcfcfb] border-transparent text-gray-400 hover:border-amber-200 hover:text-amber-900'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motif Library */}
              <div className="space-y-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                  <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                    <Dna className="w-4 h-4" /> 02 / Motif Library
                  </label>
                  <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:bg-amber-50 hover:text-amber-950 transition-all">
                    <FolderPlus className="w-4 h-4" /> Add Assets
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {filteredMotifs.map(motif => (
                    <MotifCard 
                      key={motif.id}
                      motif={motif}
                      isSelected={selectedMotifIds.includes(motif.id)}
                      onSelect={toggleMotifSelection}
                    />
                  ))}
                </div>
              </div>

              {/* Visual Config */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-10">
                 <div className="space-y-8">
                    <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                      <Palette className="w-4 h-4" /> 03 / Master Palette
                    </label>
                    <PaletteSelector 
                      palettes={allPalettes} 
                      selectedPaletteName={selectedPalette} 
                      onSelect={setSelectedPalette} 
                      onAddPalette={(p) => setCustomPalettes(prev => [...prev, p])}
                      onDeletePalette={(name) => setCustomPalettes(prev => prev.filter(p => p.name !== name))}
                    />
                 </div>
                 <div className="space-y-8">
                    <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                      <Grid3X3 className="w-4 h-4" /> 04 / Repeat Logic
                    </label>
                    <div className="flex gap-4 p-2 bg-[#fcfcfb] rounded-[2.5rem] border border-gray-100">
                      {(['Grid', 'Half-Drop', 'Brick'] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => setRepeatType(type)}
                          className={`flex-1 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                            repeatType === type ? 'bg-white text-amber-950 shadow-xl border border-black/5' : 'text-gray-400 hover:text-amber-800'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                 </div>
              </div>

              {/* AI Art Styles Section */}
              <div className="space-y-10 pt-10 border-t border-black/[0.03]">
                <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                  <Brush className="w-4 h-4" /> 05 / Art Aesthetic Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {ART_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedArtStyleId(style.id)}
                      className={`group relative p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center gap-3 ${
                        selectedArtStyleId === style.id
                          ? 'bg-amber-50 border-amber-950 shadow-lg scale-[1.02]'
                          : 'bg-[#fcfcfb] border-transparent hover:border-amber-200'
                      }`}
                    >
                      <div className={`p-3 rounded-2xl transition-colors ${
                        selectedArtStyleId === style.id ? 'bg-amber-950 text-white' : 'bg-white text-gray-400 group-hover:text-amber-900 shadow-sm'
                      }`}>
                        {style.id === 'classic_silk' && <Layers className="w-5 h-5" />}
                        {style.id === 'watercolor' && <Wind className="w-5 h-5" />}
                        {style.id === 'engraving' && <Scissors className="w-5 h-5" />}
                        {style.id === 'mosaic' && <BoxSelect className="w-5 h-5" />}
                        {style.id === 'expressionism' && <Spline className="w-5 h-5" />}
                        {style.id === 'ink_wash' && <CloudSun className="w-5 h-5" />}
                      </div>
                      <div className="space-y-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          selectedArtStyleId === style.id ? 'text-amber-950' : 'text-gray-400 group-hover:text-gray-900'
                        }`}>
                          {style.name}
                        </span>
                        <p className="text-[8px] text-gray-400 font-medium leading-tight line-clamp-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {style.description}
                        </p>
                      </div>
                      {selectedArtStyleId === style.id && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-950" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Controls Toggle */}
              <div className="pt-10 border-t border-black/[0.03]">
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-amber-900/60 hover:text-amber-900 transition-colors group"
                >
                  <Settings2 className={`w-4 h-4 transition-transform duration-500 ${showAdvanced ? 'rotate-90' : ''}`} />
                  {showAdvanced ? 'Hide Technical Parameters' : 'Show Advanced Synthesis Suite'}
                </button>
                
                {showAdvanced && (
                  <div className="mt-12 space-y-16 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                      <div className="space-y-8">
                        <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                          <Maximize2 className="w-4 h-4" /> Image Resolution
                        </label>
                        <div className="flex gap-4 p-2 bg-[#fcfcfb] rounded-[2.5rem] border border-gray-100">
                          {(["1K", "2K", "4K"] as const).map(res => (
                            <button
                              key={res}
                              onClick={() => setImageSize(res)}
                              className={`flex-1 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                                imageSize === res ? 'bg-amber-950 text-white shadow-lg' : 'text-gray-400 hover:text-amber-800'
                              }`}
                            >
                              {res}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-8">
                        <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                          <Shapes className="w-4 h-4" /> Aspect Ratio
                        </label>
                        <div className="grid grid-cols-5 gap-2 p-2 bg-[#fcfcfb] rounded-[2.5rem] border border-gray-100">
                          {(["1:1", "3:4", "4:3", "9:16", "16:9"] as const).map(ratio => (
                            <button
                              key={ratio}
                              onClick={() => setAspectRatio(ratio)}
                              className={`py-3 rounded-[1.2rem] text-[8px] font-black uppercase tracking-widest transition-all ${
                                aspectRatio === ratio ? 'bg-amber-950 text-white' : 'text-gray-400 hover:text-amber-800'
                              }`}
                            >
                              {ratio}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                          <Fingerprint className="w-4 h-4" /> Synthesis Seed
                        </label>
                        <button onClick={randomizeSeed} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-800">
                          <Dices className="w-3.5 h-3.5" /> Randomize
                        </button>
                      </div>
                      <div className="relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2">
                          <Terminal className="w-4 h-4 text-amber-500" />
                        </div>
                        <input 
                          type="number" 
                          value={seed || ''}
                          onChange={(e) => setSeed(e.target.value ? parseInt(e.target.value) : undefined)}
                          placeholder="Reproduction Seed (Optional)"
                          className="w-full bg-[#050505] text-amber-400 font-mono text-xs px-16 py-6 rounded-[2rem] border border-zinc-800 focus:border-amber-500 outline-none transition-all placeholder:text-zinc-700"
                        />
                      </div>
                    </div>

                    {/* Enhanced Negative Prompting Section */}
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-300">
                          <EyeOff className="w-4 h-4" /> Negative Constraints
                        </label>
                        <button 
                          onClick={() => setNegativePrompt("")}
                          className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-rose-600 hover:text-rose-800"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Reset
                        </button>
                      </div>

                      {/* Quick Tags */}
                      <div className="flex flex-wrap gap-2">
                        {COMMON_NEGATIVES.map(tag => {
                          const isActive = negativePrompt.includes(tag);
                          return (
                            <button
                              key={tag}
                              onClick={() => toggleNegativeTag(tag)}
                              className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
                                isActive 
                                  ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm ring-2 ring-rose-500/10' 
                                  : 'bg-white border-zinc-100 text-zinc-400 hover:border-rose-200 hover:text-rose-600'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>

                      <div className="relative group">
                        <div className="absolute left-6 top-8">
                          <Terminal className="w-4 h-4 text-rose-500" />
                        </div>
                        <textarea 
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          placeholder="EXCLUDE: Gradients, Modernist shadows, blurry lines, realistic folds..."
                          className="w-full bg-[#0a0a0a] text-rose-400 font-mono text-xs p-16 rounded-[2.5rem] border border-zinc-900 focus:border-rose-900 outline-none transition-all h-40 resize-none placeholder:text-zinc-800"
                        />
                        <div className="absolute bottom-6 right-8 text-[8px] font-black text-zinc-700 uppercase tracking-widest">
                          Exclusion Protocol Active
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-10">
                <button
                  onClick={handleGenerate}
                  disabled={loading || selectedMotifIds.length === 0}
                  className="w-full bg-amber-950 text-white py-12 rounded-[3.5rem] font-black uppercase tracking-[0.6em] text-sm flex items-center justify-center gap-10 hover:bg-black transition-all shadow-[0_40px_80px_-20px_rgba(26,24,20,0.3)] active:scale-[0.98] group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {loading ? (
                    <><RefreshCcw className="w-7 h-7 animate-spin" /> Synthesizing Pattern...</>
                  ) : (
                    <>Begin Synthesis <Sparkles className="w-7 h-7 group-hover:scale-125 transition-transform" /></>
                  )}
                </button>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <section className="sticky top-44 space-y-16">
              <PreviewDisplay pattern={currentPattern} isGenerating={loading} />
              
              {history.length > 0 && (
                <div className="pt-20 border-t border-black/5 space-y-12">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400 flex items-center gap-4">
                    <History className="w-4 h-4" /> Studio Archive
                  </h3>
                  <div className="grid grid-cols-4 gap-6">
                    {history.slice(0, 12).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleRestoreFromArchive(item)}
                        className={`group relative aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all active:scale-95 ${
                          currentPattern?.id === item.id 
                            ? 'border-amber-600 ring-4 ring-amber-100 shadow-2xl z-10 scale-105' 
                            : 'border-transparent hover:border-amber-200 shadow-sm'
                        }`}
                        title={item.motif}
                      >
                        <img src={item.imageUrl} alt="Archive Thumb" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-amber-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                           <RefreshCcw className="w-5 h-5 text-white mb-2 animate-spin-slow" />
                           <span className="text-[8px] font-black text-white uppercase tracking-widest leading-tight">Restore Session</span>
                        </div>
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-white/90 backdrop-blur rounded-md text-[7px] font-black uppercase tracking-tighter text-amber-950 shadow-sm border border-black/5">
                           {item.culture === Culture.PAKISTAN ? 'PK' : item.culture === Culture.CHINA ? 'CN' : 'FS'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Hidden File Inputs */}
      <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleFileUpload} />
      <input type="file" ref={sourceImageInputRef} className="hidden" accept="image/*" onChange={handleSourceImageUpload} />
    </div>
  );
}

export default App;
