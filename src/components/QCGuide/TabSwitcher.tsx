interface TabSwitcherProps {
  activeTab: 'controls' | 'qc-guide';
  onTabChange: (tab: 'controls' | 'qc-guide') => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-switcher">
      <button
        className={`tab-button ${activeTab === 'controls' ? 'active' : ''}`}
        onClick={() => onTabChange('controls')}
      >
        ⚙️ Controls
      </button>
      <button
        className={`tab-button ${activeTab === 'qc-guide' ? 'active' : ''}`}
        onClick={() => onTabChange('qc-guide')}
      >
        ✓ QC Guide
      </button>
    </div>
  );
};

