import { createSlice } from "@reduxjs/toolkit";

const initialState = {};


export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        logIn: (state = { authData: null }, action) => {
            // put into local storage so computer remembers device
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            console.log(action?.payload);
            // change the current state
            return { ...state, authData: action?.payload };
        },
        logOut: (state, action) => {
            console.log(state, action);
            state = {};
        }
    }
})

export default userSlice.reducer
export const userActions = userSlice.actions