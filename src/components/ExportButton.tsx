interface ExportButtonProps {
  onExport: () => void;
  disabled: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport, disabled }) => {
  return (
    <div className="sidebar-section">
      <button 
        className="export-button" 
        onClick={onExport}
        disabled={disabled}
      >
        💾 Export as PNG
      </button>
    </div>
  );
};

