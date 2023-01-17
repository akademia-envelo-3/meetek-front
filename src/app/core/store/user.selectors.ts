import { createSelector } from "@ngrx/store";

import { AppState } from "src/app/app.module";

const selectedUser = (state: AppState) => state.user;

export const selectLoggedUser = createSelector(selectedUser, state => state?.user);