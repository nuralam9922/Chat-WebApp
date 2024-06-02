import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showDropdown: false,
    messageDetails: null,
    positionX: 0,
    positionY: 0,
};



const messageDropdownSlice = createSlice({
    name: "messageDropdown",
    initialState,
    reducers: {
        setShowMessageDropdown: (state, action) => {
            state.showDropdown = action.payload;
        },

        setMessageDetails: (state, action) => {
            state.messageDetails = action.payload;
        },

        setMessageDetailsDropdownPosition: (state, action) => {
            state.positionX = action.payload.x;
            state.positionY = action.payload.y;
        },


    }
});

export const { setShowMessageDropdown, setMessageDetails, setMessageDetailsDropdownPosition } = messageDropdownSlice.actions;

export default messageDropdownSlice