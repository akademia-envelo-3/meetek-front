import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Section } from 'src/app/features/section/shared/interfaces';

export const sectionActions = createActionGroup({
  source: 'Sections',
  events: {
    'get sections': emptyProps(),
    'get section': props<{ sectionId: number }>(),
    'add section': props<{ section: Section }>(),
    'edit section': props<{ section: Partial<Section> }>(),
    'activate section': props<{ sectionId: number }>(),
    'deactivate section': props<{ sectionId: number }>(),
    'join section': props<{ sectionId: number }>(),
    'leave section': props<{ sectionId: number }>(),
  },
});

export const sectionsApiActions = createActionGroup({
  source: 'Sections API',
  events: {
    'sections loaded success': props<{ sections: Section[] }>(),
    'sections loaded failure': emptyProps(),

    'section loaded success': props<{ section: Section }>(),
    'section loaded failure': emptyProps(),

    'sections added success': props<{ section: Section }>(),
    'sections added failure': emptyProps(),

    'section edited success': props<{ section: Partial<Section> }>(),
    'section edited failure': emptyProps(),

    'section activated success': props<{ sectionId: number }>(),
    'section activated failure': emptyProps(),

    'section deactivated success': props<{ sectionId: number }>(),
    'section deactivated failure': emptyProps(),

    'section joined success': props<{ sectionId: number }>(),
    'section joined failure': emptyProps(),

    'section left success': props<{ sectionId: number }>(),
    'section left failure': emptyProps(),
  },
});
