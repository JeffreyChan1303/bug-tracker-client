import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  error: '',
};

export const createProject = createAsyncThunk('project/createProject', async (newProject, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await api.createProject(newProject);
    console.log(data);

    dispatch(handleAlerts({ severity: 'success', message: 'Project was successfully created!' }));
    return data;
  } catch (error) {
    dispatch(handleAlerts({ severity: 'error', message: `Project was not created. Error: ${error.message}` }));
    return rejectWithValue(error);
  }
});

const addProjectSlice = createSlice({
  name: 'addProject',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createProject.pending, (state) => {
      const currentState = state;
      currentState.loading = true;
    });
    builder.addCase(createProject.fulfilled, (state) => {
      const currentState = state;
      currentState.loading = false;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      const currentState = state;
      currentState.loading = false;
      currentState.error = action.payload.message;
    });
  },
});

export default addProjectSlice.reducer;

export const addProjectActions = addProjectSlice.actions;
