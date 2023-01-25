import { createReducer, on } from '@ngrx/store';
import { SectionsApiActions } from '..';

import { initialSectionState, SectionState } from './section.state';

export const sectionReducer = createReducer(
  initialSectionState,

  on(SectionsApiActions.sectionsLoadedSuccess, (state, { sections }): SectionState => {
    return { ...state, sections };
  })
);