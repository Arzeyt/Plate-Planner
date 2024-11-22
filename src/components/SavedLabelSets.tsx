import React, { useState } from 'react';
import { SavedLabelSet, WellLabel, Well } from '../types/types';
import './SavedLabelSets.css';

interface SavedLabelSetsProps {
  currentLabels: WellLabel[];
  currentWells: Well[];
  onLoadConfiguration: (config: { labels: WellLabel[], wells: Well[] }) => void;
}

const SavedLabelSets: React.FC<SavedLabelSetsProps> = ({
  currentLabels,
  currentWells,
  onLoadConfiguration,
}) => {
  const [newSetName, setNewSetName] = useState('');

  const handleSaveSet = () => {
    if (currentLabels.length === 0) {
      alert('Please create some labels before saving');
      return;
    }
    
    if (!newSetName.trim()) {
      alert('Please enter a name for this configuration');
      return;
    }

    const configData = {
      id: Date.now().toString(),
      name: newSetName.trim(),
      labels: currentLabels,
      wells: currentWells,
      createdAt: new Date().toISOString()
    };

    // Create a Blob with the configuration data
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${newSetName.trim().replace(/[^a-z0-9]/gi, '_').toLowerCase()}_plate_config.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setNewSetName('');
  };

  const handleLoadSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        if (currentLabels.length > 0 || currentWells.some(w => w.labelId)) {
          const confirmed = window.confirm(
            'Loading a configuration will replace your current setup. Continue?'
          );
          if (!confirmed) return;
        }
        onLoadConfiguration({
          labels: config.labels,
          wells: config.wells
        });
      } catch (error) {
        alert('Error loading configuration file. Please make sure it\'s a valid plate configuration file.');
      }
    };
    reader.readAsText(file);
    
    // Reset the input so the same file can be loaded again
    event.target.value = '';
  };

  return (
    <div className="saved-label-sets">
      <div className="save-new-set">
        <input
          type="text"
          value={newSetName}
          onChange={(e) => setNewSetName(e.target.value)}
          placeholder="Enter configuration name"
          className="set-name-input"
        />
        <button onClick={handleSaveSet} className="save-set-btn">
          Save Configuration to File
        </button>
      </div>

      <div className="load-configuration">
        <label htmlFor="load-config" className="load-config-label">
          Load Configuration from File
        </label>
        <input
          id="load-config"
          type="file"
          accept=".json"
          onChange={handleLoadSet}
          className="load-config-input"
        />
      </div>

      <div className="config-info">
        <p className="info-text">
          Configurations are saved as JSON files in your downloads folder.
          You can share these files with others or keep them as backups.
        </p>
      </div>
    </div>
  );
};

export default SavedLabelSets;
