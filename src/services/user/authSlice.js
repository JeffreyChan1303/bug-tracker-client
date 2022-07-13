import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { userActions } from './userSlice';

const initialState = {
  loading: false,
  error: '',
};

// generates pending, fulfilled, and rejected action types
export const signIn = createAsyncThunk('users/signin', async (formData, { dispatch }) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch(userActions.auth(data));

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});

export const signUp = createAsyncThunk('users/signup', async (formData, { dispatch }) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);

    dispatch(userActions.auth(data));

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
});

const isPending = (state) => {
  const currentState = state;
  currentState.loading = true;
};
const isFulfilled = (state) => {
  const currentState = state;
  currentState.loading = false;
  currentState.error = '';
};
const isRejected = (state, action) => {
  const currentState = state;
  currentState.loading = false;
  currentState.error = action.error.message;
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  extraReducers: (builder) => {
    // sign in cases
    builder.addCase(signIn.pending, (state) => isPending(state));
    builder.addCase(signIn.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(signIn.rejected, (state, action) => isRejected(state, action));
    // sign up cases
    builder.addCase(signUp.pending, (state) => isPending(state));
    builder.addCase(signUp.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(signUp.rejected, (state, action) => isRejected(state, action));
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
