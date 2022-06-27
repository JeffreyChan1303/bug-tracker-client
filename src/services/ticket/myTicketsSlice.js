import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    loading: false,
    tickets: [],
    error: '',
    currentPage: null,
    numberOfPages: null,
};

// generates pending, fulfilled, and rejected action types
export const getMyTickets = createAsyncThunk('ticket/getMyTickets', async (page, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.getMyTickets(page);

        console.log(data);

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `My tickets were not able to be fetched. Error: ${error.message}`}));
        return rejectWithValue(error)
    }
})

export const getMyTicketsBySearch = createAsyncThunk('ticket/getMyTicketsBySearch', async ({ search, page } , { dispatch, rejectWithValue }) => {
    const searchQuery = search;
    // console.log(searchQuery, page)
    try {
        const { data } = await api.getMyTicketsBySearch(page, searchQuery);

        // console.log(data);
        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `My tickets were not able to be fetched. Error: ${error.message}`}));
        return rejectWithValue(error)
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

const myTicketsSlice = createSlice({
    name: 'myTickets',
    initialState,
    extraReducers: builder => {
        builder.addCase(getMyTickets.pending, (state) => isPending(state));
        builder.addCase(getMyTickets.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getMyTickets.rejected, (state, action) => isRejected(state, action));
        builder.addCase(getMyTicketsBySearch.pending, (state) => isPending(state));
        builder.addCase(getMyTicketsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getMyTicketsBySearch.rejected, (state, action) => isRejected(state, action));
    },
})


export default myTicketsSlice.reducer;


export const myTicketsActions = myTicketsSlice.actions;