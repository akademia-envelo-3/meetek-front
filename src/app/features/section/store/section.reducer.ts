import { createReducer, on } from '@ngrx/store';
import { sectionActions, sectionsApiActions } from '..';
import { initialSectionState, SectionState } from '..';

export const sectionReducer = createReducer(
  initialSectionState,
  on(
    sectionActions.getSections,
    (state): SectionState => ({
      ...state,
    })
  ),

  on(sectionsApiActions.sectionsLoadedSuccess, (state, { sections }): SectionState => {
    return { ...state, sections };
  }),

  on(sectionsApiActions.sectionsLoadedFailure, (state, { errorMsg }): any => ({ ...state, errorMsg }))
);
