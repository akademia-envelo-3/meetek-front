import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Event } from '@shared/interfaces';

export const EventActions = createActionGroup({
  source: 'Event',
  events: {
    'get events': emptyProps(),
    'get event': props<{ eventId: number }>(),
  },
});

export const EventApiActions = createActionGroup({
  source: 'Event API',
  events: {
    'events loaded success': props<{ events: Event[] }>(),
    'events loaded failure': emptyProps(),

    'event loaded success': props<{ event: Event }>(),
    'event loaded failure': emptyProps(),
  },
});
