import { useState, useRef } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Canvas } from './components/Canvas';
import { ControlPanel } from './components/ControlPanel';
import { ExportButton } from './components/ExportButton';
import { OverlayConfig } from './types';
import Konva from 'konva';

const initialOverlays: OverlayConfig[] = [
  {
    id: 'center-circle',
    name: 'Center Circles',
    enabled: false,
    size: 150,
    rotation: 0,
    opacity: 0.8,
    color: '#ec4899',
    x: 400,
    y: 300,
  },
  {
    id: 'hour-grid',
    name: 'Hour Grid (12 markers)',
    enabled: false,
    size: 180,
    rotation: 0,
    opacity: 0.8,
    color: '#ec4899',
    x: 400,
    y: 300,
  },
  {
    id: 'minute-grid',
    name: 'Minute Grid (60 markers)',
    enabled: false,
    size: 180,
    rotation: 0,
    opacity: 0.6,
    color: '#ec4899',
    x: 400,
    y: 300,
  },
  {
    id: 'crosshair',
    name: 'Crosshair',
    enabled: false,
    size: 200,
    rotation: 0,
    opacity: 0.8,
    color: '#ec4899',
    x: 400,
    y: 300,
  },
  {
    id: 'date-guide',
    name: 'Date Window Guide',
    enabled: false,
    size: 100,
    rotation: 0,
    opacity: 0.8,
    color: '#ec4899',
    x: 520,
    y: 300,
  },
  {
    id: 'logo-guide',
    name: 'Logo/Dial Alignment',
    enabled: false,
    size: 150,
    rotation: 0,
    opacity: 0.8,
    color: '#ec4899',
    x: 400,
    y: 300,
  },
];

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [overlays, setOverlays] = useState<OverlayConfig[]>(initialOverlays);
  const stageRef = useRef<Konva.Stage>(null);

  const handleImageUpload = (src: string) => {
    setImageSrc(src);
    // Reset zoom and rotation when new image is uploaded
    setImageZoom(1);
    setImageRotation(0);
    
    // Center overlays on new image - use functional update to avoid stale closure
    setTimeout(() => {
      if (stageRef.current) {
        const stage = stageRef.current;
        const centerX = stage.width() / 2;
        const centerY = stage.height() / 2;
        
        setOverlays(currentOverlays => currentOverlays.map(overlay => ({
          ...overlay,
          x: centerX,
          y: centerY,
        })));
      }
    }, 300); // Increased timeout to ensure canvas is rendered
  };

  const handleClearImage = () => {
    setImageSrc(null);
    setImageZoom(1);
    setImageRotation(0);
    setOverlays(initialOverlays);
  };

  const handleOverlayToggle = (id: string) => {
    setOverlays(overlays.map(overlay =>
      overlay.id === id ? { ...overlay, enabled: !overlay.enabled } : overlay
    ));
  };

  const handleOverlayChange = (id: string, property: keyof OverlayConfig, value: number | string) => {
    setOverlays(overlays.map(overlay =>
      overlay.id === id ? { ...overlay, [property]: value } : overlay
    ));
  };

  const handleOverlayPositionChange = (id: string, x: number, y: number) => {
    setOverlays(overlays.map(overlay =>
      overlay.id === id ? { ...overlay, x, y } : overlay
    ));
  };

  const handleExport = () => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL({
        pixelRatio: 2, // Higher quality export
        mimeType: 'image/png',
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `watch-qc-${Date.now()}.png`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <header className="app-header">
        <div className="watch-icon">⌚</div>
        <div>
          <h1>QC Tool for Watches</h1>
          <div className="subtitle">Professional Watch Quality Control Overlay Analysis</div>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2>Upload</h2>
            <ImageUploader
              onImageUpload={handleImageUpload}
              hasImage={!!imageSrc}
              onClearImage={handleClearImage}
            />
          </div>

          {imageSrc && (
            <>
              <ControlPanel
                imageZoom={imageZoom}
                imageRotation={imageRotation}
                onImageZoomChange={setImageZoom}
                onImageRotationChange={setImageRotation}
                overlays={overlays}
                onOverlayToggle={handleOverlayToggle}
                onOverlayChange={handleOverlayChange}
              />
              <ExportButton onExport={handleExport} disabled={!imageSrc} />
            </>
          )}
        </aside>

        <main className="canvas-area">
          <Canvas
            imageSrc={imageSrc}
            imageZoom={imageZoom}
            imageRotation={imageRotation}
            overlays={overlays}
            stageRef={stageRef}
            onOverlayPositionChange={handleOverlayPositionChange}
          />
        </main>
      </div>
    </div>
  );
}

export default App;

