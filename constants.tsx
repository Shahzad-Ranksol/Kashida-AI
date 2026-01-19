
import { Culture, Motif, ColorPalette, ArtStylePreset } from './types';

export const ART_STYLES: ArtStylePreset[] = [
  {
    id: 'classic_silk',
    name: 'Classic Silk',
    description: 'Traditional high-fidelity textile scan with realistic fiber texture.',
    promptSuffix: 'photorealistic textile scan, high-fidelity fabric texture, detailed microscopic fiber structure, professional studio lighting'
  },
  {
    id: 'watercolor',
    name: 'Vibrant Watercolor',
    description: 'Fluid washes of color, soft edges, and organic blending with a hand-painted feel.',
    promptSuffix: 'vibrant watercolor painting, fluid wet-on-wet washes, bleeding ink edges, delicate pigment blooming, hand-painted on textured paper'
  },
  {
    id: 'engraving',
    name: 'Intricate Engraving',
    description: 'Fine line work, cross-hatching, and high-contrast detail inspired by classic printmaking.',
    promptSuffix: 'intricate woodblock engraving, fine line-art, cross-hatching textures, high-contrast monochrome ink style, historical print aesthetic'
  },
  {
    id: 'mosaic',
    name: 'Digital Mosaic',
    description: 'Geometric fragmentation, pixel-perfect tiling, and vibrant electronic hues.',
    promptSuffix: 'digital mosaic art, geometric fragmentation, crystalline tiling, vibrant backlit electronic hues, sharp faceted edges'
  },
  {
    id: 'expressionism',
    name: 'Abstract Expressionism',
    description: 'Dynamic strokes, energetic splatters, and bold non-representational forms.',
    promptSuffix: 'abstract expressionism, dynamic gestural strokes, energetic paint splatters, bold impasto texture, emotional non-representational energy'
  },
  {
    id: 'ink_wash',
    name: 'Oriental Ink Wash',
    description: 'Traditional monochrome ink painting with emphasis on brush flow and negative space.',
    promptSuffix: 'traditional sumi-e ink wash, expressive brushwork, varying ink opacity, masterful negative space, fluid calligraphic lines'
  }
];

export const MOTIFS: Motif[] = [
  // Pakistan Studio
  { 
    id: 'ajrak', 
    name: 'Ajrak Geometry', 
    description: 'Sindhi woodblock printing. Symmetrical rosettes and geometric borders with interlocking diamond frames.', 
    culture: Culture.PAKISTAN,
    previewUrl: 'https://images.unsplash.com/photo-1590736962236-4700e527027d?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'paisley', 
    name: 'Mughal Paisley', 
    description: 'Sinuous teardrop "Butta" motifs filled with micro-florals and delicate botanical scrolling.', 
    culture: Culture.PAKISTAN,
    previewUrl: 'https://images.unsplash.com/photo-1606293459208-8cc4523e0811?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'mughal_floral', 
    name: 'Mughal Vine & Bloom', 
    description: 'Symmetrical interlacing vines (Arabesque) with blooming flowers, inspired by Persian-Indo garden architecture.', 
    culture: Culture.PAKISTAN,
    previewUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'truck_art', 
    name: 'Truck Art Bloom', 
    description: 'Vibrant kaleidoscopic folk-art florals and exotic birds with bold, expressive line work.', 
    culture: Culture.PAKISTAN,
    previewUrl: 'https://images.unsplash.com/photo-1621360341397-293674686411?auto=format&fit=crop&q=80&w=800'
  },
  
  // China Studio
  { 
    id: 'porcelain', 
    name: 'Blue & White Vines', 
    description: 'Ming-style cobalt brushwork featuring continuous fluid vines and stylized botanical scrolling.', 
    culture: Culture.CHINA,
    previewUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'lattice', 
    name: 'Imperial Lattice', 
    description: 'Geometric interlocking screen patterns (Jingzi) used to frame organic floral infills.', 
    culture: Culture.CHINA,
    previewUrl: 'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'peony', 
    name: 'Royal Peony', 
    description: 'Large, lush flowering peonies with intricate petal shading and delicate, asymmetrical stem growth.', 
    culture: Culture.CHINA,
    previewUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 'clouds', 
    name: 'Lucky Clouds', 
    description: 'Sinuous, stylized Xiangyun clouds representing auspicious connection and eternal visual flow.', 
    culture: Culture.CHINA,
    previewUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800'
  },

  // SIGNATURE FUSION DESIGNS
  {
    id: 'fusion_design_1',
    name: 'Mughal Blossoms in Lattice Harmony',
    description: 'Design #1: A seamless repeat blending Pakistani Mughal floral motifs (foreground) with a delicate Chinese lattice pattern (background). Rendered in soft, natural watercolor tones.',
    culture: Culture.FUSION,
    previewUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fusion_design_2',
    name: 'Paisley Reimagined',
    description: 'Design #2: A dynamic interpretation of Pakistani paisley, filled with intricate Chinese ethnic patterns. Subtle watercolor wash background inspired by Chinese ink painting.',
    culture: Culture.FUSION,
    previewUrl: 'https://images.unsplash.com/photo-1544208945-337ccb7e174e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fusion_design_3',
    name: 'Monumental Mughal Fusion',
    description: 'Design #3: Architectural border-style composition: Pakistani Mughal arches and jalis interwoven with Forbidden City Palace details. Vibrant poster colors.',
    culture: Culture.FUSION,
    previewUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fusion_design_4',
    name: 'Fusion Journey of Cultural Symbols',
    description: 'Design #4: Fusing Pakistani truck art motifs with Forbidden Chinese pagodas. Dynamic interlacing symbolizing cultural exchange. Expressive watercolor.',
    culture: Culture.FUSION,
    previewUrl: 'https://images.unsplash.com/photo-1595181079522-86134a66e60b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fusion_design_5',
    name: 'Ajrak Geometry Meets Eastern Ornament',
    description: 'Design #5: Symmetrical layout rooted in Sindhi Ajrak tradition, reinterpreted with Chinese cultural symbols. Rich poster colors for strong visual impact.',
    culture: Culture.FUSION,
    previewUrl: 'https://images.unsplash.com/photo-1590736962236-4700e527027d?auto=format&fit=crop&q=80&w=800'
  }
];

export const PALETTES: ColorPalette[] = [
  { name: 'Traditional Madder', colors: ['#800000', '#000080', '#F5F5DC', '#000000'] },
  { name: 'Imperial Gold', colors: ['#FFD700', '#B8860B', '#8B4513', '#FFFFFF'] },
  { name: 'Ming Cobalt', colors: ['#0047AB', '#FFFFFF', '#ADD8E6', '#2F4F4F'] },
  { name: 'Truck Art Neon', colors: ['#FF007F', '#00FFCC', '#FFD700', '#7F00FF', '#FF5F1F'] },
  { name: 'Silk Road Sunset', colors: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'] },
  { name: 'Jade Garden', colors: ['#00A896', '#028090', '#F0F3BD', '#05668D', '#02C39A'] },
  { name: 'Indigo Night', colors: ['#14213D', '#FCA311', '#E5E5E5', '#000000', '#FFFFFF'] },
  { name: 'Hyper-Pop Heritage', colors: ['#FF1493', '#00BFFF', '#ADFF2F', '#FFD700', '#FF4500'] },
  { name: 'Electric Indus', colors: ['#0000CD', '#FF6347', '#32CD32', '#9400D3', '#F0E68C'] },
  { name: 'Modern Ming', colors: ['#0F52BA', '#F5F5F5', '#FF7F50', '#708090', '#B0E0E6'] },
  { name: 'Terracotta Silk', colors: ['#E2725B', '#DAA520', '#556B2F', '#800000', '#FAF9F6'] },
  { name: 'Neon Pagoda', colors: ['#39FF14', '#FF00FF', '#00FFFF', '#FF9900', '#000000'] },
  { name: 'Digital Orchid', colors: ['#DA70D6', '#BA55D3', '#9932CC', '#00FA9A', '#F5F5F5'] },
  { name: 'Solar Bazaar', colors: ['#FF4500', '#FF8C00', '#FFD700', '#C71585', '#4B0082'] },
  { name: 'Acid Embroidery', colors: ['#C0FF00', '#1A1A1A', '#8A2BE2', '#40E0D0', '#FF69B4'] },
  { name: 'Meta-Copper', colors: ['#CD7F32', '#B87333', '#A0522D', '#2F4F4F', '#D3D3D3'] },
  { name: 'Synthwave Spice', colors: ['#00CED1', '#FF00FF', '#FFA500', '#FFD700', '#191970'] }
];

export const HERITAGE_DATASETS: Record<string, string[]> = {
  ajrak: [
    'https://images.unsplash.com/photo-1590736962236-4700e527027d?q=80&w=800',
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800',
    'https://images.unsplash.com/photo-1606293459208-8cc4523e0811?q=80&w=800'
  ],
  truck_art: [
    'https://images.unsplash.com/photo-1621360341397-293674686411?q=80&w=800',
    'https://images.unsplash.com/photo-1563721300063-49666d9ef725?q=80&w=800',
    'https://images.unsplash.com/photo-1595181079522-86134a66e60b?q=80&w=800',
    'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800'
  ],
  porcelain: [
    'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800',
    'https://images.unsplash.com/photo-1590483736622-39da8caf34dc?q=80&w=800',
    'https://images.unsplash.com/photo-1605273391993-875f543666b6?q=80&w=800'
  ],
  peony: [
    'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800',
    'https://images.unsplash.com/photo-1496062031456-07b8f162a322?q=80&w=800',
    'https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=800'
  ]
};
