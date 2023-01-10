import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SectionState } from '..';

export const selectSectionsState = createFeatureSelector<SectionState>('sections');

export const selectAllSections = createSelector(selectSectionsState, (state: SectionState) => {
  console.log(state);
  return state.sections;
});
