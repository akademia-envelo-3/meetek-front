export interface Event {
  id: number
  hashtags: EventHashtag[];
  owner: EventOwner;
  name: string;
  link: string;
  description: string;
  dateTimeFrom: string;
  dateTimeTo: string;
  category: EventCategory;
  locationName: string;
  coordinates: EventCoordinates;
  participantsLimit: number;
  private: boolean;
  responseRequired: boolean;
  online: boolean;
  external: boolean;
  users: EventUser[];
}

export interface EventHashtag {
  id: number;
  name: string;
  countOfHashtagUsage: number;
  active: boolean;
}

export interface EventOwner {
  id: number;
  firstname: string;
  lastname: string;
  role: string;
}

export interface EventUser {
  id: number;
  firstname: string;
  lastname: string;
  role: string;
  undecided: boolean;
  rejected: boolean;
}

export interface EventCategory {
  id: number;
  name: string;
  active: boolean;
}

export interface EventCoordinates {
  id: number;
  latitude: number;
  longitude: number;
}

export interface RecurringEvent {
  id: string;
  events: Event[];
  eventFrequency: number;
  recursiveCount: number;
}
