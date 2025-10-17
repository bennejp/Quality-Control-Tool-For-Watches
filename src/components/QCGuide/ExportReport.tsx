import { useState } from 'react';
import { ChecklistItem } from '../../types';

interface ExportReportProps {
  checklistItems: ChecklistItem[];
  watchModel: string | null;
  dealerName: string;
  factoryName: string;
  modelName: string;
  pricePaid: string;
  albumLinks: string;
}

// Generic/low-effort phrases to detect
const GENERIC_PHRASES = [
  'looks good', 'looks fine', 'seems good', 'seems fine', 'ok', 'okay',
  'gl', 'rl', 'everything fine', 'all good', 'no issues', 'perfect',
  'great', 'nice', 'good', 'fine', 'looks ok'
];

export const ExportReport: React.FC<ExportReportProps> = ({
  checklistItems,
  // watchModel is kept in props for potential future use
  dealerName,
  factoryName,
  modelName,
  pricePaid,
  albumLinks
}) => {
  const [showValidation, setShowValidation] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isForReddit, setIsForReddit] = useState(true);

  // Detect generic/lazy responses
  const isGenericResponse = (text: string): boolean => {
    if (!text || text.trim().length < 10) return true;
    const lowerText = text.toLowerCase().trim();
    return GENERIC_PHRASES.some(phrase => lowerText === phrase || lowerText === phrase + '.');
  };

  // Calculate quality metrics
  const getMissingRequiredFields = () => {
    const missing: string[] = [];
    if (!dealerName.trim()) missing.push('Dealer name');
    if (!factoryName.trim()) missing.push('Factory name');
    if (!modelName.trim()) missing.push('Model name');
    if (!pricePaid.trim()) missing.push('Price Paid');
    if (!albumLinks.trim()) missing.push('Album Links');
    return missing;
  };

  const getItemsWithoutNotes = () => {
    return checklistItems.filter(item => !item.userNotes || item.userNotes.trim().length < 3);
  };

  const getItemsWithGenericNotes = () => {
    return checklistItems.filter(item => 
      item.userNotes && item.userNotes.trim().length > 0 && isGenericResponse(item.userNotes)
    );
  };

  const getCompletionScore = () => {
    const totalRequiredFields = 5;
    const filledFields = totalRequiredFields - getMissingRequiredFields().length;
    
    const totalItems = checklistItems.length;
    const itemsWithNotes = checklistItems.filter(item => 
      item.userNotes && item.userNotes.trim().length >= 10
    ).length;
    
    // Penalize generic responses
    const genericItems = getItemsWithGenericNotes().length;
    const qualityItems = itemsWithNotes - genericItems;
    
    // Weight: 40% required fields, 60% quality checklist notes
    const fieldScore = (filledFields / totalRequiredFields) * 40;
    const notesScore = Math.max(0, (qualityItems / totalItems) * 60);
    
    return Math.round(fieldScore + notesScore);
  };

  const generateRedditPost = () => {
    let report = '';
    let lineNumber = 1;
    
    // Required fields
    report += `${lineNumber++}. Dealer name: ${dealerName || ''}\n\n`;
    report += `${lineNumber++}. Factory name: ${factoryName || ''}\n\n`;
    report += `${lineNumber++}. Model name (& version number): ${modelName || ''}\n\n`;
    report += `${lineNumber++}. Price Paid: ${pricePaid || ''}\n\n`;
    report += `${lineNumber++}. Album Links: ${albumLinks || ''}\n\n`;
    
    // QC checklist items
    checklistItems.forEach((item) => {
      const notes = item.userNotes && item.userNotes.trim() ? item.userNotes.trim() : '';
      report += `${lineNumber++}. ${item.title}: ${notes}\n\n`;
    });

    return report.trim();
  };

  const generateSimpleText = () => {
    let report = '';
    let lineNumber = 1;
    
    // Required fields
    report += `${lineNumber++}. Dealer name: ${dealerName || ''}\n\n`;
    report += `${lineNumber++}. Factory name: ${factoryName || ''}\n\n`;
    report += `${lineNumber++}. Model name (& version number): ${modelName || ''}\n\n`;
    report += `${lineNumber++}. Price Paid: ${pricePaid || ''}\n\n`;
    report += `${lineNumber++}. Album Links: ${albumLinks || ''}\n\n`;
    
    // QC checklist items
    checklistItems.forEach((item) => {
      const notes = item.userNotes && item.userNotes.trim() ? item.userNotes.trim() : '';
      report += `${lineNumber++}. ${item.title}: ${notes}\n\n`;
    });

    return report.trim();
  };

  const handleExportReddit = () => {
    const score = getCompletionScore();
    const missingFields = getMissingRequiredFields();

    // Only enforce strict requirements if posting to Reddit
    if (isForReddit && (missingFields.length > 0 || score < 60)) {
      setShowValidation(true);
      return;
    }

    const report = isForReddit ? generateRedditPost() : generateSimpleText();
    const filename = isForReddit ? 'reptime-qc-post' : 'watch-qc-report';

    // Copy to clipboard
    navigator.clipboard.writeText(report).then(() => {
      if (isForReddit) {
        alert('QC post copied to clipboard!\n\nNext steps:\n1. Go to r/RepTimeQC\n2. Create a new post\n3. Paste (Ctrl+V)\n4. Upload your QC images\n5. Submit');
      } else {
        alert('QC report copied to clipboard!\n\nYour report has been copied and downloaded for your records.');
      }
    }).catch(() => {
      // Fallback: just download
      alert('Report downloaded!\n\nOpen the file to view your QC report.');
    });

    // Also download as backup
    downloadAsFile(report, filename);
  };

  const handleCopyToClipboard = () => {
    const report = isForReddit ? generateRedditPost() : generateSimpleText();
    
    navigator.clipboard.writeText(report).then(() => {
      alert('Copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy. Please use the export button to download instead.');
    });
  };

  const downloadAsFile = (content: string, prefix: string = 'report') => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prefix}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const missingFields = getMissingRequiredFields();
  const itemsWithoutNotes = getItemsWithoutNotes();
  const genericItems = getItemsWithGenericNotes();
  const score = getCompletionScore();
  
  const isComplete = score >= 80;
  const isAcceptable = score >= 60;

  return (
    <div className="export-report">
      {/* Reddit Toggle */}
      <div className="reddit-toggle-section">
        <label className="reddit-toggle-label">
          <input
            type="checkbox"
            checked={isForReddit}
            onChange={(e) => setIsForReddit(e.target.checked)}
            className="reddit-toggle-checkbox"
          />
          <span className="reddit-toggle-text">
            Posting to r/RepTimeQC {isForReddit && <span className="reddit-badge">Strict Mode</span>}
          </span>
        </label>
        {!isForReddit && (
          <p className="reddit-toggle-hint">
            Relaxed mode - Quality checks are optional for personal use
          </p>
        )}
      </div>


      {/* Quality Issues List */}
      {isForReddit && (missingFields.length > 0 || itemsWithoutNotes.length > 0 || genericItems.length > 0) && (
        <div className="quality-issues">
          <h4>Quality Checklist</h4>
          
          {missingFields.length > 0 && (
            <div className="issue-section error">
              <strong>Missing Required Fields ({missingFields.length}):</strong>
              <ul>
                {missingFields.map((field, i) => (
                  <li key={i}>{field}</li>
                ))}
              </ul>
            </div>
          )}

          {itemsWithoutNotes.length > 0 && (
            <div className="issue-section warning">
              <strong>Items Without Notes ({itemsWithoutNotes.length}/{checklistItems.length}):</strong>
              <ul>
                {itemsWithoutNotes.slice(0, 3).map((item, i) => (
                  <li key={i}>{item.title}</li>
                ))}
                {itemsWithoutNotes.length > 3 && <li>...and {itemsWithoutNotes.length - 3} more</li>}
              </ul>
              <p className="issue-tip">Tip: Add specific observations for each item you check</p>
            </div>
          )}

          {genericItems.length > 0 && (
            <div className="issue-section warning">
              <strong>Generic Responses Detected ({genericItems.length}):</strong>
              <ul>
                {genericItems.slice(0, 3).map((item, i) => (
                  <li key={i}>{item.title}: "{item.userNotes}"</li>
                ))}
              </ul>
              <p className="issue-tip">
                Tip: Instead of "looks good", be specific: "12 o'clock marker slightly tilted right" or "All markers align well with hour grid"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Validation Modal */}
      {isForReddit && showValidation && (
        <div className="validation-modal">
          <div className="validation-content">
            <h3>Post Quality Too Low</h3>
            <p>Your QC post does not meet r/RepTime minimum standards and <strong>may be removed by moderators</strong>.</p>
            
            <div className="validation-requirements">
              <h4>Required to Export:</h4>
              <ul>
                <li className={missingFields.length === 0 ? 'met' : 'unmet'}>
                  {missingFields.length === 0 ? 'PASS' : 'FAIL'} - All required fields (Dealer, Factory, Model, Price, Album)
                </li>
                <li className={score >= 60 ? 'met' : 'unmet'}>
                  {score >= 60 ? 'PASS' : 'FAIL'} - At least 60% completion score (currently {score}%)
                </li>
                <li className={itemsWithoutNotes.length <= 4 ? 'met' : 'unmet'}>
                  {itemsWithoutNotes.length <= 4 ? 'PASS' : 'FAIL'} - Notes for most checklist items
                </li>
              </ul>
            </div>

            <p className="validation-advice">
              <strong>What makes a good QC post:</strong><br/>
              - Specific observations (e.g., "6 o'clock marker tilted 2 degrees left")<br/>
              - Actual issues found (or confirm nothing found)<br/>
              - Reference to images (e.g., "In photo 3, the bezel pip...")<br/>
              - NOT generic phrases like "looks good" or "GL"
            </p>

            <div className="validation-actions">
              <button 
                className="validation-button-primary"
                onClick={() => setShowValidation(false)}
              >
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="validation-modal">
          <div className="validation-content preview-content">
            <h3>Preview Your {isForReddit ? 'Post' : 'Report'}</h3>
            <div className="preview-box">
              <pre>{isForReddit ? generateRedditPost() : generateSimpleText()}</pre>
            </div>
            <p className="preview-tip">
              {isForReddit 
                ? 'This is how your post will appear on Reddit (simple numbered list format)'
                : 'This is your QC report in plain text format'
              }
            </p>
            <div className="validation-actions">
              <button 
                className="validation-button-primary"
                onClick={() => {
                  setShowPreview(false);
                  handleExportReddit();
                }}
              >
                Looks Good - Export Now
              </button>
              <button 
                className="validation-button-secondary"
                onClick={() => setShowPreview(false)}
              >
                Back to Editing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Buttons */}
      <div className="export-actions">
        <button 
          className="preview-button"
          onClick={() => setShowPreview(true)}
          disabled={isForReddit && !isAcceptable}
        >
          {isForReddit ? 'Preview Post' : 'Preview Report'}
        </button>
        
        <button 
          className="copy-button"
          onClick={handleCopyToClipboard}
        >
          Copy to Clipboard
        </button>
      </div>

      <div className="export-actions">
        <button 
          className={`export-report-button full-width ${
            isForReddit 
              ? (isComplete ? 'ready' : isAcceptable ? 'acceptable' : 'not-ready')
              : 'ready'
          }`}
          onClick={handleExportReddit}
        >
          {isForReddit ? (
            <>
              {isComplete && 'Export QC Post'}
              {!isComplete && isAcceptable && 'Export Post (Could Be Better)'}
              {!isAcceptable && 'Cannot Export Yet'}
            </>
          ) : (
            'Export QC Report'
          )}
        </button>
      </div>
      
      <p className="export-hint">
        {isForReddit ? (
          <>
            {isComplete && 'Copies to clipboard in Reddit format, ready to paste'}
            {!isComplete && isAcceptable && `${score}% - Consider adding more detail for better feedback`}
            {!isAcceptable && `${score}% - Fill required fields and add observations`}
          </>
        ) : (
          'Exports as plain text file and copies to clipboard - no restrictions'
        )}
      </p>
    </div>
  );
};

