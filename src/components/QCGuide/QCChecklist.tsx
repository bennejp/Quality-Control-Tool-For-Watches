import { ChecklistItem as ChecklistItemType } from '../../types';
import { ChecklistItem } from './ChecklistItem';

interface QCChecklistProps {
  items: ChecklistItemType[];
  onToggleItem: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onUseOverlay?: (overlayId: string) => void;
  dealerName: string;
  factoryName: string;
  modelName: string;
  pricePaid: string;
  albumLinks: string;
  onDealerNameChange: (value: string) => void;
  onFactoryNameChange: (value: string) => void;
  onModelNameChange: (value: string) => void;
  onPricePaidChange: (value: string) => void;
  onAlbumLinksChange: (value: string) => void;
}

export const QCChecklist: React.FC<QCChecklistProps> = ({
  items,
  onToggleItem,
  onUpdateNotes,
  onUseOverlay,
  dealerName,
  factoryName,
  modelName,
  pricePaid,
  albumLinks,
  onDealerNameChange,
  onFactoryNameChange,
  onModelNameChange,
  onPricePaidChange,
  onAlbumLinksChange
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

      <div className="qc-details-form">
        <h3>Optional Details</h3>
        <div className="form-field">
          <label>Dealer name:</label>
          <input
            type="text"
            value={dealerName}
            onChange={(e) => onDealerNameChange(e.target.value)}
            placeholder="Enter dealer name"
          />
        </div>
        <div className="form-field">
          <label>Factory name:</label>
          <input
            type="text"
            value={factoryName}
            onChange={(e) => onFactoryNameChange(e.target.value)}
            placeholder="Enter factory name"
          />
        </div>
        <div className="form-field">
          <label>Model name (& version number):</label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => onModelNameChange(e.target.value)}
            placeholder="Enter model name and version"
          />
        </div>
        <div className="form-field">
          <label>Price Paid:</label>
          <input
            type="text"
            value={pricePaid}
            onChange={(e) => onPricePaidChange(e.target.value)}
            placeholder="Enter price paid"
          />
        </div>
        <div className="form-field">
          <label>Album Links:</label>
          <input
            type="text"
            value={albumLinks}
            onChange={(e) => onAlbumLinksChange(e.target.value)}
            placeholder="Enter album links"
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

