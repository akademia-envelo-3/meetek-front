import { createReducer, on } from '@ngrx/store';

import { SectionDetilsApiActions, SectionsApiActions } from '../';
import {
  initialSectionAllUsersState,
  initialSectionDetailsState,
  initialSectionState,
  SectionAllUsersState,
  SectionDetailsState,
  SectionState,
} from './section.state';

export const sectionReducer = createReducer(
  initialSectionState,

  on(SectionsApiActions.sectionsLoadedSuccess, (state, { sections }): SectionState => {
    return { ...state, sections };
  })
);

export const sectionDetailsReducer = createReducer(
  initialSectionDetailsState,
  on(SectionDetilsApiActions.sectionDetailsSuccess, (state, { section }): SectionDetailsState => {
    return { ...state, section };
  })
);

export const sectionAllUsersReducer = createReducer(
  initialSectionAllUsersState,
  on(SectionsApiActions.getAllUsersSuccess, (state, { users }): SectionAllUsersState => {
    return { ...state, users };
  })
);
