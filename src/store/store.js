import { configureStore } from '@reduxjs/toolkit';
import useThemeSlice from '../slices/useThemeSlice';

export const store = configureStore({
	reducer: {
		// toggle: toggleSidebarSlice.reducer,
		theme: useThemeSlice.reducer,
	},
});
