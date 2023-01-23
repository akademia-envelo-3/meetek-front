import { UserState } from "./user.interfaces";

export const initialUserState: UserState = {
    user: {
      id: NaN,
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    }
};
