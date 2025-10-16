export interface ImageState {
  src: string | null;
  zoom: number;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OverlayConfig {
  id: string;
  name: string;
  enabled: boolean;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
  x: number;
  y: number;
  thickness?: number; // Optional thickness for line-based overlays
}

export type OverlayType = 
  | 'center-circle'
  | 'hour-grid'
  | 'minute-grid'
  | 'crosshair'
  | 'date-guide'
  | 'logo-guide';

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  howToCheck: string;
  recommendedOverlay?: OverlayType;
  severity: 'critical' | 'important' | 'optional';
  commonIssues: string[];
  checked: boolean;
  userNotes: string;
}

export interface WatchGuide {
  id: string;
  brand: string;
  model: string;
  referenceNumber: string;
  factories: string[];
  criticalCheckPoints: string[];
  knownIssues: Record<string, string[]>;
  tolerances: Record<string, string>;
}

