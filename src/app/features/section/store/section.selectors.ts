import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SectionState, SectionDetailsState } from './section.state';

export const selectSectionsState = createFeatureSelector<SectionState>('sections');
export const selectSectionDetailsState = createFeatureSelector<SectionDetailsState>('sectionDetails');

export const selectAllSections = createSelector(selectSectionsState, (state: SectionState) => {
  return state?.sections;
});

export const selectSection = (sectionId: number) => {
  return createSelector(selectSectionsState, (state: SectionState) => {
    return state?.sections.find(el => el.id === sectionId);
  });
};

export const selectSectionDetails = createSelector(selectSectionDetailsState, (state: SectionDetailsState) => {
  return state?.section;
});
