import { useState, useRef, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Canvas } from './components/Canvas';
import { ControlPanel } from './components/ControlPanel';
import { ExportButton } from './components/ExportButton';
import { TabSwitcher } from './components/QCGuide/TabSwitcher';
import { QCChecklist } from './components/QCGuide/QCChecklist';
import { WatchGuideSelector } from './components/QCGuide/WatchGuideSelector';
import { WatchGuideDetail } from './components/QCGuide/WatchGuideDetail';
import { ExportReport } from './components/QCGuide/ExportReport';
import { OverlayConfig, ChecklistItem } from './types';
import { defaultChecklist } from './data/checklistData';
import { watchGuides } from './data/watchGuides';
import Konva from 'konva';

// Feature Flags - Set to true to enable features
const ENABLE_WATCH_GUIDE_SELECTOR = false; // Change to true to enable watch model selection

const initialOverlays: OverlayConfig[] = [
  {
    id: 'hour-grid',
    name: 'Hour Grid (12 markers)',
    enabled: false,
    size: 180,
    rotation: 0,
    opacity: 0.8,
    color: '#00d4ff',
    x: 400,
    y: 300,
    zIndex: 0,
  },
];

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [overlays, setOverlays] = useState<OverlayConfig[]>(initialOverlays);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'controls' | 'qc-guide'>('controls');
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(defaultChecklist);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [dealerName, setDealerName] = useState('');
  const [factoryName, setFactoryName] = useState('');
  const [modelName, setModelName] = useState('');
  const [pricePaid, setPricePaid] = useState('');
  const [albumLinks, setAlbumLinks] = useState('');
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

  const handleOverlaySelect = (id: string | null) => {
    setSelectedOverlayId(id);
  };

  const handleChecklistToggle = (id: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleChecklistNotesUpdate = (id: string, notes: string) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, userNotes: notes } : item
      )
    );
  };

  const handleBringToFront = (id: string) => {
    const maxZIndex = Math.max(...overlays.map(o => o.zIndex || 0));
    setOverlays(overlays.map(overlay =>
      overlay.id === id ? { ...overlay, zIndex: maxZIndex + 1 } : overlay
    ));
  };

  // Handle arrow key movements for selected overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedOverlayId) return;

      const moveAmount = e.shiftKey ? 10 : 1; // Hold Shift for faster movement

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setOverlays(currentOverlays =>
            currentOverlays.map(overlay =>
              overlay.id === selectedOverlayId ? { ...overlay, y: overlay.y - moveAmount } : overlay
            )
          );
          break;
        case 'ArrowDown':
          e.preventDefault();
          setOverlays(currentOverlays =>
            currentOverlays.map(overlay =>
              overlay.id === selectedOverlayId ? { ...overlay, y: overlay.y + moveAmount } : overlay
            )
          );
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setOverlays(currentOverlays =>
            currentOverlays.map(overlay =>
              overlay.id === selectedOverlayId ? { ...overlay, x: overlay.x - moveAmount } : overlay
            )
          );
          break;
        case 'ArrowRight':
          e.preventDefault();
          setOverlays(currentOverlays =>
            currentOverlays.map(overlay =>
              overlay.id === selectedOverlayId ? { ...overlay, x: overlay.x + moveAmount } : overlay
            )
          );
          break;
        case 'Escape':
          setSelectedOverlayId(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOverlayId]);

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
        <div>
          <h1>QC Tool for Watches</h1>
          <div className="subtitle">Quality control made easy</div>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'controls' ? (
            <>
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
                onBringToFront={handleBringToFront}
              />
                  <ExportButton onExport={handleExport} disabled={!imageSrc} />
                </>
              )}
            </>
          ) : (
            <>
              {ENABLE_WATCH_GUIDE_SELECTOR && (
                <>
                  <div className="sidebar-section">
                    <WatchGuideSelector
                      guides={watchGuides}
                      selectedGuideId={selectedGuideId}
                      onSelectGuide={setSelectedGuideId}
                    />
                  </div>

                  {selectedGuideId && (
                    <div className="sidebar-section">
                      <WatchGuideDetail
                        guide={watchGuides.find(g => g.id === selectedGuideId)!}
                      />
                    </div>
                  )}
                </>
              )}

              <div className="sidebar-section">
                <h2>QC Checklist</h2>
                <QCChecklist
                  items={checklistItems}
                  onToggleItem={handleChecklistToggle}
                  onUpdateNotes={handleChecklistNotesUpdate}
                  dealerName={dealerName}
                  factoryName={factoryName}
                  modelName={modelName}
                  pricePaid={pricePaid}
                  albumLinks={albumLinks}
                  onDealerNameChange={setDealerName}
                  onFactoryNameChange={setFactoryName}
                  onModelNameChange={setModelName}
                  onPricePaidChange={setPricePaid}
                  onAlbumLinksChange={setAlbumLinks}
                />
              </div>

              <div className="sidebar-section">
                <ExportReport
                  checklistItems={checklistItems}
                  watchModel={ENABLE_WATCH_GUIDE_SELECTOR && selectedGuideId ? watchGuides.find(g => g.id === selectedGuideId)?.model || null : null}
                  dealerName={dealerName}
                  factoryName={factoryName}
                  modelName={modelName}
                  pricePaid={pricePaid}
                  albumLinks={albumLinks}
                />
              </div>
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
            onOverlaySelect={handleOverlaySelect}
          />
        </main>
      </div>
    </div>
  );
}

export default App;

