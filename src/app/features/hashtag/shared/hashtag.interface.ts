export interface SingleHashtagResponse {
  hashtagId: number;
  name: string;
  countOfHashtagUsage: number;
  active: boolean;
}

export type HashtagsCollectionResponse = SingleHashtagResponse[];

export interface SingleHashtagState {
  id: number;
  name: string;
  usage: number;
  isActive: boolean;
}

export type HashtagsCollectionState = SingleHashtagState[];

export interface HashtagsStoreState {
  hashtags: HashtagsCollectionState;
}
