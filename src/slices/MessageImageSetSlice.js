import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    images: [],
    visible: false,
    showAlert: false,
}


const messageImageSetSlice = createSlice({
    name: "messageImageSet",
    initialState,
    reducers: {
        setImagesMessageImageSet: (state, action) => {
            state.images = action.payload
        },
        setVisibleMessageImageSet: (state, action) => {
            state.visible = action.payload
        },
        setShowAlertMessageImageSet: (state, action) => {
            state.showAlert = action.payload
        }
    },
})

export const { setImagesMessageImageSet, setVisibleMessageImageSet, setShowAlertMessageImageSet } = messageImageSetSlice.actions

export default messageImageSetSlice;