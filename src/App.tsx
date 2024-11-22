import React, { useState } from 'react';
import WellPlate from './components/WellPlate';
import LabelManager from './components/LabelManager';
import SavedLabelSets from './components/SavedLabelSets';
import { Well, WellLabel } from './types/types';
import './App.css';

const App: React.FC = () => {
  const [labels, setLabels] = useState<WellLabel[]>([]);
  const [selectedLabelId, setSelectedLabelId] = useState<string>();
  const [wells, setWells] = useState<Well[]>(() => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cols = Array.from({ length: 12 }, (_, i) => i + 1);
    return rows.flatMap(row =>
      cols.map(col => ({
        id: `${row}${col}`,
        position: `${row}${col}`,
      }))
    );
  });

  const handleAddLabel = (newLabel: WellLabel) => {
    setLabels(prev => [...prev, newLabel]);
    setSelectedLabelId(newLabel.id);
  };

  const handleSelectLabel = (labelId: string) => {
    setSelectedLabelId(labelId);
  };

  const handleDeleteLabel = (labelId: string) => {
    setLabels(prev => prev.filter(label => label.id !== labelId));
    if (selectedLabelId === labelId) {
      setSelectedLabelId(undefined);
    }
    // Remove the deleted label from wells
    setWells(prev =>
      prev.map(well =>
        well.labelId === labelId
          ? { ...well, labelId: undefined }
          : well
      )
    );
  };

  const handleUpdateLabelColor = (labelId: string, newColor: string) => {
    setLabels(prev =>
      prev.map(label =>
        label.id === labelId
          ? { ...label, color: newColor }
          : label
      )
    );
  };

  const handleUpdateLabelName = (labelId: string, newName: string) => {
    setLabels(prev =>
      prev.map(label =>
        label.id === labelId
          ? { ...label, name: newName }
          : label
      )
    );
  };

  const handleWellsSelected = (selectedWellIds: string[]) => {
    if (selectedLabelId) {
      setWells(prev =>
        prev.map(well =>
          selectedWellIds.includes(well.id)
            ? { ...well, labelId: selectedLabelId }
            : well
        )
      );
    }
  };

  const handleLoadConfiguration = (config: { labels: WellLabel[], wells: Well[] }) => {
    setLabels(config.labels);
    setWells(config.wells);
    setSelectedLabelId(undefined);
  };

  return (
    <div className="app">
      <h1>Plate Planner</h1>
      <div className="main-content">
        <div className="well-plate-section">
          <WellPlate
            wells={wells}
            labels={labels}
            onWellsSelected={handleWellsSelected}
          />
        </div>
        <div className="label-manager-section">
          <LabelManager
            labels={labels}
            onAddLabel={handleAddLabel}
            onSelectLabel={handleSelectLabel}
            onDeleteLabel={handleDeleteLabel}
            onUpdateLabelColor={handleUpdateLabelColor}
            onUpdateLabelName={handleUpdateLabelName}
            selectedLabelId={selectedLabelId}
          />
          <SavedLabelSets
            currentLabels={labels}
            currentWells={wells}
            onLoadConfiguration={handleLoadConfiguration}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
