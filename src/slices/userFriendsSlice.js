import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friends: [],
    loading: false,
    error: null,
};

const userFriendsSlice = createSlice({
    name: "userFriends",
    initialState,
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload;
        },
    },

});

export const { setFriends } = userFriendsSlice.actions;
export default userFriendsSlice;