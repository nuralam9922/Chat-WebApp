import { createSelector } from "reselect";

const selectUser = state => state.auth;

export const selectAuthLoading = createSelector(
    [selectUser],
    auth => auth.loading
)