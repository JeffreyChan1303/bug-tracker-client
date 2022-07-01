import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    getTicketDetails: {
        loading: false,
        error: '',
    },
    updateTicket: {
        loading: false,
        error: '',
    },
    moveTicketToArchive: {
        loading: false,
        error: '',
    },
    restoreTicketFromArchive: {
        loading: false,
        error: '',
    },
    deleteTicketFromArchive: {
        loading: false,
        error: '',
    },
    addTicketComment: {
        loading: false,
        error: '',
    },
    deleteTicketComment: {
        loading: false,
        error: '',
    },
    ticket: {},
}

export const getTicketDetails = createAsyncThunk('ticket/getTicketDetails', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getTicketDetails(id);
        // console.log(data);
        // sorts the ticket history from newest to oldest
        data.ticketHistory.reverse();
        data.comments.reverse();
        
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

export const moveTicketToArchive = createAsyncThunk('ticket/moveTicketToArchive', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.moveTicketToArchive(id);

        dispatch(handleAlerts({ severity: 'success', message: `Ticket has been successfully deleted and moved to the Ticket Archive.` }))
        return data
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Ticket failed to delete. Error: ${error.message}`}))

        return rejectWithValue(error)
    }
})

export const restoreTicketFromArchive = createAsyncThunk('ticket/restoreTicketFromArchiveTicketFromArchive', async (id, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.restoreTicketFromArchive(id);

        dispatch(handleAlerts({ severity: 'success', message: `Ticket has been successfully restoreTicketFromArchiveed from the Ticket Archive.` }))
        return data
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Ticket failed to be restore ticket from archive. Error: ${error.message}`}))

        return rejectWithValue(error)
    }
})

export const deleteTicketFromArchive = createAsyncThunk('ticket/deleteTicketFromArchive', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.deleteTicketFromArchive(id);

        dispatch(handleAlerts({ severity: 'success', message: `Ticket has been successfully deleted from the Ticket Archive.` }))
        return data
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Ticket failed to delete. Error: ${error.message}`}))
        return rejectWithValue(error)
    }
})

export const addTicketComment = createAsyncThunk('ticket/addTicketComment', async ({ id, comment }, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.addTicketComment(id, comment);

        dispatch(handleAlerts({ severity: 'success', message: 'Comment has been successfully added.' }));;

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Comment failed to save. Error: ${error.message}`}));
        return rejectWithValue(error);
    }
})

export const deleteTicketComment = createAsyncThunk('ticket/deleteTicketComment', async ({ ticketId, commentCreatedAt }, { dispatch, rejectWithValue }) => {
    try {
        const { data } = api.deleteTicketComment(ticketId, { commentCreatedAt: commentCreatedAt });

        dispatch(handleAlerts({ severity: 'success', message: 'Comment was deleted successfully.'}));

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Ticket comment was not able to be deleted. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

const ticketDetailsSlice = createSlice({
    name: 'ticketDetails',
    initialState,
    reducers: {
        searchTicketComments: (searchQuery) => {

        },
    },
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

        // Move Ticket To Archive
        builder.addCase(moveTicketToArchive.pending, (state) => {
            state.moveTicketToArchive.loading = true;
        })
        builder.addCase(moveTicketToArchive.fulfilled, (state) => {
            state.moveTicketToArchive.loading = false;
        })
        builder.addCase(moveTicketToArchive.rejected, (state, action) => {
            state.moveTicketToArchive.loading = false;
            state.moveTicketToArchive.error = action.payload.message;
        })

        // Restore Ticket From Archive
        builder.addCase(restoreTicketFromArchive.pending, (state) => {
            state.restoreTicketFromArchive.loading = true;
        })
        builder.addCase(restoreTicketFromArchive.fulfilled, (state) => {
            state.restoreTicketFromArchive.loading = false;
        })
        builder.addCase(restoreTicketFromArchive.rejected, (state, action) => {
            state.restoreTicketFromArchive.loading = false;
            state.restoreTicketFromArchive.error = action.payload.message;
        })

        // Delete Ticket From Archive
        builder.addCase(deleteTicketFromArchive.pending, (state) => {
            state.deleteTicketFromArchive.loading = true;
        })
        builder.addCase(deleteTicketFromArchive.fulfilled, (state) => {
            state.deleteTicketFromArchive.loading = false;
        })
        builder.addCase(deleteTicketFromArchive.rejected, (state, action) => {
            state.deleteTicketFromArchive.loading = false;
            state.deleteTicketFromArchive.error = action.payload.message;
        })

        // Add Ticket Comment
        builder.addCase(addTicketComment.pending, (state) => {
            state.addTicketComment.loading = true;
        })
        builder.addCase(addTicketComment.fulfilled, (state) => {
            state.addTicketComment.loading = false;
        })
        builder.addCase(addTicketComment.rejected, (state, action) => {
            state.addTicketComment.loading = false;
            state.addTicketComment.error = action.payload.message;
        })

        // Delete Ticket Comment
        builder.addCase(deleteTicketComment.pending, (state) => {
            state.deleteTicketComment.loading = true;
        })
        builder.addCase(deleteTicketComment.fulfilled, (state) => {
            state.deleteTicketComment.loading = false;
        })
        builder.addCase(deleteTicketComment.rejected, (state, action) => {
            state.deleteTicketComment.loading = false;
            state.deleteTicketComment.error = action.payload.message;
        })
    }
})

export default ticketDetailsSlice.reducer;

