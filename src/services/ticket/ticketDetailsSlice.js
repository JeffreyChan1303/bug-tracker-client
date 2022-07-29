import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  getTicketDetails: {
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
          message: data.message,
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
    });
    builder.addCase(getTicketDetails.rejected, (state, action) => {
      const currentState = state;
      currentState.getTicketDetails.loading = false;
      currentState.getTicketDetails.error = action.payload.message;
    });
  },
});

export default ticketDetailsSlice.reducer;
export const { searchTicketComments } = ticketDetailsSlice.actions;
