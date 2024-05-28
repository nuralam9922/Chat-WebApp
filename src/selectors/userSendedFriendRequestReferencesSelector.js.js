import { createSelector } from "reselect";

const selectUser = state => state.userFriendRequests;

export const selectUserSendedFriendRequestReferences = createSelector(
    [selectUser],
    user => user.userSendedFriendRequestReferences
)