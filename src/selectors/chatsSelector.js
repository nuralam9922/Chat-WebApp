import { createSelector } from "reselect";



const selectChats = state => state;

export const selectChatsList = createSelector(
    [selectChats],
    chats => chats.chats
)

