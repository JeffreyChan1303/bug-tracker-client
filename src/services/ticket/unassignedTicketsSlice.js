import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    tickets: [],
    numberOfUnassignedTickets: 0,
    loading: false,
    error: '',
}

export const getUnassignedTickets = createAsyncThunk('ticket/getUnassignedTickets', async ( params, { dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getUnassignedTickets();

        return data;
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get number of unassigned tickets. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

const unassignedTicketsSlice = createSlice({
    name: 'Unassigned Tickets',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUnassignedTickets.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUnassignedTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        builder.addCase(getUnassignedTickets.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        })
    }
})

export default unassignedTicketsSlice.reducer;
