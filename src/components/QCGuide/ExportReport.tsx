import { ChecklistItem } from '../../types';

interface ExportReportProps {
  checklistItems: ChecklistItem[];
  watchModel: string | null;
}

export const ExportReport: React.FC<ExportReportProps> = ({
  checklistItems,
  watchModel
}) => {
  const handleExportText = () => {
    const date = new Date().toLocaleString();
    
    let report = `WATCH QC REPORT\n`;
    report += `Generated: ${date}\n`;
    if (watchModel) {
      report += `Model: ${watchModel}\n`;
    }
    report += `\n`;

    checklistItems.forEach(item => {
      report += `${item.checked ? '✓' : '☐'} ${item.title}\n`;
      if (item.userNotes) {
        report += `   Notes: ${item.userNotes}\n`;
      }
      report += `\n`;
    });

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
      <button className="export-report-button" onClick={handleExportText}>
        Export QC Report
      </button>
      <p className="export-hint">Export checklist with your notes as a text file</p>
    </div>
  );
};

