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
            <h4>Your observations: <span className="observations-required">*Required for complete QC</span></h4>
            <textarea
              className={`notes-textarea ${!item.userNotes || item.userNotes.trim().length < 10 ? 'notes-empty' : ''}`}
              value={item.userNotes}
              onChange={(e) => onNotesChange(item.id, e.target.value)}
              placeholder="Be specific! Example: '12 o'clock marker slightly tilted left, 6 o'clock looks centered, all other markers align well with hour grid overlay'"
              rows={4}
            />
            {item.userNotes && item.userNotes.trim().length > 0 && item.userNotes.trim().length < 10 && (
              <p className="notes-warning">⚠️ Too short - add more detail (min 10 characters)</p>
            )}
            {(!item.userNotes || item.userNotes.trim().length === 0) && (
              <p className="notes-help">
                💡 <strong>Tips:</strong> Be specific about what you see. Instead of "looks good", say things like:
                "All markers align with hour grid", "Bezel pip centered at 12 o'clock", or "6 o'clock marker 1-2° off"
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

