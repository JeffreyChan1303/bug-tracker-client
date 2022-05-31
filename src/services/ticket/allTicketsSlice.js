import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: false,
    tickets: [],
    error: '',
};


// generates pending, fulfilled, and rejected action types
export const fetchAllTickets = createAsyncThunk('ticket/fetchAllTickets', () => {
    return axios
        .get('http://localhost:9000/tickets/allTickets')
        .then(response => response.data)
})

const allTicketsSlice = createSlice({
    name: 'allTickets',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchAllTickets.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchAllTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = action.payload;
            state.error = '';
        })
        builder.addCase(fetchAllTickets.rejected, (state, action) => {
            state.loading = false;
            state.tickets = [];
            state.error = action.error.message;
        })
    },
})


export default allTicketsSlice.reducer;


export const allTicketsActions = allTicketsSlice.actions;