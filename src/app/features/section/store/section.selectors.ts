import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SectionState } from './section.state';

export const selectSectionsState = createFeatureSelector<SectionState>('sections');

export const selectAllSections = createSelector(selectSectionsState, (state: SectionState) => {
  return state?.sections;
});

export const selectSection = (sectionId: number) => {
  return createSelector(selectSectionsState, (state: SectionState) => {
    return state?.sections.find(el => el.id === sectionId);
  });
};

export const selectUsersOfSection = (sectionId: number) => {
  return createSelector(
    selectSectionsState,
    (state: SectionState) => state?.sections.find(el => el.id === sectionId)?.users
  );
};
