import { createSelector } from "reselect";
const selectUser = state => state.userFriendRequests;

export const selectUserFriendRequestSelector = createSelector(
    [selectUser],
    user => user.friendRequests
);