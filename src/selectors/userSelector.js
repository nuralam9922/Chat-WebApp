import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectUser = state => state.auth;

export const selectUserDetails = createSelector(
    [selectUser],
    auth => auth.user // Returning user state
)
