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
            console.log(action);
        },
        setBackground: (state, action) => {
            state.background = action.payload.background;
            localStorage.setItem("background", action.payload.background);
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice;