import { WatchGuide } from '../../types';

interface WatchGuideDetailProps {
  guide: WatchGuide;
}

export const WatchGuideDetail: React.FC<WatchGuideDetailProps> = ({ guide }) => {
  return (
    <div className="watch-guide-detail">
      <div className="guide-header">
        <h3>{guide.brand} {guide.model}</h3>
        <p className="reference-number">{guide.referenceNumber}</p>
      </div>

      <div className="guide-section">
        <h4>Common Factories:</h4>
        <div className="factory-tags">
          {guide.factories.map(factory => (
            <span key={factory} className="factory-tag">{factory}</span>
          ))}
        </div>
      </div>

      <div className="guide-section">
        <h4>Critical Check Points:</h4>
        <ul className="checkpoint-list">
          {guide.criticalCheckPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="guide-section">
        <h4>Known Issues by Factory:</h4>
        {Object.entries(guide.knownIssues).map(([factory, issues]) => (
          <div key={factory} className="factory-issues">
            <strong>{factory}:</strong>
            <ul>
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="guide-section">
        <h4>Acceptable Tolerances:</h4>
        <div className="tolerances-list">
          {Object.entries(guide.tolerances).map(([key, value]) => (
            <div key={key} className="tolerance-item">
              <span className="tolerance-key">{key}:</span>
              <span className="tolerance-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

