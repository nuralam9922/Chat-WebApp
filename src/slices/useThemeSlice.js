import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "light",
    background: localStorage.getItem("background") || "#ffff",
};

document.documentElement.setAttribute("theme", initialState.theme);


const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
            document.documentElement.setAttribute("theme", action.payload);
            localStorage.setItem("theme", action.payload);
        },

        setChatBackground: (state, action) => {
            state.background = action.payload;
        },
        resetTheme: (state) => {
            state.theme = '';
            document.documentElement.setAttribute("theme", '');
            localStorage.setItem("theme", '');
        },
    },
});

export const { setTheme, resetTheme, setChatBackground } = themeSlice.actions;
export default themeSlice;