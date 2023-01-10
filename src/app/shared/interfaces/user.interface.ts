export interface User {
  id: string;
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  role: string;
  ownedEvents: [];
  eventsWithResponse: [];
  ownedGroups: [];
  joinedGroups: [];
  notifications: [];
}
