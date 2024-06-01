import { configureStore } from '@reduxjs/toolkit';
import alertSlice from '../slices/alertSlice';
import authSlice from '../slices/authSlice';
import searchUserSlice from '../slices/searchUserSlice';
import userFriendRequestsSlice from '../slices/userFriendRequestsSlice';
import userFriendsSlice from '../slices/userFriendsSlice';
import useThemeSlice from '../slices/useThemeSlice';
import showAddNewComponentSlice from '../slices/showAddNewComponentSlice';
import chatWindowSlice from '../slices/chatWindowSlice';
import chatsSlice from '../slices/chatsSlice';
import messageDropdownSlice from '../slices/messageDropdown';

export const store = configureStore({
	reducer: {
		// toggle: toggleSidebarSlice.reducer,
		theme: useThemeSlice.reducer,
		auth: authSlice.reducer,
		alert: alertSlice.reducer,
		userFriends: userFriendsSlice.reducer,
		userFriendRequests: userFriendRequestsSlice.reducer,
		searchUserResults: searchUserSlice.reducer,
		showAddNewComponent: showAddNewComponentSlice.reducer,
		chatWindowInfo: chatWindowSlice.reducer,
		chats: chatsSlice.reducer,
		messageDropdown: messageDropdownSlice.reducer,
	},
});
