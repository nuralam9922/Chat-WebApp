// selectors/authSelectors.js
import { createSelector } from 'reselect';

// Basic selector to get the auth state
const selectAuth = state => state.auth;

// Memoized selector to get the loggedInStatus
export const selectLoggedInStatus = createSelector(
  [selectAuth],
  auth => auth.loggedInStatus
);
