import { UserRole } from '@core/store/user.interfaces';
import { UserMenuInputs } from '../user-menu';

export interface MenuInputs {
  role: UserRole;
  userData: Required<UserMenuInputs>;
}

interface MenuItem {
  name: string;
  icon: string;
  path?: string;
  subpages?: { name: string; path: string }[];
}

export interface MenuItems {
  user: MenuItem[];
  admin: MenuItem[];
}
