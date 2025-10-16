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

export const ExportReport: React.FC<ExportReportProps> = ({
  checklistItems,
  watchModel,
  dealerName,
  factoryName,
  modelName,
  pricePaid,
  albumLinks
}) => {
  const [copied, setCopied] = useState(false);

  const generateReportText = () => {
    const date = new Date().toLocaleString();
    
    let report = `WATCH QC REPORT\n`;
    report += `Generated: ${date}\n`;
    if (watchModel) {
      report += `Model: ${watchModel}\n`;
    }
    report += `\n`;

    // Add optional details if provided
    if (dealerName || factoryName || modelName || pricePaid || albumLinks) {
      if (dealerName) {
        report += `Dealer name: ${dealerName}\n`;
      }
      if (factoryName) {
        report += `Factory name: ${factoryName}\n`;
      }
      if (modelName) {
        report += `Model name (& version number): ${modelName}\n`;
      }
      if (pricePaid) {
        report += `Price Paid: ${pricePaid}\n`;
      }
      if (albumLinks) {
        report += `Album Links: ${albumLinks}\n`;
      }
      report += `\n`;
    }

    checklistItems.forEach((item, index) => {
      report += `${index + 1}. ${item.title}\n`;
      if (item.userNotes) {
        report += `   ${item.userNotes}\n`;
      }
      report += `\n`;
    });

    return report;
  };

  const handleCopyToClipboard = async () => {
    const report = generateReportText();
    
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  const handleExportText = () => {
    const report = generateReportText();

    // Create download
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `watch-qc-report-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-report">
      <button 
        className="export-report-button primary" 
        onClick={handleCopyToClipboard}
      >
        {copied ? 'Copied!' : 'Copy QC Report'}
      </button>
      <button 
        className="export-report-button secondary" 
        onClick={handleExportText}
      >
        Download as TXT
      </button>
      <p className="export-hint">Copy to paste in forums or download as text file</p>
    </div>
  );
};

