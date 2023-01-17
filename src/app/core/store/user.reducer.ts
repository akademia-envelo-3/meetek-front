import { createReducer, on } from "@ngrx/store";

import { UserApiActions } from "./user.actions";
import { UserState } from "./user.interfaces";
import { initialUserState } from "./user.state";

export const userReducer = createReducer(
  initialUserState,
  on(
    UserApiActions.getUserSuccess,
    (state, { user }): UserState => ({
      ...state,
      user
    })
  )
);