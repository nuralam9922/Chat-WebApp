import { createSlice } from "@reduxjs/toolkit";

export const chatsSlice = createSlice({
    name: "chats",
    initialState: {
        chats: [],
        loading: true,
        error: null,
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        chatLoading: (state, action) => {
            state.loading = action.payload
        },
        chatError: (state, action) => {
            state.error = action.payload
        },
    },
});



export const { setChats, chatLoading, chatError } = chatsSlice.actions;

export default chatsSlice
