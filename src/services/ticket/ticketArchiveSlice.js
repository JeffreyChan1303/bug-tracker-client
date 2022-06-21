import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    error: '',
    tickets: [],
    currentPage: null,
    numberOfPages: null,
}

export const getArchivedTickets = createAsyncThunk('ticket/getArchivedTickets', async ( page, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.getArchivedTickets(page);

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Archived tickets were not able to be retrieved. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

export const getArchivedTicketsBySearch = createAsyncThunk('ticket/getArchivedTicketsBySearch', async ({ page, search }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;
    try {
        const { data } = await api.getArchivedTicketsBySearch(page, searchQuery);

        dispatch(handleAlerts({ severity: 'success', message: `All archived tickets were retrieved successfully` }));
        return data;
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `getArchivedTicketsBySearch failed with error: ${error.message}`}));
        return rejectWithValue(error)
    }
})

const isPending = (state) => {
    state.loading = true;
};
const isFulfilled = (state, action) => {
    state.loading = false;
    state.tickets = action.payload?.data;
    state.error = '';
    state.currentPage = action.payload?.currentPage;
    state.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
    state.loading = false;
    state.tickets = [];
    state.error = action.error.message;
};


const ticketArchiveSlice = createSlice({
    name: 'ticketArchive',
    initialState,
    extraReducers: builder => {
        builder.addCase(getArchivedTickets.pending, (state) => isPending(state));
        builder.addCase(getArchivedTickets.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getArchivedTickets.rejected, (state, action) => isRejected(state, action));
        builder.addCase(getArchivedTicketsBySearch.pending, (state) => isPending(state));
        builder.addCase(getArchivedTicketsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getArchivedTicketsBySearch.rejected, (state, action) => isRejected(state, action));
    }
})

export default ticketArchiveSlice.reducer;
