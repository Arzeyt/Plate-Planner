export interface WellLabel {
  id: string;
  name: string;
  color: string;
}

export interface Well {
  id: string;
  position: string;
  labelId?: string;
}

export interface WellPlateState {
  wells: Well[];
  labels: WellLabel[];
  selectedWells: string[];
}

export interface SavedLabelSet {
  id: string;
  name: string;
  labels: WellLabel[];
  wells: Well[];
  createdAt: string;
}

export interface SavedPlateConfig {
  labels: WellLabel[];
  wells: Well[];
}
