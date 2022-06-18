import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    tickets: [],
    error: '',
    currentPage: null,
    numberOfPages: null,
};


// generates pending, fulfilled, and rejected action types
export const getAllTickets = createAsyncThunk('ticket/getAllTickets', async (page, {dispatch, getState}) => {
    try {
        const { data } = await api.getAllTickets(page);

        // console.log(data);

        return data
    } catch (error) {
        console.log(error);

        const { allTickets } = getState()
        // console.log(loading)
        dispatch(handleAlerts({ severity: 'error', message: `All Tickets Page: ${error.message}` }))
        allTickets.loading = false; // WHY DOES THIS make the dispatch below not run????QQ??
        // This state change seems to end the function for some reason??? I dont know how this works...

        console.log(allTickets.loading)

    }
})

export const getAllTicketsBySearch = createAsyncThunk('ticket/getAllTicketsBySearch', async ({ search, page } , {dispatch, getState}) => {
    const searchQuery = search;
    // console.log(searchQuery, page)
    try {
        const { data } = await api.getAllTicketsBySearch(searchQuery, page);

        // console.log(data);
        return data
    } catch (error) {
        console.log(error);

        const { allTickets } = getState()
        // console.log(loading)
        dispatch(handleAlerts({ severity: 'error', message: `All Tickets Page: ${error.message}` }))
        allTickets.loading = false; // WHY DOES THIS make the dispatch below not run????QQ??
        // This state change seems to end the function for some reason??? I dont know how this works...
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