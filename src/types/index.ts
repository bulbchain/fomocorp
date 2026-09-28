export type NavigationTab = 'origin' | 'specimen' | 'game' | 'lab' | 'community';

export type GameDifficulty = 'EASY' | 'UNSTABLE' | 'CHAOS99';

export type RunnerCharacter = 'ALPHA' | 'SOMA' | 'CHRONO';

export interface Specimen {
  id: string;
  ref: string;
  name: string;
  subtitle: string;
  rarity: 'EXOTIC' | 'MYTHIC' | 'UNKNOWN' | 'CLASSIFIED';
  rarityColor: string;
  rarityBg: string;
  image: string;
  chaosRating: string;
  containment: string;
  reproductiveRate: string;
  mutationStatus: string;
  opticFreq?: string;
  harmonicField?: string;
  networkFootprint?: string;
  dataIntegrity?: string;
  description: string;
  classificationCode: string;
  dnaSequence: string;
  pulseBpm: number;
  toxicityLevel: string;
}

export interface GameObstacle {
  id: number;
  type: 'laser' | 'gear' | 'mouth' | 'slime';
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  rotation: number;
  passed?: boolean;
}

export interface GameCollectible {
  id: number;
  type: 'mutagen' | 'chaos_orb' | 'shield' | 'magnet';
  x: number;
  y: number;
  radius: number;
  collected?: boolean;
  pulse: number;
}

export interface GameFloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface GameParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}
