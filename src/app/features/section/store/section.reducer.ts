import { createReducer, on } from '@ngrx/store';
import { SectionDetilsApiActions, SectionsApiActions } from './section.actions';
import { initialSectionDetailsState, initialSectionState, SectionDetailsState, SectionState } from './section.state';

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
