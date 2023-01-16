import { Section } from '..';

export interface SectionState {
  sections: Section[];
}

export const initialSectionState: SectionState = {
  sections: [],
};
