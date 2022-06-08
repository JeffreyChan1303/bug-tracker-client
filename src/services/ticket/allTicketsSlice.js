import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import * as api from '../../api/index';

const initialState = {
    loading: false,
    tickets: [],
    error: '',
};

const baseURL = 'http://localhost:9000';

// generates pending, fulfilled, and rejected action types
export const getAllTickets = createAsyncThunk('ticket/getAllTickets', async () => {
    try {
        const { data } = await api.getAllTickets();

        console.log(data);
    } catch (error) {
        console.log(error);
    }
})

export const getAllTicketsBySearch = createAsyncThunk('ticket/getAllTicketsBySearch', async (searchQuery) => {
    try {
        console.log(searchQuery)
        const { data } = await api.getAllTicketsBySearch(searchQuery);

        console.log(data);
    } catch (error) {
        console.log(error);   
    }
})

const allTicketsSlice = createSlice({
    name: 'allTickets',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllTickets.pending, state => {
            state.loading = true;
        })
        builder.addCase(getAllTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = action.payload;
            state.error = '';
        })
        builder.addCase(getAllTickets.rejected, (state, action) => {
            state.loading = false;
            state.tickets = [];
            state.error = action.error.message;
        })
    },
})


export default allTicketsSlice.reducer;


export const allTicketsActions = allTicketsSlice.actions;