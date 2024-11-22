import React, { useState } from 'react';
import { Well, WellLabel } from '../types/types';
import './WellPlate.css';

interface WellPlateProps {
  wells: Well[];
  labels: WellLabel[];
  onWellsSelected: (selectedWellIds: string[]) => void;
}

const WellPlate: React.FC<WellPlateProps> = ({ wells, labels, onWellsSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedWells, setSelectedWells] = useState<string[]>([]);

  const handleMouseDown = (wellId: string) => {
    setIsDragging(true);
    setSelectedWells([wellId]);
  };

  const handleMouseEnter = (wellId: string) => {
    if (isDragging) {
      setSelectedWells(prev => [...new Set([...prev, wellId])]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (selectedWells.length > 0) {
      onWellsSelected(selectedWells);
      setSelectedWells([]);
    }
  };

  const getWellColor = (wellId: string) => {
    const well = wells.find(w => w.id === wellId);
    if (well?.labelId) {
      const label = labels.find(l => l.id === well.labelId);
      return label?.color;
    }
    return undefined;
  };

  const getWellLabel = (wellId: string) => {
    const well = wells.find(w => w.id === wellId);
    if (well?.labelId) {
      const label = labels.find(l => l.id === well.labelId);
      return label?.name;
    }
    return undefined;
  };

  const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const COLS = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="well-plate-container">
      <div className="column-labels">
        <div className="corner-spacer"></div>
        {COLS.map(col => (
          <div key={col} className="column-label">{col}</div>
        ))}
      </div>
      <div className="well-plate-grid">
        <div className="row-labels">
          {ROWS.map(row => (
            <div key={row} className="row-label">{row}</div>
          ))}
        </div>
        <div 
          className="wells-grid"
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={handleMouseUp}
        >
          {wells.map(well => {
            const labelName = getWellLabel(well.id);
            return (
              <div
                key={well.id}
                className={`well ${selectedWells.includes(well.id) ? 'selected' : ''}`}
                style={{ backgroundColor: getWellColor(well.id) }}
                onMouseDown={() => handleMouseDown(well.id)}
                onMouseEnter={() => handleMouseEnter(well.id)}
                title={labelName}
              >
                {labelName && <span className="well-label">{labelName}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WellPlate;
