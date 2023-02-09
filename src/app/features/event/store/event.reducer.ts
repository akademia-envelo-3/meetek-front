import { createReducer, on } from '@ngrx/store';

import { EventApiActions } from './event.actions';
import { initialEventState, EventState } from './event.state';

export const eventReducer = createReducer(
  initialEventState,

  on(EventApiActions.eventsLoadedSuccess, (state, { events }): EventState => ({ ...state, events })),

  on(EventApiActions.eventLoadedSuccess, (state, { event }): EventState => ({ ...state, event }))
);
