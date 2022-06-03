import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { userActions } from "./userSlice";

const initialState = {
    loading: false,
    error: '',
};

const dispatch = useDispatch();

// generates pending, fulfilled, and rejected action types
export const signIn = createAsyncThunk('users/signin', () => {
    try {
        const { data } = await axios.get('http://localhost:9000/users/signin');

        dispatch(userActions.auth(data));
    } catch (error) {
        console.log(error);
    }
});

export const signUp = createAsyncThunk('users/signup', (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:9000/users/signup');

        dispatch(userActions.logout(data));
    } catch (error) {
        console.log(error);  
    }
})

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    extraReducers: builder => {
        //sign in cases
        builder.addCase(signIn.pending, state => {
            state.loading = true;
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // sign up cases
        builder.addCase(signUp.pending, state => {
            state.loading = true;
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    },
})


export default authSlice.reducer;


export const authActions = authSlice.actions;