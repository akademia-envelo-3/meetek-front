import { createReducer, on } from '@ngrx/store';
import { HashtagsStoreState, HashtagsCollectionState } from '../shared/hashtag.interface';
import { HashtagApiActions } from './hashtag.actions';
import { initialHashtagsState } from './hashtag.state';

export const hashtagsReducer = createReducer(
  initialHashtagsState,

  on(HashtagApiActions.hashtagsLoadedSuccess, (state, { hashtags }): HashtagsStoreState => {
    const hashtagsCollection: HashtagsCollectionState = hashtags.map(hashtag => ({
      id: hashtag.hashtagId,
      name: hashtag.name,
      usage: hashtag.countOfHashtagUsage,
      isActive: hashtag.active,
    }));

    return { ...state, hashtags: hashtagsCollection };
  })
);
