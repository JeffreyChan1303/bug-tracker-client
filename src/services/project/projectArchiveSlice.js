import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  error: '',
  projects: [],
  currentPage: null,
  numberOfPages: null,
};

export const getArchivedProjectsBySearch = createAsyncThunk(
  'project/getArchivedProjectsBySearch',
  async ({ page, search }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;
    try {
      const { data } = await api.getArchivedProjectsBySearch(page, searchQuery);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `getArchivedProjectsBySearch failed with error: ${error.response.data.message}`,
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
  currentState.projects = action.payload?.data;
  currentState.error = '';
  currentState.currentPage = action.payload?.currentPage;
  currentState.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.projects = [];
  currentState.error = action.error.response.data.message;
};

const projectArchiveSlice = createSlice({
  name: 'projectArchive',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getArchivedProjectsBySearch.pending, (state) => isPending(state));
    builder.addCase(getArchivedProjectsBySearch.fulfilled, (state, action) =>
      isFulfilled(state, action)
    );
    builder.addCase(getArchivedProjectsBySearch.rejected, (state, action) =>
      isRejected(state, action)
    );
  },
});

export default projectArchiveSlice.reducer;
