import { createReducer, on } from '@ngrx/store';
import { sectionActions, sectionsApiActions } from '..';
import { initialSectionState, SectionState } from '..';

export const sectionReducer = createReducer(
  initialSectionState,

  //get all sections
  on(
    sectionActions.getSections,
    (state): SectionState => ({
      ...state,
    })
  ),

  on(sectionsApiActions.sectionsLoadedSuccess, (state, { sections }): SectionState => {
    return { ...state, sections };
  }),

  on(sectionsApiActions.sectionsLoadedFailure, (state, { errorMsg }): SectionState => ({ ...state, errorMsg })),

  //add section
  on(
    sectionActions.addSection,
    (state, section): SectionState => ({
      ...state,
      sections: [...state.sections, section.section],
    })
  ),

  on(sectionsApiActions.sectionsAddedSuccess, (state, { section }): SectionState => {
    return { ...state, section };
  }),

  on(sectionsApiActions.sectionsAddedFailure, (state, { errorMsg }): SectionState => ({ ...state, errorMsg })),

  // edit section
  on(
    sectionActions.editSection,

    (state, { section }): SectionState => ({
      ...state,
      updatedSection: section,
    })
  ),

  on(sectionsApiActions.sectionEditedSuccess, (state, { section }): any => {
    const updatedSection = state.sections.filter(update => {
      return section.id === update.id ? update : null;
    });
    return { ...state, updatedSection: updatedSection };
  }),

  on(sectionsApiActions.sectionEditedFailure, (state, { errorMsg }): SectionState => {
    return {
      ...state,
      errorMsg,
    };
  }),

  // activate section
  on(sectionActions.activateSection, (state, { sectionId }): any => {
    return {
      ...state,
      sections: [...state.sections, sectionId],
    };
  }),

  on(sectionsApiActions.sectionActivatedSuccess, (state, { sectionId }): any => {
    const activatedSection = state.sections.filter(activatedSectionId => {
      return sectionId === activatedSectionId.id ? activatedSectionId : null;
    });
    return {
      ...state,
      activatedSection,
    };
  }),
  on(sectionsApiActions.sectionActivatedFailure, (state, { errorMsg }): SectionState => {
    return {
      ...state,
      errorMsg,
    };
  }),

  //deactivate section
  on(sectionActions.deactivateSection, (state, { sectionId }): any => {
    return {
      ...state,
      sections: [...state.sections, sectionId],
    };
  }),

  on(sectionsApiActions.sectionDeactivatedSuccess, (state, { sectionId }): any => {
    const deactivatedSection = state.sections.filter(deactivatedSectionId => {
      return sectionId === deactivatedSectionId.id ? deactivatedSectionId : null;
    });
    return {
      ...state,
      deactivatedSection,
    };
  }),

  on(sectionsApiActions.sectionDeactivatedFailure, (state, { errorMsg }): SectionState => {
    return {
      ...state,
      errorMsg,
    };
  })
);
