export const ENDPOINTS = {
  EVENTS: '/events',
  HASHTAGS: '/hashtags',
  SECTIONS: '/sections',
  CATEGORY: '/categories',
  LOGGED_USER: '/users/me',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
} as const;

export type Endpoints = typeof ENDPOINTS;
