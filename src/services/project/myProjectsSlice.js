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

export const getMyProjectsBySearch = createAsyncThunk(
  'project/getMyProjectsBySearch',
  async ({ search, page }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;

    try {
      const { data } = await api.getMyProjectsBySearch(page, searchQuery);

      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `My Projects were not able to be fetched. Error: ${error.response.data.message}`,
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
  currentState.error = action.error.response.data.message;
};

const myProjectsSlice = createSlice({
  name: 'myProjects',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMyProjectsBySearch.pending, (state) => isPending(state));
    builder.addCase(getMyProjectsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(getMyProjectsBySearch.rejected, (state, action) => isRejected(state, action));
  },
});

export default myProjectsSlice.reducer;

export const myProjectsActions = myProjectsSlice.actions;
