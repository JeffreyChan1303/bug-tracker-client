import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    tickets: [],
    numberOfTickets: 0,
    loading: false,
    error: '',
}

export const getUnassignedTickets = createAsyncThunk('ticket/getUnassignedTickets', async ( params, { dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getUnassignedTickets();

        return data;
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get unassigned tickets. Error: ${error.message}` }));
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
            state.tickets = action.payload;
            state.numberOfTickets = action.payload.length;
        })
        builder.addCase(getUnassignedTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        })
    }
})

export default unassignedTicketsSlice.reducer;
