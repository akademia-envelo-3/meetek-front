import { Section } from '..';
import { NewSection } from '../shared/interfaces/section.interfaces';

export interface SectionState {
  sections: Section[];
  errorMsg: string;
  section: Section;
  updatedSection: Section;
}

export const initialSectionState: SectionState = {
  sections: [],
  errorMsg: '',
  section: {
    id: NaN,
    name: '',
    description: '',
    isActive: true,
    joinedUsers: [],
    events: [],
    recurringEvents: [],
    sectionOwner: {
      id: NaN,
      firstName: '',
      lastName: '',
      mail: '',
    },
  },
  updatedSection: {
    id: NaN,
    name: '',
    description: '',
    isActive: true,
    joinedUsers: [],
    events: [],
    recurringEvents: [],
    sectionOwner: {
      id: NaN,
      firstName: '',
      lastName: '',
      mail: '',
    },
  },
};
