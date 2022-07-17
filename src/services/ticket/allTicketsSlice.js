import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  tickets: [],
  error: '',
  currentPage: null,
  numberOfPages: null,
};

export const getAllTicketsBySearch = createAsyncThunk(
  'ticket/getAllTicketsBySearch',
  async ({ search, page }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;
    try {
      const { data } = await api.getAllTicketsBySearch(page, searchQuery);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(handleAlerts({ severity: 'error', message: `All Tickets Page: ${error.message}` }));
      return rejectWithValue(error);
    }
  }
);

const isPending = (state) => {
  const currentState = state;
  currentState.loading = true;
};
const isFulfilled = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.tickets = action.payload.data;
  currentState.error = '';
  currentState.currentPage = action.payload?.currentPage;
  currentState.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.tickets = [];
  currentState.error = action.payload.message;
};

const allTicketsSlice = createSlice({
  name: 'allTickets',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllTicketsBySearch.pending, (state) => isPending(state));
    builder.addCase(getAllTicketsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(getAllTicketsBySearch.rejected, (state, action) => isRejected(state, action));
  },
});

export default allTicketsSlice.reducer;

export const allTicketsActions = allTicketsSlice.actions;
