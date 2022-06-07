import { createSlice } from "@reduxjs/toolkit";


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
            window.location.reload();
            return { ...state, authData: null };
        },
    }
})

export default userSlice.reducer
export const userActions = userSlice.actions