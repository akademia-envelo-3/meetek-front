import { Section } from '../shared/interfaces';

export interface SectionState {
  sections: Section[];
}

export const initialSectionState: SectionState = {
  sections: [],
};
