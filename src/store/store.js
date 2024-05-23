import { configureStore } from '@reduxjs/toolkit';
import useThemeSlice from '../slices/useThemeSlice';
import authSlice from '../slices/authSlice';

export const store = configureStore({
	reducer: {
		// toggle: toggleSidebarSlice.reducer,
		theme: useThemeSlice.reducer,
		auth: authSlice.reducer,
	},
});
