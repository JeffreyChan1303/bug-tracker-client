import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';

const initialState = {
    loading: false,
    tickets: [],
    error: '',
    currentPage: null,
    numberOfPages: null,
};


// generates pending, fulfilled, and rejected action types
export const getAllTickets = createAsyncThunk('ticket/getAllTickets', async (page) => {
    try {
        const { data } = await api.getAllTickets(page);

        // console.log(data);

        return data
    } catch (error) {
        console.log(error);
    }
})

export const getAllTicketsBySearch = createAsyncThunk('ticket/getAllTicketsBySearch', async ({ search, page } , {dispatch}) => {
    const searchQuery = search;
    // console.log(searchQuery, page)
    try {
        const { data } = await api.getAllTicketsBySearch(searchQuery, page);

        // console.log(data);
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
    state.tickets = action.payload.data;
    state.error = '';
    state.currentPage = action.payload?.currentPage;
    state.numberOfPages = action.payload?.numberOfPages;
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