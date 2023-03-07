import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HashtagsCollectionResponse, SingleHashtagResponse } from '../shared/hashtag.interface';

export const HashtagActions = createActionGroup({
  source: 'Hashtags',
  events: {
    'get hashtags': emptyProps(),
    'activate hashtag': props<{ hashtagId: number }>(),
    'deactivate hashtag': props<{ hashtagId: number }>(),
    'rename hashtag': props<{ hashtagId: number }>(),
  },
});

export const HashtagApiActions = createActionGroup({
  source: 'Hashtags API',
  events: {
    'hashtags loaded success': props<{ hashtags: HashtagsCollectionResponse }>(),
    'hashtags loaded failure': emptyProps(),

    'hashtag activated success': props<{ hashtag: SingleHashtagResponse }>(),
    'hashtag activated failure': emptyProps(),

    'hashtag deactivated success': props<{ hashtag: SingleHashtagResponse }>(),
    'hashtag deactivated failure': emptyProps(),

    'hashtag renamed success': props<{ hashtag: SingleHashtagResponse }>(),
    'hashtag renamed failure': emptyProps(),
  },
});
