import { useState } from 'react';
import { ChecklistItem as ChecklistItemType } from '../../types';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
  onNotesChange: (id: string, notes: string) => void;
  onUseOverlay?: (overlayId: string) => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  onToggle,
  onNotesChange,
  onUseOverlay
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff4444';
      case 'important': return '#ff8800';
      case 'optional': return '#888888';
      default: return '#888888';
    }
  };

  return (
    <div className="checklist-item">
      <div className="checklist-header" onClick={() => setIsExpanded(!isExpanded)}>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={(e) => {
            e.stopPropagation();
            onToggle(item.id);
          }}
          className="checklist-checkbox"
        />
        <div className="checklist-title-wrapper">
          <span className="checklist-title">{item.title}</span>
          <span 
            className="severity-badge" 
            style={{ backgroundColor: getSeverityColor(item.severity) }}
          >
            {item.severity}
          </span>
        </div>
        <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
      </div>

      {isExpanded && (
        <div className="checklist-details">
          <div className="detail-section">
            <h4>What to check:</h4>
            <p>{item.description}</p>
          </div>

          <div className="detail-section">
            <h4>How to check:</h4>
            <p>{item.howToCheck}</p>
          </div>

          {item.recommendedOverlay && onUseOverlay && (
            <button 
              className="use-overlay-button"
              onClick={() => onUseOverlay(item.recommendedOverlay!)}
            >
              📐 Use Recommended Overlay
            </button>
          )}

          <div className="detail-section">
            <h4>Common issues:</h4>
            <ul className="issues-list">
              {item.commonIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Your notes:</h4>
            <textarea
              className="notes-textarea"
              value={item.userNotes}
              onChange={(e) => onNotesChange(item.id, e.target.value)}
              placeholder="Add your observations..."
              rows={3}
            />
          </div>
        </div>
      )}
    </div>
  );
};

