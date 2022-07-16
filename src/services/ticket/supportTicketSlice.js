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

const getSupportTicketsBySearch = createAsyncThunk(
  'ticket/getSupportTickets',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

const addSupportTicket = createAsyncThunk(
  'ticket/addSupportTicket',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

const supportTicketSlice = createSlice({
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
  },
});
