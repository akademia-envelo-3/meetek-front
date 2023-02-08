import { Section, User } from '../';

export interface SectionState {
  sections: Section[];
}

export interface SectionDetailsState {
  section: Section;
}

export interface SectionAllUsersState {
  users: User[];
}

export const initialSectionState: SectionState = {
  sections: [],
};

export const initialSectionDetailsState: SectionDetailsState = {
  section: {
    id: 0,
    name: '',
    description: '',
    isActive: false,
    users: [
      {
        id: 0,
        firstName: '',
        lastName: '',
      },
    ],
    events: [
      {
        id: 0,
        name: '',
        dateTimeFrom: '',
        dateTimeTo: '',
        location: '',
      },
    ],
    sectionOwner: {
        id: 0,
        firstName: '',
        lastName: '',
      },
  },
};

export const initialSectionAllUsersState: SectionAllUsersState = {
  users: []
}
