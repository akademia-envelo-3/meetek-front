import { Event } from '@shared/interfaces';

export interface EventState {
  events: Event[];
  event: Event;
}

export const initialEventState: EventState = {
  events: [],
  event: {
    id: 0,
    name: '',
    location: '',
    dateTimeFrom: '',
    dateTimeTo: '',
  },
};
