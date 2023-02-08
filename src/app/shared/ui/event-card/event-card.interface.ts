export type participationType = 'active' | 'inactive' | 'past';
export type eventType = 'public' | 'private' | 'worldwide';

export interface EventSpecs {
  id: number;
  title: string;
  type: eventType;
  date: string;
  hour: string;
  address: string;
  participation: participationType;
  hashtags: string;
  mapCords: [number, number];
}
