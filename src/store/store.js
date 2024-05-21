import { configureStore } from '@reduxjs/toolkit';
import toggleSidebarSlice from '../slices/toggleSidebarSlice';

export const store = configureStore({
	reducer: {
    toggle: toggleSidebarSlice.reducer,
	},
});
