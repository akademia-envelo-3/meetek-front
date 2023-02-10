import { HashtagsCollectionState, SingleHashtagState } from '../hashtag.interface';

export const initialSingleHashtagState: SingleHashtagState = {
  id: NaN,
  name: '',
  usage: 0,
  isActive: false,
};

export const initialHashtagsCollectionState: HashtagsCollectionState = {
  hashtags: [],
};
