import { createSelector } from "reselect";

const selectTheme = state => state.theme;

export const selectThemeDetails = createSelector(
    [selectTheme],
    theme => theme.theme
)