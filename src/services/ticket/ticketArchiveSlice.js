import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  error: '',
  tickets: [],
  currentPage: null,
  numberOfPages: null,
};

export const getArchivedTicketsBySearch = createAsyncThunk('ticket/getArchivedTicketsBySearch', async ({ page, search }, { dispatch, rejectWithValue }) => {
  const searchQuery = search;
  try {
    const { data } = await api.getArchivedTicketsBySearch(page, searchQuery);

    dispatch(handleAlerts({ severity: 'success', message: 'All archived tickets were retrieved successfully' }));
    return data;
  } catch (error) {
    console.log(error);
    dispatch(handleAlerts({ severity: 'error', message: `getArchivedTicketsBySearch failed with error: ${error.message}` }));
    return rejectWithValue(error);
  }
});

const isPending = (state) => {
  const currentState = state;
  currentState.loading = true;
};
const isFulfilled = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.tickets = action.payload?.data;
  currentState.error = '';
  currentState.currentPage = action.payload?.currentPage;
  currentState.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.tickets = [];
  currentState.error = action.error.message;
};

const ticketArchiveSlice = createSlice({
  name: 'ticketArchive',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getArchivedTicketsBySearch.pending, (state) => isPending(state));
    builder.addCase(getArchivedTicketsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(getArchivedTicketsBySearch.rejected, (state, action) => isRejected(state, action));
  },
});

export default ticketArchiveSlice.reducer;
