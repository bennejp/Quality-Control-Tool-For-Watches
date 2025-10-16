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
}

export type OverlayType = 
  | 'center-circle'
  | 'hour-grid'
  | 'minute-grid'
  | 'crosshair'
  | 'date-guide'
  | 'logo-guide';

