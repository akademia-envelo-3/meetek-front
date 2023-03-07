import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HashtagsStoreState } from '../shared/hashtag.interface';

export const selectAllHashtagsState = createFeatureSelector<HashtagsStoreState>('hashtags');

export const selectAllHashtags = createSelector(selectAllHashtagsState, state => {
  return state.hashtags;
});
