import { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Group, Rect } from 'react-konva';
import { OverlayConfig } from '../types';
import { CenterCircle } from '../overlays/CenterCircle';
import { HourGrid } from '../overlays/HourGrid';
import { MinuteGrid } from '../overlays/MinuteGrid';
import { Crosshair } from '../overlays/Crosshair';
import { DateGuide } from '../overlays/DateGuide';
import { LogoGuide } from '../overlays/LogoGuide';
import Konva from 'konva';

interface CanvasProps {
  imageSrc: string | null;
  imageZoom: number;
  imageRotation: number;
  overlays: OverlayConfig[];
  stageRef: React.RefObject<Konva.Stage>;
  onOverlayPositionChange?: (id: string, x: number, y: number) => void;
  onOverlaySelect?: (id: string | null) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  imageSrc,
  imageZoom,
  imageRotation,
  overlays,
  stageRef,
  onOverlayPositionChange,
  onOverlaySelect,
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const imageGroupRef = useRef<Konva.Group>(null);

  useEffect(() => {
    if (imageSrc) {
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
        // Center image initially
        setImagePosition({ x: 0, y: 0 });
        // Show hint for 3 seconds
        setShowHint(true);
        setTimeout(() => setShowHint(false), 3000);
      };
    } else {
      setImage(null);
      setImagePosition({ x: 0, y: 0 });
    }
  }, [imageSrc]);

  useEffect(() => {
    const handleResize = () => {
      const container = document.querySelector('.canvas-area');
      if (container) {
        const rect = container.getBoundingClientRect();
        setStageSize({
          width: Math.min(rect.width - 40, 1200),
          height: Math.min(rect.height - 40, 900),
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pinch-to-zoom for mobile - MUST be before early return to avoid hooks error
  useEffect(() => {
    if (!stageRef.current || !imageSrc) return;

    let lastDist = 0;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      if (e.touches.length === 2 && imageGroupRef.current) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        const dist = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        if (lastDist > 0) {
          const scale = imageGroupRef.current.scaleX() * (dist / lastDist);
          
          // Limit zoom range (0.1 = 10%, 4 = 400%)
          if (scale >= 0.1 && scale <= 4) {
            imageGroupRef.current.scale({ x: scale, y: scale });
          }
        }
        
        lastDist = dist;
      }
    };

    const handleTouchEnd = () => {
      lastDist = 0;
    };

    try {
      const stage = stageRef.current.container();
      if (stage) {
        stage.addEventListener('touchmove', handleTouchMove, { passive: false });
        stage.addEventListener('touchend', handleTouchEnd);

        return () => {
          stage.removeEventListener('touchmove', handleTouchMove);
          stage.removeEventListener('touchend', handleTouchEnd);
        };
      }
    } catch (error) {
      console.error('Error setting up touch events:', error);
    }
  }, [imageSrc]);

  const renderOverlay = (overlay: OverlayConfig) => {
    if (!overlay.enabled) return null;

    // Overlay components draw relative to (0, 0) since they're inside a positioned Group
    const props = {
      size: overlay.size,
      color: overlay.color,
      opacity: overlay.opacity,
      rotation: overlay.rotation,
      thickness: overlay.thickness,
    };

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
      if (onOverlayPositionChange) {
        // Get the Group's position, not the target
        const group = e.currentTarget;
        onOverlayPositionChange(overlay.id, group.x(), group.y());
      }
    };

    const handleClick = () => {
      if (onOverlaySelect) {
        onOverlaySelect(overlay.id);
      }
    };

    const OverlayComponent = (() => {
      switch (overlay.id) {
        case 'center-circle':
          return <CenterCircle {...props} />;
        case 'hour-grid':
          return <HourGrid {...props} />;
        case 'minute-grid':
          return <MinuteGrid {...props} />;
        case 'crosshair':
          return <Crosshair {...props} />;
        case 'date-guide':
          return <DateGuide {...props} />;
        case 'logo-guide':
          return <LogoGuide {...props} />;
        default:
          return null;
      }
    })();

    // Calculate hitbox size - make it larger than the overlay for easier dragging
    const hitboxSize = overlay.size * 2.5;

    return (
      <Group
        key={overlay.id}
        draggable
        onDragEnd={handleDragEnd}
        onClick={handleClick}
        onTap={handleClick}
        x={overlay.x}
        y={overlay.y}
        rotation={overlay.rotation}
      >
        {/* Invisible hitbox for easier dragging */}
        <Rect
          x={-hitboxSize / 2}
          y={-hitboxSize / 2}
          width={hitboxSize}
          height={hitboxSize}
          fill="transparent"
          opacity={0}
          listening={true}
        />
        {OverlayComponent}
      </Group>
    );
  };

  if (!imageSrc) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📷</div>
        <h3>No Image Loaded</h3>
        <p>Upload a watch photo to get started</p>
      </div>
    );
  }

  const centerX = stageSize.width / 2;
  const centerY = stageSize.height / 2;

  const handleImageDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const group = e.currentTarget as Konva.Group;
    setImagePosition({ x: group.x() - centerX, y: group.y() - centerY });
    setIsDraggingImage(false);
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    
    if (!imageGroupRef.current) return;
    
    const scaleBy = 1.1;
    const oldScale = imageGroupRef.current.scaleX();
    
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    
    // Limit zoom range (0.1 = 10%, 4 = 400%)
    if (newScale < 0.1 || newScale > 4) return;
    
    imageGroupRef.current.scale({ x: newScale, y: newScale });
  };

  return (
    <div className="canvas-wrapper">
      {showHint && (
        <div className="canvas-hint">
          <span>💡 Drag image to move • Scroll or pinch to zoom</span>
        </div>
      )}
      <Stage 
        width={stageSize.width} 
        height={stageSize.height} 
        ref={stageRef}
        onWheel={handleWheel}
      >
        <Layer>
          {/* Image Layer - Draggable and Scalable */}
          {image && (
            <Group
              ref={imageGroupRef}
              x={centerX + imagePosition.x}
              y={centerY + imagePosition.y}
              offsetX={0}
              offsetY={0}
              rotation={imageRotation}
              scaleX={imageZoom}
              scaleY={imageZoom}
              draggable={true}
              onDragStart={() => setIsDraggingImage(true)}
              onDragEnd={handleImageDragEnd}
            >
              <KonvaImage
                image={image}
                x={-image.width / 2}
                y={-image.height / 2}
                width={image.width}
                height={image.height}
              />
              
              {/* Visual indicator when dragging */}
              {isDraggingImage && (
                <Rect
                  x={-image.width / 2}
                  y={-image.height / 2}
                  width={image.width}
                  height={image.height}
                  stroke="#00d4ff"
                  strokeWidth={3}
                  dash={[10, 5]}
                  listening={false}
                />
              )}
            </Group>
          )}

          {/* Overlay Layer - Sorted by zIndex */}
          {[...overlays]
            .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
            .map(renderOverlay)}
        </Layer>
      </Stage>
    </div>
  );
};

