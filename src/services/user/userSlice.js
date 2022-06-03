import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import axios from 'axios';


// state is the state of the whole USER!! that is online!!
const initialState = {

};


export const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        auth: (state = { authData: null }, action) => {
            // put into local storage so computer remembers device
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            console.log(action?.payload);
            // change the current state
            return { ...state, authData: action?.payload };
        },
        logout: (state, action) => {
            localStorage.clear();
            return { ...state, authData: null };
        },
    }
})

export default userSlice.reducer
export const userActions = userSlice.actions