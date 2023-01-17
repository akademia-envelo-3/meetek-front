import { Event, RecurringEvent } from './event.interface';
import { User } from './user.interface';

export interface Section {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  users: User[];
  events: Event[];
  recurringEvents: RecurringEvent[];
  sectionOwner: User;
}