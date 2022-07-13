import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  error: '',
};

export const createTicket = createAsyncThunk('ticket/createTicket', async (newTicket, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await api.createTicket(newTicket);
    console.log(data);

    dispatch(handleAlerts({ severity: 'success', message: 'Ticket was successfully created!' }));
    return data;
  } catch (error) {
    dispatch(handleAlerts({ severity: 'error', message: `Ticket was not created. Error: ${error.message}` }));
    return rejectWithValue(error);
  }
});

const addTicketSlice = createSlice({
  name: 'addTicket',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      const currentState = state;
      currentState.loading = true;
    });
    builder.addCase(createTicket.fulfilled, (state) => {
      const currentState = state;
      currentState.loading = false;
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      const currentState = state;
      currentState.loading = false;
      currentState.error = action.payload.message;
    });
  },
});

export default addTicketSlice.reducer;

export const addTicketActions = addTicketSlice.actions;
