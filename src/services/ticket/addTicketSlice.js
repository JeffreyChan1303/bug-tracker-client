import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    error: '',
}

export const createTicket = createAsyncThunk('ticket/createTicket', async (newTicket, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.createTicket(newTicket);
        console.log(data)

        dispatch(handleAlerts({ severity: "success", message: "Ticket was successfully created!" }))
        return data
    } catch (error) {
        dispatch(handleAlerts({ severity: "error", message: `Ticket was not created. Error: ${error.message}` }));
        return rejectWithValue(error);
    }
})

const addTicketSlice = createSlice({
    name: "addTicket",
    initialState,
    extraReducers: builder => {
        builder.addCase(createTicket.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createTicket.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(createTicket.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default addTicketSlice.reducer;

export const addTicketActions = addTicketSlice.actions;