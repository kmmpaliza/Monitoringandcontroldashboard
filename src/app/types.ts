export type ChuteStatus = 'Normal' | 'Warning' | 'Full' | 'Offline';

export interface Chute {
  id: number;
  name: string;
  barcode: string;
  fillLevel: number;
  dateTimeModified: string;
  status: ChuteStatus;
}

export interface Event {
  timestamp: string;
  chuteName: string;
  eventType: string;
  source: string;
  status: 'Active' | 'Resolved';
}
