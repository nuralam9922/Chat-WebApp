import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
    messages: [],
    activeChatId: null,
    loading: false,
    error: null,
    typingStatus: null,
    unreadMessages: {},
    showChatWindow: false,
}


const chatWindowSlice = createSlice({
    name: "chatWindow",
    initialState,
    reducers: {

        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setActiveChatId: (state, action) => {
            state.activeChatId = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setTypingStatus: (state, action) => {
            state.typingStatus = action.payload;
        },
        setUnreadMessages: (state, action) => {
            state.unreadMessages = action.payload;
        },
        setShowChatWindow: (state, action) => {
            state.showChatWindow = action.payload;
        }

    }

})

export const { setUserInfo, setMessages, setShowChatWindow, setActiveChatId, setLoading, setTypingStatus, setUnreadMessages } = chatWindowSlice.actions;
export default chatWindowSlice