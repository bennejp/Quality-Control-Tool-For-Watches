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
    let report = `## QC Request\n\n`;
    
    // Required fields
    report += `**Dealer name:** ${dealerName || '[MISSING]'}\n\n`;
    report += `**Factory name:** ${factoryName || '[MISSING]'}\n\n`;
    report += `**Model name:** ${modelName || '[MISSING]'}\n\n`;
    report += `**Price paid:** ${pricePaid || '[MISSING]'}\n\n`;
    report += `**Album Links:** ${albumLinks || '[MISSING]'}\n\n`;
    
    report += `---\n\n`;
    
    // QC observations - only include items with actual notes
    const itemsWithContent = checklistItems.filter(item => 
      item.userNotes && item.userNotes.trim().length > 0
    );
    
    if (itemsWithContent.length > 0) {
      itemsWithContent.forEach((item) => {
        const isGeneric = isGenericResponse(item.userNotes);
        report += `**${item.title}:** ${item.userNotes.trim()}`;
        if (isGeneric) {
          report += ` *(Note: Consider adding more specific details)*`;
        }
        report += `\n\n`;
      });
    } else {
      report += `*[No QC observations added]*\n\n`;
    }
    
    report += `---\n\n`;
    report += `*QC template generated with [Watch QC Tool](https://bennejp.github.io/Quality-Control-Tool-For-Watches/)*`;

    return report;
  };

  const handleExport = () => {
    const score = getCompletionScore();
    const missingFields = getMissingRequiredFields();

    // Block if critical requirements not met
    if (missingFields.length > 0 || score < 60) {
      setShowValidation(true);
      return;
    }

    const report = generateRedditPost();

    // Copy to clipboard
    navigator.clipboard.writeText(report).then(() => {
      alert('✅ QC post copied to clipboard!\n\nNext steps:\n1. Go to r/RepTimeQC\n2. Create a new post\n3. Paste (Ctrl+V)\n4. Upload your QC images\n5. Submit');
    }).catch(() => {
      // Fallback: just download
      alert('✅ QC post downloaded!\n\nOpen the file and copy the contents to your Reddit post.');
    });

    // Also download as backup
    downloadAsFile(report);
  };

  const downloadAsFile = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reptime-qc-post-${Date.now()}.txt`;
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
      {/* Completion Score */}
      <div className="completion-score">
        <div className="score-header">
          <span className="score-label">Post Quality Score</span>
          <span className={`score-value ${isComplete ? 'complete' : isAcceptable ? 'acceptable' : 'incomplete'}`}>
            {score}%
          </span>
        </div>
        <div className="score-bar">
          <div 
            className={`score-fill ${isComplete ? 'complete' : isAcceptable ? 'acceptable' : 'incomplete'}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="score-description">
          {isComplete && '✓ Excellent! Ready to post'}
          {!isComplete && isAcceptable && '⚠️ Acceptable, but could be more detailed'}
          {!isAcceptable && '❌ Needs more work to meet r/RepTime standards'}
        </div>
      </div>

      {/* Quality Issues List */}
      {(missingFields.length > 0 || itemsWithoutNotes.length > 0 || genericItems.length > 0) && (
        <div className="quality-issues">
          <h4>📋 Quality Checklist</h4>
          
          {missingFields.length > 0 && (
            <div className="issue-section error">
              <strong>❌ Missing Required Fields ({missingFields.length}):</strong>
              <ul>
                {missingFields.map((field, i) => (
                  <li key={i}>{field}</li>
                ))}
              </ul>
            </div>
          )}

          {itemsWithoutNotes.length > 0 && (
            <div className="issue-section warning">
              <strong>⚠️ Items Without Notes ({itemsWithoutNotes.length}/{checklistItems.length}):</strong>
              <ul>
                {itemsWithoutNotes.slice(0, 3).map((item, i) => (
                  <li key={i}>{item.title}</li>
                ))}
                {itemsWithoutNotes.length > 3 && <li>...and {itemsWithoutNotes.length - 3} more</li>}
              </ul>
              <p className="issue-tip">💡 Add specific observations for each item you check</p>
            </div>
          )}

          {genericItems.length > 0 && (
            <div className="issue-section warning">
              <strong>⚠️ Generic Responses Detected ({genericItems.length}):</strong>
              <ul>
                {genericItems.slice(0, 3).map((item, i) => (
                  <li key={i}>{item.title}: "{item.userNotes}"</li>
                ))}
              </ul>
              <p className="issue-tip">
                💡 Instead of "looks good", be specific: "12 o'clock marker slightly tilted right" or "All markers align well with hour grid"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Validation Modal */}
      {showValidation && (
        <div className="validation-modal">
          <div className="validation-content">
            <h3>⚠️ Post Quality Too Low</h3>
            <p>Your QC post does not meet r/RepTime minimum standards and <strong>may be removed by moderators</strong>.</p>
            
            <div className="validation-requirements">
              <h4>Required to Export:</h4>
              <ul>
                <li className={missingFields.length === 0 ? 'met' : 'unmet'}>
                  {missingFields.length === 0 ? '✓' : '❌'} All required fields (Dealer, Factory, Model, Price, Album)
                </li>
                <li className={score >= 60 ? 'met' : 'unmet'}>
                  {score >= 60 ? '✓' : '❌'} At least 60% completion score (currently {score}%)
                </li>
                <li className={itemsWithoutNotes.length <= 4 ? 'met' : 'unmet'}>
                  {itemsWithoutNotes.length <= 4 ? '✓' : '❌'} Notes for most checklist items
                </li>
              </ul>
            </div>

            <p className="validation-advice">
              <strong>What makes a good QC post:</strong><br/>
              • Specific observations (e.g., "6 o'clock marker tilted 2° left")<br/>
              • Actual issues found (or confirm nothing found)<br/>
              • Reference to images (e.g., "In photo 3, the bezel pip...")<br/>
              • NOT generic phrases like "looks good" or "GL"
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
            <h3>📄 Preview Your Post</h3>
            <div className="preview-box">
              <pre>{generateRedditPost()}</pre>
            </div>
            <p className="preview-tip">This is how your post will appear on Reddit (with markdown formatting)</p>
            <div className="validation-actions">
              <button 
                className="validation-button-primary"
                onClick={() => {
                  setShowPreview(false);
                  handleExport();
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
          disabled={!isAcceptable}
        >
          Preview Post
        </button>
        
        <button 
          className={`export-report-button ${isComplete ? 'ready' : isAcceptable ? 'acceptable' : 'not-ready'}`}
          onClick={handleExport}
        >
          {isComplete && '✓ Export QC Post'}
          {!isComplete && isAcceptable && '⚠️ Export Post (Could Be Better)'}
          {!isAcceptable && '❌ Cannot Export Yet'}
        </button>
      </div>
      
      <p className="export-hint">
        {isComplete && 'Copies to clipboard in Reddit format, ready to paste'}
        {!isComplete && isAcceptable && `${score}% - Consider adding more detail for better feedback`}
        {!isAcceptable && `${score}% - Fill required fields and add observations`}
      </p>
    </div>
  );
};

