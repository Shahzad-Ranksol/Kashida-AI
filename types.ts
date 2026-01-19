
export enum Culture {
  PAKISTAN = 'Pakistan',
  CHINA = 'China',
  FUSION = 'Fusion'
}

export interface ArtStylePreset {
  id: string;
  name: string;
  description: string;
  promptSuffix: string;
}

export interface Motif {
  id: string;
  name: string;
  description: string;
  culture: Culture;
  previewUrl: string;
  imageData?: string; // Base64 data for custom motifs
  isCustom?: boolean; // Flag to identify user-uploaded motifs
}

export interface ColorPalette {
  name: string;
  colors: string[];
}

export interface ArtisanProfile {
  styleDna: string;
  lastTrained: number;
  datasetSize: number;
  accuracy: number;
  parameters: number;
  epochLogs: string[];
}

export interface GeneratedPattern {
  id: string;
  imageUrl: string;
  prompt: string;
  culture: Culture;
  motif: string;
  reasoning?: string; // AI logic and inspiration description
  timestamp: number;
  config?: GenerationConfig; // Saved state for restoration
}

export interface GenerationConfig {
  culture: Culture;
  motifIds: string[]; 
  colorPalette: string;
  complexity: 'Minimal' | 'Balanced' | 'Maximal';
  repeatType: 'Grid' | 'Half-Drop' | 'Brick';
  artStyleId: string; // The selected ID from ART_STYLES
  sourceImage?: string; // Base64 encoded image for Image-to-Image
  customMotifs?: Motif[]; // Pass the custom motifs to the generator
  artisanProfile?: ArtisanProfile; // Pass the trained DNA
  
  // Advanced Parameters
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
  imageSize?: "1K" | "2K" | "4K";
  negativePrompt?: string;
  seed?: number;
}
