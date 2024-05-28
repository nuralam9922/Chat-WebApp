import { createSelector } from "reselect";

const selectUser = state => state.userFriends;

export const selectUserFriends = createSelector(
    [selectUser],
    user => user.friends
)