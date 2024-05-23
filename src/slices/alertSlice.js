import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    type: "success",
    content: '',
    icon: null,
    customClass: '',
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.open = action.payload.open;
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.content = action.payload.content;
            state.icon = action.payload.icon;
            state.customClass = action.payload.customClass

        },
        hideAlert: (state) => {
            state.open = false;
            state.message = '';
            state.type = '';
            state.content = '';
            state.icon = null
            state.customClass = ''

        },
    },
});

export const { setAlert, hideAlert } = alertSlice.actions;
export default alertSlice