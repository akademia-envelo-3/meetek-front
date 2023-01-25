import { UserResponse } from '@core/store/user.interfaces';
import { Section } from '..';

export interface SectionState {
  sections: Section[];
}

export interface AllUsersState {
  users: UserResponse[]
}

export const initialSectionState: SectionState = {
  sections: [],
};

export const initialAllUsersState: AllUsersState = {
  users: [],
}