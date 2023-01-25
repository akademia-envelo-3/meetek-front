import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AllUsersState, SectionState } from './section.state';

export const selectSectionsState = createFeatureSelector<SectionState>('sections');
export const selectAllUsersState = createFeatureSelector<AllUsersState>('allUsers');

export const selectAllSections = createSelector(selectSectionsState, (state: SectionState) => {
  return state?.sections;
});

export const selectSection = (sectionId: number) => {
  return createSelector(selectSectionsState, (state: SectionState) => {
    return state?.sections.find(el => el.id === sectionId);
  });
};

export const selectAllUsers = createSelector(selectAllUsersState, (state: AllUsersState) => state.users);
