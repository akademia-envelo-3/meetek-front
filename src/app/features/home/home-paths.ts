export const HOME_PATHS = {
  DEFAULT: '',
  EVENTS: {
    SINGLE: {
      CORE: 'event/:id',
      SUBPAGES: {
        HOME: '',
        PARTICIPANTS: 'participants',
        CHAT: 'chat',
        ATTACHMENTS: 'attachments',
      },
    },
    ALL: 'events',
    MY: 'events/my',
    OWNED: 'events/owned',
    ADD: 'event/add',
    REDO: 'event/:id/redo',
    EDIT: 'event/:id/edit',
  },
  SECTIONS: {
    SINGLE: {
      CORE: 'section/:id',
      SUBPAGES: {
        HOME: '',
        MEMBERS: 'members',
      },
    },
    ALL: 'sections',
    MY: 'sections/my',
    OWNED: 'sections/owned',
    ADD: 'section/add',
    EDIT: 'section/:id/edit',
  },
  CATEGORIES: 'categories',
  HASHTAGS: 'hashtags',
  NOTIFICATIONS: 'notifications',
  REQUEST_BOX: 'request-box',
  MEENDER: 'meender',
} as const;
