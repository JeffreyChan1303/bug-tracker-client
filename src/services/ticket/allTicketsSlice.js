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

        return data
    } catch (error) {
        console.log(error);
    }
})

export const getAllTicketsBySearch = createAsyncThunk('ticket/getAllTicketsBySearch', async (searchQuery, {dispatch}) => {
    try {
        console.log(searchQuery)
        const { data } = await api.getAllTicketsBySearch(searchQuery);

        console.log(data);
        return data
    } catch (error) {
        console.log(error);   
    }
})

const isPending = (state) => {
    state.loading = true;
};
const isFulfilled = (state, action) => {
    state.loading = false;
    state.tickets = action.payload;
    state.error = '';
};
const isRejected = (state, action) => {
    state.loading = false;
    state.tickets = [];
    state.error = action.error.message;
};

const allTicketsSlice = createSlice({
    name: 'allTickets',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllTickets.pending, (state) => isPending(state));
        builder.addCase(getAllTickets.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getAllTickets.rejected, (state, action) => isRejected(state, action));
        builder.addCase(getAllTicketsBySearch.pending, (state) => isPending(state));
        builder.addCase(getAllTicketsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getAllTicketsBySearch.rejected, (state, action) => isRejected(state, action));
    },
})


export default allTicketsSlice.reducer;


export const allTicketsActions = allTicketsSlice.actions;