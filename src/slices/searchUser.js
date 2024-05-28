import { createSlice } from "@reduxjs/toolkit";

const searchUserSlice = createSlice({
    name: "searchUser",
    initialState: {
        searchUser: [],
        searchTeams: ''
    },
    reducers: {
        setSearchUser: (state, action) => {
            state.searchUser = action.payload;
        },
        setSearchTeamsString: (state, action) => {
            state.searchTeams = action.payload;
        },
    },
});
export const { setSearchUser, setSearchTeamsString } = searchUserSlice.actions;

export default searchUserSlice