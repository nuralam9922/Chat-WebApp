import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friendRequests: [],
    userSendedFriendRequestReferences: [],
    loading: false,
    error: null,
};

const userFriendRequestsSlice = createSlice({
    name: "userFriendRequests",
    initialState,
    reducers: {
        addFriendRequest: (state, action) => {
            state.friendRequests = action.payload;
            // state.userSendedFriendRequestReferences = action.payload;

        },
        addUserSendedFriendRequestReferences: (state, action) => {
            // console.log(action.payload);
            state.userSendedFriendRequestReferences =action.payload
            // console.log(state);
        }, 
        deleteAddUserSendedFriendRequestReferences: (state, action) => {
            console.log(action.payload);
            state.userSendedFriendRequestReferences = state.userSendedFriendRequestReferences.filter(request => request.id !== action.payload);
        }
    },
});

export const { addFriendRequest, addUserSendedFriendRequestReferences, deleteAddUserSendedFriendRequestReferences } = userFriendRequestsSlice.actions

export default userFriendRequestsSlice