import { Hashtag } from './hashtag.interface';

export interface Event {
  id: string;
  hashtags: Hashtag[];
  owner: string;
  name: string;
  link: string;
  description: string;
  dateTimeFrom: string;
  dateTimeTo: string;
}

export interface RecurringEvent {
  id: string;
  events: Event[];
  eventFrequency: number;
  recursiveCount: number;
}
