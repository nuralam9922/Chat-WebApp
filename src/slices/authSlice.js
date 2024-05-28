import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

// Define an async thunk for fetching user details
export const fetchUser = createAsyncThunk(
    'auth/fetchUser', // Action type
    async () => {
        try {
            // Call authService method to get user details
            const response = await authService.gteLoggedInUser();
            return response; // Return the fetched user details
        } catch (error) {
            console.log('Error fetching user details:', error);
        }
    }
);

const initialState = {
    user: null,
    loggedInStatus: false,
    loading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.loggedInStatus = true;
        },
        updateUserDetails: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        logout: (state) => {
            state.user = null;
            state.loggedInStatus = false;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                console.log(action.payload.preferences.theme);
                if (action.payload.preferences.theme) {
                    localStorage.setItem("theme", action.payload.preferences.theme);

                }
                state.loggedInStatus = true;
            } else {
                // If user details are not found, set loggedInStatus to false
                state.loggedInStatus = false;
            }
            state.loading = false;

        }).addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.loggedInStatus = false;

        }).addCase(fetchUser.rejected, (state) => {
            state.loading = false;
            state.loggedInStatus = false;

        });
    }
});

export const { login, updateUserDetails, logout } = authSlice.actions;
export default authSlice;
