
export interface MushroomIdentification {
  commonName: string;
  scientificName: string;
  confidence: number;
  description: string;
  disclaimer: string;
}

export type AppStatus = 'idle' | 'preview' | 'loading' | 'success' | 'error';
