import { createSelector, createFeatureSelector } from '@ngrx/store';

import { SectionState, SectionDetailsState, SectionAllUsersState } from '../';

export const selectSectionsState = createFeatureSelector<SectionState>('sections');
export const selectSectionDetailsState = createFeatureSelector<SectionDetailsState>('sectionDetails');
export const selectAllUsersState = createFeatureSelector<SectionAllUsersState>('users');

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

export const selectAllUsers = createSelector(selectAllUsersState, (state: SectionAllUsersState) => state?.users);
