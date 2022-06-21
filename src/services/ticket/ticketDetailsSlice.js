import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    getTicketDetails: {
        loading: false,
        error: '',
    },
    updateTicket: {
        loading: false,
        error: '',
    },
    deleteTicket: {
        loading: false,
        error: '',
    },
    ticket: {},
}

export const getTicketDetails = createAsyncThunk('ticket/getTicketDetails', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getTicketDetails(id);
        // console.log(data);
        
        return data;
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get ticket details of ticket id: ${id}`}));
        return rejectWithValue(error);
    }
});

export const updateTicket = createAsyncThunk('ticket/updateTicket', async (newTicket, { dispatch, rejectWithValue }) => {
    try {
        console.log("updatedTicket :", newTicket);
        const { data } = await api.updateTicket(newTicket);

        dispatch(handleAlerts({ severity: 'success', message: `Ticket Id: ${newTicket._id} was successfully updated` }));

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Ticket was not able to be edited. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

export const deleteTicket = createAsyncThunk('ticket/deleteTicket', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.deleteTicket(id);

        dispatch(handleAlerts({ severity: 'success', message: `Ticket id: ${id} has been successfully deleted.` }))
        return data
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Ticket failed to delete. Error: ${error.message}`}))

        return rejectWithValue(error)
    }
})


const ticketDetailsSlice = createSlice({
    name: 'ticketDetails',
    initialState,
    extraReducers: builder => {
        // Get Ticket Details
        builder.addCase(getTicketDetails.pending, (state) => {
            state.getTicketDetails.loading = true;
        })
        builder.addCase(getTicketDetails.fulfilled, (state, action) => {
            state.getTicketDetails.loading = false;
            state.ticket = action.payload;
        })
        builder.addCase(getTicketDetails.rejected, (state, action) => {
            state.getTicketDetails.loading = false;
            state.getTicketDetails.error = action.payload.message;
        })
        // Update Ticket
        builder.addCase(updateTicket.pending, (state) => {
            state.updateTicket.loading = true;
        })
        builder.addCase(updateTicket.fulfilled, (state) => {
            state.updateTicket.loading = false;
        })
        builder.addCase(updateTicket.rejected, (state, action) => {
            state.updateTicket.loading = false;
            state.updateTicket.error = action.payload.message;
        })

        // Delete Ticket
        builder.addCase(deleteTicket.pending, (state) => {
            state.deleteTicket.loading = true;
        })
        builder.addCase(deleteTicket.fulfilled, (state) => {
            state.deleteTicket.loading = false;
        })
        builder.addCase(deleteTicket.rejected, (state, action) => {
            state.deleteTicket.loading = false;
            state.deleteTicket.error = action.payload.message;
        })
    }
})

export default ticketDetailsSlice.reducer;

