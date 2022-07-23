import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  getUnassignedTickets: {
    loading: false,
    error: '',
  },
  claimTicket: {
    loading: false,
    error: '',
  },
  tickets: [],
  numberOfTickets: 0,
  currentPage: null,
  numberOfPages: null,
  loading: false,
  error: '',
};

export const getUnassignedTickets = createAsyncThunk(
  'ticket/getUnassignedTickets',
  async ({ page, search }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.getUnassignedTickets(page, search);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to get unassigned tickets. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const claimTicket = createAsyncThunk(
  'ticket/claimTicket',
  async ({ ticketId, userId }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.claimTicket(ticketId, userId);
      if (userId) {
        dispatch(
          handleAlerts({ severity: 'success', message: 'Successfully assigned the ticket' })
        );
      } else {
        dispatch(handleAlerts({ severity: 'success', message: 'Successfully claimed the ticket' }));
      }

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to claim ticket. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const unassignedTicketsSlice = createSlice({
  name: 'Unassigned Tickets',
  initialState,
  extraReducers: (builder) => {
    // Get Unassigned Tickets
    builder.addCase(getUnassignedTickets.pending, (state) => {
      const currentState = state;
      currentState.getUnassignedTickets.loading = true;
    });
    builder.addCase(getUnassignedTickets.fulfilled, (state, action) => {
      const currentState = state;
      currentState.getUnassignedTickets.loading = false;
      currentState.tickets = action.payload.tickets;
      currentState.numberOfTickets = action.payload.numberOfTickets;
      currentState.currentPage = action.payload?.currentPage;
      currentState.numberOfPages = action.payload?.numberOfPages;
    });
    builder.addCase(getUnassignedTickets.rejected, (state, action) => {
      const currentState = state;
      currentState.getUnassignedTickets.loading = false;
      currentState.getUnassignedTickets.error = action.payload.message;
    });

    // claim ticket
    builder.addCase(claimTicket.pending, (state) => {
      const currentState = state;
      currentState.claimTicket.loading = true;
    });
    builder.addCase(claimTicket.fulfilled, (state) => {
      const currentState = state;
      currentState.claimTicket.loading = false;
    });
    builder.addCase(claimTicket.rejected, (state, action) => {
      const currentState = state;
      currentState.claimTicket.loading = false;
      currentState.claimTicket.error = action.payload.message;
    });
  },
});

export default unassignedTicketsSlice.reducer;
