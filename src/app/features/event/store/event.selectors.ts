import { createSelector, createFeatureSelector } from '@ngrx/store';

import { EventState } from './event.state';

export const selectEventsState = createFeatureSelector<EventState>('events');

export const selectAllEvents = createSelector(selectEventsState, (state: EventState) => {
  return state?.events;
});

export const selectEvent = createSelector(selectEventsState, (state: EventState) => {
  return state?.event;
});
