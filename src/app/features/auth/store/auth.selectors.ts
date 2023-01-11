import { createSelector } from "@ngrx/store"

import { UserState } from "../shared/auth.iterfaces"

const selectedUser = (state: UserState) => state.user

export const selectLoggedUser = createSelector(
  selectedUser,
  (state) => state.user
)