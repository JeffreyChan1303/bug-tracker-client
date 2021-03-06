import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  users: [],
  error: '',
  currentPage: null,
  numberOfPages: null,
};

export const getAllUsersBySearch = createAsyncThunk('user/getAllUsersBySearch', async ({ search, page }, { dispatch, rejectWithValue }) => {
  const searchQuery = search;

  try {
    const { data } = await api.getAllUsersBySearch(page, searchQuery);

    return data;
  } catch (error) {
    console.log(error);
    dispatch(handleAlerts({ severity: 'error', message: `Failed to fetch all users. error: ${error.message}` }));
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
  currentState.users = action.payload.data;
  currentState.error = '';
  currentState.currentPage = action.payload?.currentPage;
  currentState.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.users = [];
  currentState.error = action.payload.message;
};

const manageUserRolesSlice = createSlice({
  name: 'manageUserRoles',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllUsersBySearch.pending, (state) => isPending(state));
    builder.addCase(getAllUsersBySearch.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(getAllUsersBySearch.rejected, (state, action) => isRejected(state, action));
  },
});

export default manageUserRolesSlice.reducer;

export const manageUserRolesActions = manageUserRolesSlice.actions;
