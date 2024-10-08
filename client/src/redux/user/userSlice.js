import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;