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
  ticket: {
    comments: [],
    searchedComments: [],
  },
};

export const getTicketDetails = createAsyncThunk(
  'ticket/getTicketDetails',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.getTicketDetails(id);
      // sorts the ticket history from newest to oldest
      data.ticketHistory.reverse();
      data.comments.reverse();

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to get ticket details of ticket id: ${id}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const updateTicket = createAsyncThunk(
  'ticket/updateTicket',
  async (newTicket, { dispatch, rejectWithValue }) => {
    try {
      console.log('updatedTicket :', newTicket);
      const { data } = await api.updateTicket(newTicket);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: `Ticket Id: ${newTicket.ticketId} was successfully updated`,
        })
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Ticket was not able to be edited. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const moveTicketToArchive = createAsyncThunk(
  'ticket/moveTicketToArchive',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.moveTicketToArchive(id);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: 'Ticket has been successfully deleted and moved to the Ticket Archive.',
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Ticket failed to delete. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const restoreTicketFromArchive = createAsyncThunk(
  'ticket/restoreTicketFromArchiveTicketFromArchive',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.restoreTicketFromArchive(id);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: 'Ticket has been successfully restored ticket from the archive.',
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Ticket failed to be restore ticket from archive. Error: ${error.response.data.message}`,
        })
      );

      return rejectWithValue(error);
    }
  }
);

export const deleteTicketFromArchive = createAsyncThunk(
  'ticket/deleteTicketFromArchive',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.deleteTicketFromArchive(id);

      dispatch(
        handleAlerts({
          severity: 'success',
          message: 'Ticket has been successfully deleted from the Ticket Archive.',
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Ticket failed to delete. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const addTicketComment = createAsyncThunk(
  'ticket/addTicketComment',
  async ({ ticketId, comment }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.addTicketComment(ticketId, comment);

      dispatch(
        handleAlerts({ severity: 'success', message: 'Comment has been successfully added.' })
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Comment failed to save. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const deleteTicketComment = createAsyncThunk(
  'ticket/deleteTicketComment',
  async ({ ticketId, commentCreatedAt }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = api.deleteTicketComment(ticketId, { commentCreatedAt });

      dispatch(handleAlerts({ severity: 'success', message: 'Comment was deleted successfully.' }));

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Ticket comment was not able to be deleted. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const ticketDetailsSlice = createSlice({
  name: 'ticketDetails',
  initialState,
  reducers: {
    searchTicketComments: (state, action) => {
      const { searchQuery, commentsCurrentPage, commentsItemsPerPage } = action.payload;
      const search = searchQuery.toLowerCase();

      let newComments = [];
      for (let i = 0; i < state.ticket.comments.length; i += 1) {
        const commentDetails = state.ticket.comments[i];

        if (
          commentDetails.message.toLowerCase().includes(search.toLowerCase()) ||
          commentDetails.name.toLowerCase().includes(search.toLowerCase())
        ) {
          newComments.push(commentDetails);
        }
      }

      // parse and return array that the current item pagees are in
      const numberOfPages = Math.ceil(newComments.length / commentsItemsPerPage);
      newComments = newComments.splice(
        (commentsCurrentPage - 1) * commentsItemsPerPage,
        commentsItemsPerPage
      );

      return {
        ...state,
        ticket: {
          ...state.ticket,
          searchedComments: newComments,
          commentsNumberOfPages: numberOfPages,
        },
      };
    },
  },
  extraReducers: (builder) => {
    // Get Ticket Details
    builder.addCase(getTicketDetails.pending, (state) => {
      const currentState = state;
      currentState.getTicketDetails.loading = true;
    });
    builder.addCase(getTicketDetails.fulfilled, (state, action) => {
      const currentState = state;
      currentState.getTicketDetails.loading = false;
      currentState.ticket = action.payload;
      // currentState.ticket.searchedComments = action.payload.comments;
    });
    builder.addCase(getTicketDetails.rejected, (state, action) => {
      const currentState = state;
      currentState.getTicketDetails.loading = false;
      currentState.getTicketDetails.error = action.payload.message;
    });
    // Update Ticket
    builder.addCase(updateTicket.pending, (state) => {
      const currentState = state;
      currentState.updateTicket.loading = true;
    });
    builder.addCase(updateTicket.fulfilled, (state) => {
      const currentState = state;
      currentState.updateTicket.loading = false;
    });
    builder.addCase(updateTicket.rejected, (state, action) => {
      const currentState = state;
      currentState.updateTicket.loading = false;
      currentState.updateTicket.error = action.payload.message;
    });

    // Move Ticket To Archive
    builder.addCase(moveTicketToArchive.pending, (state) => {
      const currentState = state;
      currentState.moveTicketToArchive.loading = true;
    });
    builder.addCase(moveTicketToArchive.fulfilled, (state) => {
      const currentState = state;
      currentState.moveTicketToArchive.loading = false;
    });
    builder.addCase(moveTicketToArchive.rejected, (state, action) => {
      const currentState = state;
      currentState.moveTicketToArchive.loading = false;
      currentState.moveTicketToArchive.error = action.payload.message;
    });

    // Restore Ticket From Archive
    builder.addCase(restoreTicketFromArchive.pending, (state) => {
      const currentState = state;
      currentState.restoreTicketFromArchive.loading = true;
    });
    builder.addCase(restoreTicketFromArchive.fulfilled, (state) => {
      const currentState = state;
      currentState.restoreTicketFromArchive.loading = false;
    });
    builder.addCase(restoreTicketFromArchive.rejected, (state, action) => {
      const currentState = state;
      currentState.restoreTicketFromArchive.loading = false;
      currentState.restoreTicketFromArchive.error = action.payload.message;
    });

    // Delete Ticket From Archive
    builder.addCase(deleteTicketFromArchive.pending, (state) => {
      const currentState = state;
      currentState.deleteTicketFromArchive.loading = true;
    });
    builder.addCase(deleteTicketFromArchive.fulfilled, (state) => {
      const currentState = state;
      currentState.deleteTicketFromArchive.loading = false;
    });
    builder.addCase(deleteTicketFromArchive.rejected, (state, action) => {
      const currentState = state;
      currentState.deleteTicketFromArchive.loading = false;
      currentState.deleteTicketFromArchive.error = action.payload.message;
    });

    // Add Ticket Comment
    builder.addCase(addTicketComment.pending, (state) => {
      const currentState = state;
      currentState.addTicketComment.loading = true;
    });
    builder.addCase(addTicketComment.fulfilled, (state) => {
      const currentState = state;
      currentState.addTicketComment.loading = false;
    });
    builder.addCase(addTicketComment.rejected, (state, action) => {
      const currentState = state;
      currentState.addTicketComment.loading = false;
      currentState.addTicketComment.error = action.payload.message;
    });

    // Delete Ticket Comment
    builder.addCase(deleteTicketComment.pending, (state) => {
      const currentState = state;
      currentState.deleteTicketComment.loading = true;
    });
    builder.addCase(deleteTicketComment.fulfilled, (state) => {
      const currentState = state;
      currentState.deleteTicketComment.loading = false;
    });
    builder.addCase(deleteTicketComment.rejected, (state, action) => {
      const currentState = state;
      currentState.deleteTicketComment.loading = false;
      currentState.deleteTicketComment.error = action.payload.message;
    });
  },
});

export default ticketDetailsSlice.reducer;
export const { searchTicketComments } = ticketDetailsSlice.actions;
