import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    error: '',
}

export const deleteTicket = createAsyncThunk('ticket/deleteTicket', async (params, {dispatch, getState, rejectWithValue}) => {
    try {
        const { data } = await api.deleteTicket(params.id);

        dispatch(handleAlerts({ severity: 'success', message: `Ticket id: ${params.id} has been successfully deleted.` }))
        return data
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Ticket was not deleted. Error: ${error.message}`}))
        return rejectWithValue(error)
    }
})

const deleteTicketSlice = createSlice({
    name: 'deleteTicket',
    initialState,
    extraReducers: builder => {
        builder.addCase(deleteTicket.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteTicket.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default deleteTicketSlice.reducer;
