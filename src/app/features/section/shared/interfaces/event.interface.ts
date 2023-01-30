export interface Event {
  id: number;
  name: string;
  location: string;
  dateTimeFrom: string;
  dateTimeTo: string;
}

export interface RecurringEvent {
  id: string;
  events: Event[];
  eventFrequency: number;
  recursiveCount: number;
}
