import { ChecklistItem as ChecklistItemType } from '../../types';
import { ChecklistItem } from './ChecklistItem';

interface QCChecklistProps {
  items: ChecklistItemType[];
  onToggleItem: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
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
        <h3>Required Information <span className="required-badge">*Required for r/RepTime</span></h3>
        <div className="form-field">
          <label>
            Dealer name: <span className="required-star">*</span>
            {!dealerName && <span className="field-warning">Missing</span>}
          </label>
          <input
            type="text"
            value={dealerName}
            onChange={(e) => onDealerNameChange(e.target.value)}
            placeholder="e.g., Hont, Geektime, JTime"
            className={!dealerName ? 'required-empty' : ''}
          />
        </div>
        <div className="form-field">
          <label>
            Factory name: <span className="required-star">*</span>
            {!factoryName && <span className="field-warning">Missing</span>}
          </label>
          <input
            type="text"
            value={factoryName}
            onChange={(e) => onFactoryNameChange(e.target.value)}
            placeholder="e.g., Clean, VSF, ZF, CF"
            className={!factoryName ? 'required-empty' : ''}
          />
        </div>
        <div className="form-field">
          <label>
            Model name (& version number): <span className="required-star">*</span>
            {!modelName && <span className="field-warning">Missing</span>}
          </label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => onModelNameChange(e.target.value)}
            placeholder="e.g., Submariner 116610 LN, Datejust 41"
            className={!modelName ? 'required-empty' : ''}
          />
        </div>
        <div className="form-field">
          <label>
            Price Paid: <span className="required-star">*</span>
            {!pricePaid && <span className="field-warning">Missing</span>}
          </label>
          <input
            type="text"
            value={pricePaid}
            onChange={(e) => onPricePaidChange(e.target.value)}
            placeholder="e.g., $488 USD"
            className={!pricePaid ? 'required-empty' : ''}
          />
        </div>
        <div className="form-field">
          <label>
            Album Links: <span className="required-star">*</span>
            {!albumLinks && <span className="field-warning">Missing</span>}
          </label>
          <input
            type="text"
            value={albumLinks}
            onChange={(e) => onAlbumLinksChange(e.target.value)}
            placeholder="Imgur or other image hosting link"
            className={!albumLinks ? 'required-empty' : ''}
          />
          <p className="field-help">💡 Upload QC photos to Imgur, paste link here</p>
        </div>
      </div>

      <div className="checklist-items">
        {items.map(item => (
          <ChecklistItem
            key={item.id}
            item={item}
            onToggle={onToggleItem}
            onNotesChange={onUpdateNotes}
          />
        ))}
      </div>
    </div>
  );
};

