import React, { useState } from 'react';
import { WellLabel } from '../types/types';
import './LabelManager.css';

interface LabelManagerProps {
  labels: WellLabel[];
  onAddLabel: (label: WellLabel) => void;
  onSelectLabel: (labelId: string) => void;
  onDeleteLabel: (labelId: string) => void;
  onUpdateLabelColor: (labelId: string, newColor: string) => void;
  onUpdateLabelName: (labelId: string, newName: string) => void;
  selectedLabelId?: string;
}

const LabelManager: React.FC<LabelManagerProps> = ({
  labels,
  onAddLabel,
  onSelectLabel,
  onDeleteLabel,
  onUpdateLabelColor,
  onUpdateLabelName,
  selectedLabelId
}) => {
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#2196f3');
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);

  const handleAddLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLabelName.trim()) {
      const newLabel: WellLabel = {
        id: Date.now().toString(),
        name: newLabelName.trim(),
        color: newLabelColor
      };
      onAddLabel(newLabel);
      setNewLabelName('');
    }
  };

  const handleLabelNameEdit = (labelId: string, currentName: string) => {
    setEditingLabelId(labelId);
  };

  const handleLabelNameSave = (labelId: string, newName: string) => {
    if (newName.trim()) {
      onUpdateLabelName(labelId, newName.trim());
    }
    setEditingLabelId(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent, labelId: string, newName: string) => {
    if (e.key === 'Enter') {
      handleLabelNameSave(labelId, newName);
    } else if (e.key === 'Escape') {
      setEditingLabelId(null);
    }
  };

  return (
    <div className="label-manager">
      <form onSubmit={handleAddLabel} className="label-form">
        <input
          type="text"
          value={newLabelName}
          onChange={(e) => setNewLabelName(e.target.value)}
          placeholder="Enter label name"
          className="label-input"
        />
        <div className="label-form-actions">
          <input
            type="color"
            value={newLabelColor}
            onChange={(e) => setNewLabelColor(e.target.value)}
            className="color-picker"
            title="Choose color"
          />
          <button type="submit" className="add-label-btn">Add Label</button>
        </div>
      </form>

      <div className="labels-list">
        {labels.map(label => (
          <div
            key={label.id}
            className={`label-item ${selectedLabelId === label.id ? 'selected' : ''}`}
          >
            <div 
              className="label-content"
              onClick={() => onSelectLabel(label.id)}
            >
              <div
                className="label-color"
                style={{ backgroundColor: label.color }}
              />
              {editingLabelId === label.id ? (
                <input
                  type="text"
                  defaultValue={label.name}
                  className="edit-label-input"
                  autoFocus
                  onBlur={(e) => handleLabelNameSave(label.id, e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, label.id, e.currentTarget.value)}
                />
              ) : (
                <span 
                  className="label-name"
                  onDoubleClick={() => handleLabelNameEdit(label.id, label.name)}
                  title="Double-click to edit"
                >
                  {label.name}
                </span>
              )}
            </div>
            <div className="label-actions">
              <input
                type="color"
                value={label.color}
                onChange={(e) => onUpdateLabelColor(label.id, e.target.value)}
                className="edit-color-picker"
                title="Edit color"
              />
              <button
                onClick={() => onDeleteLabel(label.id)}
                className="delete-label-btn"
                title="Delete label"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelManager;
