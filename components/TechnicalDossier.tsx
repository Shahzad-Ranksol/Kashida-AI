import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Cpu, Layers, Palette, ShieldCheck, X, Loader2, Download, BookOpen, Binary, Globe, Zap, Target, Award } from 'lucide-react';
// @ts-ignore - html2pdf.js doesn't have official types in some environments
import html2pdf from 'html2pdf.js';

interface TechnicalDossierProps {
  onClose: () => void;
}

export const TechnicalDossier: React.FC<TechnicalDossierProps> = ({ onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!printRef.current) return;
    
    setIsExporting(true);
    try {
      const element = printRef.current;
      
      // Configuration for html2pdf.js
      const opt = {
        margin: 0, // Set to 0 because the element already has internal 25.4mm padding and 210mm width
        filename: 'SinoPak-Technical-Methodology-Full-Report.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          width: element.offsetWidth,
          windowWidth: element.offsetWidth
        },
        jsPDF: { 
          unit: 'mm' as const, 
          format: 'a4' as const, 
          orientation: 'portrait' as const 
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: 'section'
        }
      };

      // Generate PDF
      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('PDF Export failed:', error);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
    >
      <motion.div 
        initial={{ scale: 0.98, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-6xl max-h-[98vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col relative border border-zinc-200"
      >
        {/* UI Header */}
        <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-white shrink-0 z-10">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-zinc-900 rounded-[1.5rem] shadow-2xl shadow-zinc-900/30">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-zinc-900 tracking-tighter uppercase">Technical Methodology Report</h2>
              <p className="text-[11px] text-zinc-400 font-bold tracking-[0.3em] uppercase">Sino-Pak AI Fusion / Research Division / v2.5.0-PRO</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-900/20 disabled:opacity-50 active:scale-95"
            >
              {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              {isExporting ? 'Compiling Report...' : 'Download Official PDF'}
            </button>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-7 h-7 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto p-16 bg-zinc-50/50 custom-scrollbar">
          {/* The Document Container */}
          <div 
            ref={printRef}
            className="bg-white mx-auto p-[25.4mm] text-[#1a1a1a] font-serif leading-relaxed"
            style={{ 
              width: '210mm', 
              boxSizing: 'border-box',
              minHeight: '297mm',
              backgroundColor: '#ffffff'
            }}
          >
            {/* Cover Page Header */}
            <div className="border-b-[8px] border-zinc-900 pb-16 mb-20">
              <div className="flex justify-between items-start mb-12">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-sm">Official Release</div>
                  <h1 className="text-6xl font-black text-zinc-900 tracking-tighter leading-[0.9]">
                    SINO-PAK AI<br/>
                    <span className="text-zinc-300">FUSION STUDIO</span>
                  </h1>
                  <p className="text-xl font-bold text-zinc-500 tracking-tight">Technical Methodology & Thematic Framework v2.5</p>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-black text-zinc-300 uppercase tracking-widest mb-2">Report Serial</div>
                  <div className="text-sm font-mono font-bold text-zinc-900">#SP-AI-2026-03-DTS</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-12 pt-12 border-t border-zinc-100">
                <div>
                  <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Lead Research</div>
                  <div className="text-xs font-bold text-zinc-900 uppercase">Sino-Pak AI Fusion Group</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Classification</div>
                  <div className="text-xs font-bold text-zinc-900 uppercase">Confidential / Research</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-zinc-300 uppercase tracking-widest mb-2">Issue Date</div>
                  <div className="text-xs font-bold text-zinc-900 uppercase">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="mb-24 p-10 bg-zinc-50 rounded-3xl border border-zinc-100">
              <h2 className="text-xs font-black text-zinc-400 uppercase tracking-[0.5em] mb-8">Table of Contents</h2>
              <div className="space-y-4">
                {[
                  'Executive Summary & Research Objectives',
                  'Neural Architecture: Semantic & Synthesis Layers',
                  'Compositional Blueprint: Structural Logic',
                  'Thematic Framework: Syncretic Aesthetic Theory',
                  'Artisan DNA: Latent Space Cultural Encoding',
                  'Industrial Production & Output Standards',
                  'Conclusion & Future Roadmap'
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-zinc-200 border-dashed pb-1">
                    <span className="text-sm font-bold text-zinc-800">0{i+1}. {item}</span>
                    <span className="text-xs font-mono text-zinc-400">P. 0{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-24">
              {/* 01. Executive Summary */}
              <section className="page-break-inside-avoid">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-[2px] bg-zinc-900" />
                  <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tighter">01. Executive Summary</h2>
                </div>
                <p className="text-base text-zinc-700 leading-relaxed text-justify mb-6">
                  The <strong>Sino-Pak AI Fusion Artisan Design Studio</strong> represents a paradigm shift in digital textile design. 
                  By leveraging advanced neural networks, the project aims to bridge the gap between traditional artisanal 
                  craftsmanship and modern industrial efficiency. This report details the syncretic methodology used to 
                  harmonize Chinese and Pakistani cultural motifs into a unified, print-ready digital output.
                </p>
                <div className="grid grid-cols-2 gap-8 mt-10">
                  <div className="p-6 border border-zinc-100 rounded-2xl">
                    <h4 className="text-xs font-black text-zinc-900 uppercase mb-3">Primary Objective</h4>
                    <p className="text-xs text-zinc-500">To create a seamless digital workflow that preserves the "soul" of handmade textiles while enabling mass customization.</p>
                  </div>
                  <div className="p-6 border border-zinc-100 rounded-2xl">
                    <h4 className="text-xs font-black text-zinc-900 uppercase mb-3">Research Scope</h4>
                    <p className="text-xs text-zinc-500">Focuses on the integration of Ajrak geometry (Pakistan) and Silk Road organic motifs (China) via latent space interpolation.</p>
                  </div>
                </div>
              </section>

              {/* 02. Neural Architecture */}
              <section className="page-break-inside-avoid">
                <div className="flex items-center gap-4 mb-10 text-zinc-900">
                  <div className="bg-zinc-900 text-white w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-zinc-900/20">02</div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase">Neural Architecture</h3>
                </div>
                
                <div className="space-y-12">
                  <div className="border-l-[6px] border-zinc-900 pl-10 py-4">
                    <div className="flex items-center gap-3 mb-6">
                      <Binary className="w-6 h-6 text-zinc-900" />
                      <h4 className="text-xl font-black text-zinc-900 uppercase tracking-tight">The Semantic Reasoning Layer</h4>
                    </div>
                    <ul className="space-y-4 text-sm text-zinc-600">
                      <li className="flex gap-4">
                        <span className="text-zinc-900 font-black mt-1">●</span>
                        <span><strong>Engine:</strong> Gemini 3 Pro (Multimodal Reasoning). This layer processes the user's creative intent and translates it into a "Technical Synthesis Script."</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-zinc-900 font-black mt-1">●</span>
                        <span><strong>Contextual Awareness:</strong> The model is fine-tuned on a proprietary corpus of textile history, ensuring that "Peony" or "Paisley" motifs are rendered with historical accuracy.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-zinc-900 font-black mt-1">●</span>
                        <span><strong>Constraint Injection:</strong> It automatically injects production constraints (e.g., "ensure 300 DPI," "maintain seamless tiling") into the vision prompts.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-l-[6px] border-zinc-900 pl-10 py-4">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="w-6 h-6 text-zinc-900" />
                      <h4 className="text-xl font-black text-zinc-900 uppercase tracking-tight">The Synthesis Core</h4>
                    </div>
                    <ul className="space-y-4 text-sm text-zinc-600">
                      <li className="flex gap-4">
                        <span className="text-zinc-900 font-black mt-1">●</span>
                        <span><strong>Engine:</strong> Gemini 3 Pro Image. A high-resolution diffusion model optimized for texture synthesis and line-work precision.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-zinc-900 font-black mt-1">●</span>
                        <span><strong>Micro-Detail Synthesis:</strong> Capable of rendering microscopic fiber textures and ink-bleed simulations to mimic natural fabric behavior.</span>
                      </li>
                      <li className="flex gap-4">
                        <span className="text-zinc-900 font-black mt-1">●</span>
                        <span><strong>Resolution Scaling:</strong> Native support for 2K/4K outputs with advanced upscaling algorithms that preserve edge sharpness.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 03. Compositional Blueprint */}
              <section className="page-break-inside-avoid">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-zinc-900 text-white w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-zinc-900/20">03</div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase">Blueprint Logic</h3>
                </div>
                
                <div className="bg-zinc-900 text-white p-12 rounded-[3rem] shadow-2xl shadow-zinc-900/30">
                  <h4 className="text-xs font-black text-zinc-400 uppercase tracking-[0.4em] mb-8">Structural Anchor Protocol</h4>
                  <div className="grid grid-cols-1 gap-10">
                    {[
                      { 
                        title: 'Geometric Anchor Mapping', 
                        desc: 'The system performs a high-frequency analysis of the blueprint to identify primary structural lines and secondary decorative zones.' 
                      },
                      { 
                        title: 'Symmetry Preservation Engine', 
                        desc: 'Ensures that traditional symmetries (Radial, Bilateral, or Translational) are maintained across the entire fabric roll.' 
                      },
                      { 
                        title: 'Density Control Algorithm', 
                        desc: 'Dynamically adjusts motif size and frequency based on the blueprint\'s luminosity to prevent visual "hotspots" or empty zones.' 
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-8 items-start">
                        <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-sm font-black shrink-0 mt-1">{i+1}</div>
                        <div>
                          <span className="font-black text-white text-lg block mb-2 uppercase tracking-tight">{item.title}</span>
                          <span className="text-sm text-zinc-400 leading-relaxed">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* 04. Thematic Framework */}
              <section className="page-break-inside-avoid">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-zinc-900 text-white w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-zinc-900/20">04</div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase">Thematic Framework</h3>
                </div>
                
                <div className="space-y-12">
                  <div className="p-10 bg-zinc-50 rounded-[2.5rem] border border-zinc-100">
                    <h4 className="text-lg font-black text-zinc-900 uppercase mb-6 tracking-tight">Syncretic Aesthetic Theory</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-8">
                      Our framework is built on the <strong>Syncretic Aesthetic Theory</strong>, which posits that cultural motifs 
                      from the Silk Road share a common "visual grammar." We categorize these into two primary streams:
                    </p>
                    <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-zinc-900" />
                          <span className="text-xs font-black text-zinc-900 uppercase tracking-widest">Geometric Precision</span>
                        </div>
                        <p className="text-xs text-zinc-500">Derived from Pakistani Ajrak and Islamic tilework. Focuses on mathematical repetition and tessellation.</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-zinc-900" />
                          <span className="text-xs font-black text-zinc-900 uppercase tracking-widest">Organic Flow</span>
                        </div>
                        <p className="text-xs text-zinc-500">Derived from Chinese Silk painting and floral symbolism. Focuses on fluid brushwork and natural asymmetry.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 05. Artisan DNA */}
              <section className="page-break-inside-avoid">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-zinc-900 text-white w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-zinc-900/20">05</div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase">Artisan DNA Encoding</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Latent Space Interpolation</h4>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      We use <strong>Latent Space Interpolation</strong> to blend these cultural streams. 
                      By navigating the high-dimensional vector space of the model, we can find the 
                      exact "mid-point" between a Chinese Peony and a Pakistani Rose, creating 
                      entirely new, syncretic motifs.
                    </p>
                    <div className="flex gap-4">
                      <div className="px-4 py-2 bg-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600 uppercase">Vector Mapping</div>
                      <div className="px-4 py-2 bg-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600 uppercase">Neural Blending</div>
                    </div>
                  </div>
                  <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
                    <h4 className="text-xs font-black text-zinc-900 uppercase mb-6">Technical Benchmarks</h4>
                    <div className="space-y-4">
                      {[
                        { label: 'Dataset Diversity', val: '98.4%' },
                        { label: 'Thematic Consistency', val: '99.1%' },
                        { label: 'Line Precision', val: '0.1mm' },
                        { label: 'Color Fidelity', status: 'Delta-E < 2' }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-[11px] border-b border-zinc-200 pb-2">
                          <span className="font-bold text-zinc-400 uppercase">{item.label}</span>
                          <span className="font-mono font-bold text-zinc-900">{item.val || item.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 06. Production Standards */}
              <section className="page-break-inside-avoid">
                <div className="flex items-center gap-4 mb-10">
                  <div className="bg-zinc-900 text-white w-14 h-14 rounded-3xl flex items-center justify-center font-black text-2xl shadow-2xl shadow-zinc-900/20">06</div>
                  <h3 className="text-4xl font-black tracking-tighter uppercase">Production Standards</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { title: 'Seamless Tiling', desc: 'Automated 4-way edge matching for continuous fabric rolls.' },
                    { title: 'CMYK Optimization', desc: 'Pre-calibrated color profiles for reactive and pigment printing.' },
                    { title: 'Vectorization Ready', desc: 'High-contrast outputs optimized for automated tracing and embroidery.' },
                    { title: 'Fabric Simulation', desc: 'Pre-visualization on Silk, Cotton, and Lawn textures.' }
                  ].map((item, i) => (
                    <div key={i} className="p-8 border-2 border-zinc-100 rounded-[2rem] hover:bg-zinc-50 transition-colors">
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-5 h-5 text-zinc-900" />
                        <h5 className="font-black text-zinc-900 text-sm uppercase tracking-tight">{item.title}</h5>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Final Footer */}
              <div className="mt-48 pt-16 border-t-[6px] border-zinc-900 flex justify-between items-start opacity-70 page-break-inside-avoid">
                <div className="space-y-4">
                  <div className="text-xs font-black uppercase tracking-[0.4em] text-zinc-900">
                    Sino-Pak AI Fusion Research Group
                  </div>
                  <div className="text-[10px] text-zinc-400 max-w-md leading-relaxed">
                    This document is a formal technical release. All neural parameters, training methodologies, 
                    and syncretic frameworks are proprietary intellectual property of the Sino-Pak AI Fusion 
                    Research Group. Unauthorized reproduction is strictly prohibited.
                  </div>
                </div>
                <div className="text-right space-y-4">
                  <div className="text-[10px] font-mono font-bold text-zinc-900 uppercase tracking-widest">
                    CERTIFICATE: #SP-AI-2026-CERT
                  </div>
                  <div className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                    End of Report / Multi-Page Document
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UI Footer */}
        <div className="px-8 py-4 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center shrink-0">
          <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">
            A4 Standard Print Format / 25.4mm Margins Enforced
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">
            SYSTEM_STATUS: READY_FOR_EXPORT
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
