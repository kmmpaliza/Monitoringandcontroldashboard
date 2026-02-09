export type ChuteStatus = 'Normal' | 'Warning' | 'Full' | 'Offline';

export interface Chute {
  id: number;
  name: string;
  status: ChuteStatus;
  fillLevel: number;
  lastUpdated: string;
  hasActiveAlert: boolean;
}

export interface Event {
  timestamp: string;
  chuteName: string;
  eventType: string;
  source: string;
  status: 'Active' | 'Resolved';
}
