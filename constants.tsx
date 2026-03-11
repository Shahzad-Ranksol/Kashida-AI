
import { Culture, Motif, ColorPalette, ArtStylePreset } from './types';

export const ART_STYLES: ArtStylePreset[] = [
  {
    id: 'vector_precision',
    name: 'Heritage Vector',
    description: 'Ultra-sharp paths and solid fills. Zero texture, optimized for high-quality industrial printing.',
    promptSuffix: 'flat vector illustration, sharp clean lines, solid color fills, minimalist shading, zero grain, high-resolution digital print-ready, no textures, no paper grain, no canvas effects, perfectly smooth edges, production-ready for textile printing'
  },
  {
    id: 'floral_design',
    name: 'Botanical Floral',
    description: 'Lush, dense floral arrangements with intricate botanical detail and realistic petal depth.',
    promptSuffix: 'intricate botanical floral pattern, hyper-detailed petals, lush foliage, organic garden composition, micro-floral density, vibrant blooms, dense ornamental flowers, clean separation between elements, no color bleeding, smooth gradients, production-ready textile print'
  },
  {
    id: 'watercolor',
    name: 'Vibrant Watercolor',
    description: 'Fluid washes of color, soft edges, and organic blending with a hand-painted feel.',
    promptSuffix: 'vibrant watercolor painting, fluid wet-on-wet washes, bleeding ink edges, delicate pigment blooming, hand-painted on textured paper, high-resolution scan quality, clean background, no artifacts, smooth transitions, optimized for fabric sublimation'
  },
  {
    id: 'engraving',
    name: 'Intricate Engraving',
    description: 'Fine line work, cross-hatching, and high-contrast detail inspired by classic printmaking.',
    promptSuffix: 'intricate woodblock engraving, fine line-art, cross-hatching textures, high-contrast monochrome ink style, historical print aesthetic, razor-sharp lines, no blurring, high-fidelity detail, production-ready for screen printing'
  },
  {
    id: 'mosaic',
    name: 'Digital Mosaic',
    description: 'Geometric fragmentation, pixel-perfect tiling, and vibrant electronic hues.',
    promptSuffix: 'digital mosaic art, geometric fragmentation, crystalline tiling, vibrant backlit electronic hues, sharp faceted edges, pixel-perfect alignment, no compression artifacts, clean geometric shapes, production-ready'
  },
  {
    id: 'expressionism',
    name: 'Abstract Expressionism',
    description: 'Dynamic strokes, energetic splatters, and bold non-representational forms.',
    promptSuffix: 'abstract expressionism, dynamic gestural strokes, energetic paint splatters, bold impasto texture, emotional non-representational energy, high-resolution brushwork, clean digital capture, no noise, smooth color fields, production-ready'
  }
];

export const MOTIFS: Motif[] = [
  // Pakistan Studio
  { 
    id: 'ajrak', 
    name: 'Ajrak Geometry', 
    description: 'Sindhi woodblock printing rosettes and geometric borders with interlocking diamond frames.', 
    culture: Culture.PAKISTAN,
    previewUrl: '' // Removed for text-only synthesis
  },
  { 
    id: 'paisley', 
    name: 'Mughal Paisley', 
    description: 'Sinuous teardrop "Butta" motifs filled with micro-florals and delicate botanical scrolling.', 
    culture: Culture.PAKISTAN,
    previewUrl: ''
  },
  { 
    id: 'mughal_floral', 
    name: 'Mughal Vine', 
    description: 'Symmetrical interlacing Arabesque vines with blooming flowers, inspired by Indo-Persian gardens.', 
    culture: Culture.PAKISTAN,
    previewUrl: ''
  },
  { 
    id: 'truck_art', 
    name: 'Truck Art Bloom', 
    description: 'Vibrant kaleidoscopic folk-art florals and exotic birds with bold, expressive line work.', 
    culture: Culture.PAKISTAN,
    previewUrl: ''
  },
  
  // China Studio
  { 
    id: 'porcelain', 
    name: 'Ming Vines', 
    description: 'Ming-style cobalt brushwork featuring continuous fluid vines and stylized botanical scrolling.', 
    culture: Culture.CHINA,
    previewUrl: ''
  },
  { 
    id: 'lattice', 
    name: 'Imperial Lattice', 
    description: 'Geometric interlocking Jingzi screen patterns used to frame organic floral infills.', 
    culture: Culture.CHINA,
    previewUrl: ''
  },
  { 
    id: 'peony', 
    name: 'Royal Peony', 
    description: 'Large, lush flowering peonies with intricate petal shading and delicate, asymmetrical stem growth.', 
    culture: Culture.CHINA,
    previewUrl: ''
  },
  { 
    id: 'clouds', 
    name: 'Lucky Clouds', 
    description: 'Sinuous, stylized Xiangyun clouds representing auspicious connection and eternal visual flow.', 
    culture: Culture.CHINA,
    previewUrl: ''
  },

  // Fusion Designs
  {
    id: 'fusion_design_1',
    name: 'Silk Road Arabesque',
    description: 'A seamless blend of Mughal florals nested within Chinese lattice geometric frameworks.',
    culture: Culture.FUSION,
    previewUrl: ''
  },
  {
    id: 'fusion_design_2',
    name: 'Celestial Lotus',
    description: 'Symmetrical lotus blossoms rendered with the mathematical precision of Pakistani Ajrak patterns.',
    culture: Culture.FUSION,
    previewUrl: ''
  }
];

export const PALETTES: ColorPalette[] = [
  { name: 'Traditional Madder', colors: ['#800000', '#000080', '#F5F5DC', '#000000'] },
  { name: 'Imperial Gold', colors: ['#FFD700', '#B8860B', '#8B4513', '#FFFFFF'] },
  { name: 'Ming Cobalt', colors: ['#0047AB', '#FFFFFF', '#ADD8E6', '#2F4F4F'] },
  { name: 'Truck Art Neon', colors: ['#FF007F', '#00FFCC', '#FFD700', '#7F00FF', '#FF5F1F'] },
  { name: 'Silk Road Sunset', colors: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'] },
  { name: 'Jade Garden', colors: ['#00A896', '#028090', '#F0F3BD', '#05668D', '#02C39A'] },
  { name: 'Indigo Night', colors: ['#14213D', '#FCA311', '#E5E5E5', '#000000', '#FFFFFF'] }
];
