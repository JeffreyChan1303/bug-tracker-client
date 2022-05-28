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
            localStorage.clear();
            return { ...state, authData: null };
        },
        signIn: (formData, navigate) => {
            try {

            } catch (error) {
                console.log(error)
            }
        },
        signUp: (formData, navigate) => {
            try {
                
            } catch (error) {
               console.log(error) 
            }
        }
    }
})

export default userSlice.reducer
export const userActions = userSlice.actions