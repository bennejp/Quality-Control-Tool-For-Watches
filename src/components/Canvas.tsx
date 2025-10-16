import { useRef, useEffect, useState } from 'react';
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
}

export const Canvas: React.FC<CanvasProps> = ({
  imageSrc,
  imageZoom,
  imageRotation,
  overlays,
  stageRef,
  onOverlayPositionChange,
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (imageSrc) {
      const img = new window.Image();
      img.src = imageSrc;
      img.onload = () => {
        setImage(img);
      };
    } else {
      setImage(null);
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

  const renderOverlay = (overlay: OverlayConfig) => {
    if (!overlay.enabled) return null;

    // Overlay components draw relative to (0, 0) since they're inside a positioned Group
    const props = {
      size: overlay.size,
      color: overlay.color,
      opacity: overlay.opacity,
      rotation: overlay.rotation,
    };

    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
      if (onOverlayPositionChange) {
        // Get the Group's position, not the target
        const group = e.currentTarget;
        onOverlayPositionChange(overlay.id, group.x(), group.y());
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
        x={overlay.x}
        y={overlay.y}
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

  return (
    <div className="canvas-wrapper">
      <Stage width={stageSize.width} height={stageSize.height} ref={stageRef}>
        <Layer>
          {/* Image Layer */}
          {image && (
            <Group
              x={centerX}
              y={centerY}
              offsetX={0}
              offsetY={0}
              rotation={imageRotation}
              scaleX={imageZoom}
              scaleY={imageZoom}
            >
              <KonvaImage
                image={image}
                x={-image.width / 2}
                y={-image.height / 2}
                width={image.width}
                height={image.height}
              />
            </Group>
          )}

          {/* Overlay Layer */}
          {overlays.map(renderOverlay)}
        </Layer>
      </Stage>
    </div>
  );
};

