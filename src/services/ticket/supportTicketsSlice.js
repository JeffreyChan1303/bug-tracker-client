import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  getSupportTicketsBySearch: {
    loading: false,
    error: '',
  },
  addSupportTicket: {
    loading: false,
    error: '',
  },
  tickets: [],
  currentPage: null,
  numberOfPages: null,
};

export const getSupportTicketsBySearch = createAsyncThunk(
  'ticket/getSupportTickets',
  async ({ page, search }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.getSupportTicketsBySearch(page, search);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to get support tickets. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const addSupportTicket = createAsyncThunk(
  'ticket/addSupportTicket',
  async (ticketData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.addSupportTicket(ticketData);

      dispatch(
        handleAlerts({ severity: 'success', message: `Successfully submitted support ticket` })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to add support ticket. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const supportTicketsSlice = createSlice({
  name: 'Support Tickets',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSupportTicketsBySearch.pending, (state) => {
      const currentState = state;
      currentState.getSupportTicketsBySearch.loading = true;
    });
    builder.addCase(getSupportTicketsBySearch.fulfilled, (state, action) => {
      const currentState = state;
      currentState.getSupportTicketsBySearch.loading = false;
      currentState.tickets = action.payload.data;
      currentState.currentPage = action.payload.currentPage;
      currentState.numberOfPages = action.payload.numberOfPages;
    });
    builder.addCase(getSupportTicketsBySearch.rejected, (state, action) => {
      const currentState = state;
      currentState.getSupportTicketsBySearch.loading = false;
      currentState.getSupportTicketsBySearch.error = action.payload.message;
    });

    // add support ticket
    builder.addCase(addSupportTicket.pending, (state) => {
      const currentState = state;
      currentState.addSupportTicket.loading = true;
    });
    builder.addCase(addSupportTicket.fulfilled, (state) => {
      const currentState = state;
      currentState.addSupportTicket.loading = false;
    });
    builder.addCase(addSupportTicket.rejected, (state, action) => {
      const currentState = state;
      currentState.addSupportTicket.loading = false;
      currentState.addSupportTicket.error = action.payload.message;
    });
  },
});

export default supportTicketsSlice.reducer;
