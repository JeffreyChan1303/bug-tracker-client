import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    error: '',
}

export const updateTicket = createAsyncThunk('ticket/updateTicket', async (newTicket, { dispatch, rejectWithValue }) => {
    try {
        console.log("updatedTicket :", newTicket);
        const { data } = await api.updateTicket(newTicket);
        console.log(data)

        dispatch(handleAlerts({ severity: 'success', message: 'Ticket was successfully updated' }));

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Ticket was not able to be edited. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

const editTicketSlice = createSlice({
    name: 'editTicket',
    initialState,
    extraReducers: builder => {
        builder.addCase(updateTicket.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateTicket.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default editTicketSlice.reducer;