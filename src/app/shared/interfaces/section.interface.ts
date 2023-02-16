import { Event } from './event.interface';
import { User } from './user.interface';

export interface Section {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  users: number[];
  events: Event[];
  sectionOwner: User;
}
