import { WatchGuide } from '../../types';

interface WatchGuideSelectorProps {
  guides: WatchGuide[];
  selectedGuideId: string | null;
  onSelectGuide: (id: string | null) => void;
}

export const WatchGuideSelector: React.FC<WatchGuideSelectorProps> = ({
  guides,
  selectedGuideId,
  onSelectGuide
}) => {
  return (
    <div className="watch-guide-selector">
      <label className="selector-label">Select your watch model (optional):</label>
      <select
        className="guide-select"
        value={selectedGuideId || ''}
        onChange={(e) => onSelectGuide(e.target.value || null)}
      >
        <option value="">Generic Checklist</option>
        {guides.map(guide => (
          <option key={guide.id} value={guide.id}>
            {guide.brand} {guide.model} ({guide.referenceNumber})
          </option>
        ))}
      </select>
    </div>
  );
};

