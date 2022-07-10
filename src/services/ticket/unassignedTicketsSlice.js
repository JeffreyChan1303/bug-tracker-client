import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    tickets: [],
    numberOfTickets: 0,
    currentPage: null,
    numberOfPages: null,
    loading: false,
    error: '',
}

export const getUnassignedTickets = createAsyncThunk('ticket/getUnassignedTickets', async ({ page, search }, { dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getUnassignedTickets(page, search);

        return data;
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get unassigned tickets. Error: ${error.message}` }));
        return rejectWithValue(error);
    }
})

export const claimTicket = createAsyncThunk('ticket/claimTicket', async (ticketId, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.claimTicket(ticketId);
        dispatch(handleAlerts({ severity: 'success', message: `Successfully claimed the ticket` }));

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Failed to claim ticket. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

const unassignedTicketsSlice = createSlice({
    name: 'Unassigned Tickets',
    initialState,
    extraReducers: builder => {
        // Get Unassigned Tickets
        builder.addCase(getUnassignedTickets.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUnassignedTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.tickets = action.payload.tickets;
            state.numberOfTickets = action.payload.numberOfTickets;
            state.currentPage = action.payload?.currentPage;
            state.numberOfPages = action.payload?.numberOfPages;
        })
        builder.addCase(getUnassignedTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        })

        // claim ticket
        builder.addCase(claimTicket.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(claimTicket.fulfilled, (state) => {
            state.loading = false;
        })
        builder.addCase(claimTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        })
    }
})

export default unassignedTicketsSlice.reducer;
