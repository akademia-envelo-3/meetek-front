import { Event } from '@shared/interfaces';

export interface EventState {
  events: Event[];
  event: Event;
}

export const initialEventState: EventState = {
  events: [],
  event: {
    id: 0,
    hashtags: [],
    owner: {
      id: 0,
      firstname: '',
      lastname: '',
      role: '',
    },
    name: '',
    link: '',
    description: '',
    dateTimeFrom: '',
    dateTimeTo: '',
    category: {
      id: 0,
      name: '',
      active: false,
    },
    locationName: '',
    coordinates: {
      id: 0,
      latitude: 0,
      longitude: 0,
    },
    participantsLimit: 0,
    private: false,
    responseRequired: false,
    online: false,
    external: false,
    users: []
  },
};
