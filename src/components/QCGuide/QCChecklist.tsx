import { ChecklistItem as ChecklistItemType } from '../../types';
import { ChecklistItem } from './ChecklistItem';

interface QCChecklistProps {
  items: ChecklistItemType[];
  onToggleItem: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onUseOverlay?: (overlayId: string) => void;
}

export const QCChecklist: React.FC<QCChecklistProps> = ({
  items,
  onToggleItem,
  onUpdateNotes,
  onUseOverlay
}) => {
  const completedCount = items.filter(item => item.checked).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="qc-checklist">
      <div className="checklist-progress">
        <div className="progress-text">
          {completedCount} / {items.length} checks complete
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="checklist-items">
        {items.map(item => (
          <ChecklistItem
            key={item.id}
            item={item}
            onToggle={onToggleItem}
            onNotesChange={onUpdateNotes}
            onUseOverlay={onUseOverlay}
          />
        ))}
      </div>
    </div>
  );
};

