import { createSlice } from "@reduxjs/toolkit";

export const showAddNewComponentSlice = createSlice({
    name: "showAddNewComponent",
    initialState: {
        value: false,
    },
    reducers: {
        setShowAddNewComponent: (state, action) => {
            state.value = action.payload;
        },
    },
}


);

export const { setShowAddNewComponent } = showAddNewComponentSlice.actions;

export default showAddNewComponentSlice