import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showDropdown: false,
    position: 0,
};



const messageDropdownSlice = createSlice({
    name: "messageDropdown",
    initialState,
    reducers: {
        setShowMessageDropdown: (state, action) => {
            state.showDropdown = action.payload;
        },

        setPosition: (state, action) => {
            state.position = action.payload;
        },
    }
});

export const { setShowMessageDropdown, setPosition } = messageDropdownSlice.actions;

export default messageDropdownSlice