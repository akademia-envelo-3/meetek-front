import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Section } from '@shared/interfaces';
import { User } from '@shared/interfaces';

export const sectionActions = createActionGroup({
  source: 'Sections',
  events: {
    'get sections': emptyProps(),
    'add section': props<{ section: Section }>(),
    'edit section': props<{ section: Section }>(),
    'activate section': props<{ sectionId: number }>(),
    'deactivate section': props<{ sectionId: number }>(),
    'join section': props<{ sectionId: number }>(),
    'leave section': props<{ sectionId: number }>(),
    'get users of section': props<{ sectionId: number; users: User[] }>(),
  },
});

export const sectionsApiActions = createActionGroup({
  source: 'Sections API',
  events: {
    'sections loaded success': props<{ sections: Section[] }>(),
    'sections loaded failure': props<{ errorMsg: string }>(),

    'sections added success': props<{ section: Section }>(),
    'sections added failure': props<{ errorMsg: string }>(),

    'section edited success': props<{ section: Section }>(),
    'section edited failure': props<{ errorMsg: string }>(),

    'section activated success': props<{ sectionId: number }>(),
    'section activated failure': props<{ errorMsg: string }>(),

    'section deactivated success': props<{ sectionId: number }>(),
    'section deactivated failure': props<{ errorMsg: string }>(),

    'section joined success': props<{ sectionId: number }>(),
    'section joined failure': props<{ errorMsg: string }>(),

    'section left success': props<{ sectionId: number }>(),
    'section left failure': props<{ errorMsg: string }>(),

    'users of section got success': props<{ sectionId: number; users: User[] }>(),
    'users of section got failure': props<{ errorMsg: string }>(),
  },
});
