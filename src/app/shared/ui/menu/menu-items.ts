import { HOME_PATHS } from 'src/app/features/home/home-paths';
import { MenuItems } from './menu.interface';

export const menuItems: MenuItems = {
  user: [
    { name: 'Meender', icon: 'local_fire_department', path: HOME_PATHS.MEENDER },
    {
      name: 'Wydarzenia',
      icon: 'event_note',
      subpages: [
        { name: 'Moje', path: HOME_PATHS.EVENTS.MY },
        { name: 'Pozostałe', path: HOME_PATHS.EVENTS.ALL },
        { name: 'Utworzone', path: HOME_PATHS.EVENTS.OWNED },
        { name: 'Dodaj', path: HOME_PATHS.EVENTS.ADD },
        { name: 'Zaproszenia', path: HOME_PATHS.NOTIFICATIONS },
      ],
    },
    {
      name: 'Sekcje',
      icon: 'groups',
      subpages: [
        { name: 'Moje', path: HOME_PATHS.SECTIONS.MY },
        { name: 'Pozostałe', path: HOME_PATHS.SECTIONS.ALL },
        { name: 'Utworzone', path: HOME_PATHS.SECTIONS.OWNED },
        { name: 'Dodaj', path: HOME_PATHS.SECTIONS.ADD },
      ],
    },
    { name: 'Wyloguj', icon: 'logout' },
  ],
  admin: [
    { name: 'Wydarzenia', icon: 'event_note', path: HOME_PATHS.EVENTS.ALL },
    { name: 'Sekcje', icon: 'groups', path: HOME_PATHS.SECTIONS.ALL },
    { name: 'Hasztagi', icon: 'tag', path: HOME_PATHS.HASHTAGS },
    { name: 'Kategorie', icon: 'category', path: HOME_PATHS.CATEGORIES },
    { name: 'Skrzynka spraw', icon: 'contact_mail', path: HOME_PATHS.REQUEST_BOX },
    { name: 'Wyloguj', icon: 'logout' },
  ],
};
