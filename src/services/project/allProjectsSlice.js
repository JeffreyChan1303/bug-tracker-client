import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  projects: [],
  error: '',
  currentPage: null,
  numberOfPages: null,
};

export const getAllProjectsBySearch = createAsyncThunk(
  'project/getAllProjectsBySearch',
  async ({ search, page }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;

    try {
      const { data } = await api.getAllProjectsBySearch(page, searchQuery);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `All Tickets Page: ${error.response.data.message}`,
        })
      );
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
  currentState.projects = action.payload.data;
  currentState.error = '';
  currentState.currentPage = action.payload?.currentPage;
  currentState.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.projects = [];
  currentState.error = action.payload.message;
};

const allProjectsSlice = createSlice({
  name: 'allProjects',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProjectsBySearch.pending, (state) => isPending(state));
    builder.addCase(getAllProjectsBySearch.fulfilled, (state, action) =>
      isFulfilled(state, action)
    );
    builder.addCase(getAllProjectsBySearch.rejected, (state, action) => isRejected(state, action));
  },
});

export default allProjectsSlice.reducer;

export const allProjectsActions = allProjectsSlice.actions;
