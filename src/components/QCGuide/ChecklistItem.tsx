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
          onClick={(e) => e.stopPropagation()}
          className="checklist-checkbox"
        />
        <span className="checklist-title">{item.title}</span>
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
              Use Recommended Overlay
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

