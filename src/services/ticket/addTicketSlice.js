import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    error: '',
}

export const createTicket = createAsyncThunk('ticket/createTicket', async (newTicket, { dispatch }) => {
    try {
        const { data } = await api.createTicket(newTicket);
        console.log(data)

        dispatch(handleAlerts({ severity: "success", message: "The createTicket async function works " }))
        return data
    } catch (error) {
        console.log(error)
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
            state.error = action.error.message;
        })
    }
})

export default addTicketSlice.reducer;

export const addTicketActions = addTicketSlice.actions;