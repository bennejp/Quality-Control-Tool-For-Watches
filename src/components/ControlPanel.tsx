import { useState, useEffect } from 'react';
import { OverlayConfig } from '../types';

interface ControlPanelProps {
  imageZoom: number;
  imageRotation: number;
  onImageZoomChange: (zoom: number) => void;
  onImageRotationChange: (rotation: number) => void;
  overlays: OverlayConfig[];
  onOverlayToggle: (id: string) => void;
  onOverlayChange: (id: string, property: keyof OverlayConfig, value: number | string) => void;
  onBringToFront: (id: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  imageZoom,
  imageRotation,
  onImageZoomChange,
  onImageRotationChange,
  overlays,
  onOverlayToggle,
  onOverlayChange,
  onBringToFront,
}) => {
  // Track overlay rotation input values separately for better editing experience
  const [overlayRotationInputs, setOverlayRotationInputs] = useState<Record<string, string>>({});

  // Initialize rotation inputs when overlays change
  useEffect(() => {
    const inputs: Record<string, string> = {};
    overlays.forEach(overlay => {
      inputs[overlay.id] = (Math.round(overlay.rotation * 10) / 10).toString();
    });
    setOverlayRotationInputs(inputs);
  }, [overlays.length]); // Only run when overlay count changes
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentValue: number,
    min: number,
    max: number,
    step: number,
    onChange: (value: number) => void
  ) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const newValue = Math.max(min, currentValue - step);
      onChange(newValue);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const newValue = Math.min(max, currentValue + step);
      onChange(newValue);
    }
  };

  return (
    <>
      <div className="sidebar-section">
        <h2>Image Controls</h2>
        
        <div className="control-group">
          <label className="control-label">
            Zoom
            <span className="control-value">{Math.round(imageZoom * 100)}%</span>
          </label>
          <input
            type="range"
            min="0.1"
            max="4"
            step="0.1"
            value={imageZoom}
            onChange={(e) => onImageZoomChange(parseFloat(e.target.value))}
            onKeyDown={(e) => handleKeyDown(e, imageZoom, 0.1, 4, 0.1, onImageZoomChange)}
            className="slider"
          />
        </div>

        <div className="control-group">
          <label className="control-label">
            Rotation
            <span className="control-value">{imageRotation.toFixed(1)}°</span>
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            step="0.1"
            value={imageRotation}
            onChange={(e) => onImageRotationChange(parseFloat(e.target.value))}
            onKeyDown={(e) => handleKeyDown(e, imageRotation, -180, 180, 0.1, onImageRotationChange)}
            className="slider"
          />
        </div>
      </div>

      <div className="sidebar-section">
        <h2>Overlays</h2>
        
        {overlays.map((overlay) => (
          <div key={overlay.id}>
            <div className="checkbox-group" onClick={() => onOverlayToggle(overlay.id)}>
              <input
                type="checkbox"
                checked={overlay.enabled}
                onChange={(e) => {
                  e.stopPropagation();
                  onOverlayToggle(overlay.id);
                }}
              />
              <label>{overlay.name}</label>
              <button
                className={`bring-to-front-btn ${overlay.enabled ? 'visible' : 'hidden'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (overlay.enabled) {
                    onBringToFront(overlay.id);
                  }
                }}
                title="Bring to front"
                disabled={!overlay.enabled}
              >
                ↑
              </button>
            </div>
            
            {overlay.enabled && (
              <div className="overlay-controls active">
                <div className="control-group">
                  <label className="control-label">
                    Size
                    <span className="control-value">{overlay.size}</span>
                  </label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="5"
                      value={overlay.size}
                      onChange={(e) => onOverlayChange(overlay.id, 'size', parseInt(e.target.value))}
                      onKeyDown={(e) => handleKeyDown(e, overlay.size, 50, 500, 5, (val) => onOverlayChange(overlay.id, 'size', val))}
                      className="slider"
                    />
                </div>

                <div className="control-group">
                  <label className="control-label">
                    Rotation
                    <input
                      type="text"
                      className="control-value-input"
                      value={overlayRotationInputs[overlay.id] ?? overlay.rotation.toFixed(1)}
                      onChange={(e) => {
                        // Allow any input while typing
                        setOverlayRotationInputs(prev => ({
                          ...prev,
                          [overlay.id]: e.target.value
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = parseFloat(overlayRotationInputs[overlay.id] || '0');
                          if (!isNaN(val)) {
                            const clampedVal = Math.max(-180, Math.min(180, val));
                            onOverlayChange(overlay.id, 'rotation', clampedVal);
                            setOverlayRotationInputs(prev => ({
                              ...prev,
                              [overlay.id]: clampedVal.toFixed(1)
                            }));
                          }
                        }
                      }}
                      onBlur={() => {
                        // Apply value on blur
                        const val = parseFloat(overlayRotationInputs[overlay.id] || '0');
                        if (!isNaN(val)) {
                          const clampedVal = Math.max(-180, Math.min(180, val));
                          onOverlayChange(overlay.id, 'rotation', clampedVal);
                          setOverlayRotationInputs(prev => ({
                            ...prev,
                            [overlay.id]: clampedVal.toFixed(1)
                          }));
                        } else {
                          // Reset to current value if invalid
                          setOverlayRotationInputs(prev => ({
                            ...prev,
                            [overlay.id]: overlay.rotation.toFixed(1)
                          }));
                        }
                      }}
                      placeholder="0.0"
                    />
                    <span className="control-unit">°</span>
                  </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="0.1"
                      value={overlay.rotation}
                      onChange={(e) => {
                        const newVal = parseFloat(e.target.value);
                        onOverlayChange(overlay.id, 'rotation', newVal);
                        setOverlayRotationInputs(prev => ({
                          ...prev,
                          [overlay.id]: newVal.toFixed(1)
                        }));
                      }}
                      onKeyDown={(e) => handleKeyDown(e, overlay.rotation, -180, 180, 1, (val) => onOverlayChange(overlay.id, 'rotation', val))}
                      className="slider"
                    />
                </div>

                <div className="control-group">
                  <label className="control-label">
                    Opacity
                    <span className="control-value">{Math.round(overlay.opacity * 100)}%</span>
                  </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={overlay.opacity}
                      onChange={(e) => onOverlayChange(overlay.id, 'opacity', parseFloat(e.target.value))}
                      onKeyDown={(e) => handleKeyDown(e, overlay.opacity, 0, 1, 0.05, (val) => onOverlayChange(overlay.id, 'opacity', val))}
                      className="slider"
                    />
                </div>

                <div className="control-group">
                  <label className="control-label">Color</label>
                  <input
                    type="color"
                    value={overlay.color}
                    onChange={(e) => onOverlayChange(overlay.id, 'color', e.target.value)}
                    className="color-picker"
                  />
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

