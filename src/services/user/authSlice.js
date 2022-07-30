import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { userActions } from './userSlice';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  loading: false,
  error: '',
  signUpSuccess: false,
};

// generates pending, fulfilled, and rejected action types
export const signIn = createAsyncThunk(
  'users/signin',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch(userActions.auth(data));

      // window.location.reload();
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `Failed to sign in. Error: ${error.response.data.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const googleSignin = createAsyncThunk(
  'users/googleSignIn',
  async ({ userObject, token }, { dispatch, rejectWithValue }) => {
    try {
      // this should check if the user is in the database, if so, log them in by returning the user object in the database!
      console.log(userObject, token);
      const { data } = await api.googleSignin(userObject, token);

      dispatch(userActions.auth(data));
      dispatch(
        handleAlerts({
          severity: 'success',
          message: 'successfully loged in using google credentials',
        })
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({ severity: 'error', message: `Failed to sign in. Error: ${error.response.data.message}` })
      );
      return rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk('users/signup', async (formData, { dispatch }) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data);

    // this is commented since we require email verification before loging in now
    // dispatch(userActions.auth(data));
    dispatch(handleAlerts({ severity: 'success', message: 'successfully signed up' }));

    // window.location.reload();
    return;
  } catch (error) {
    console.log(error);
    dispatch(
      handleAlerts({
        severity: 'error',
        message: `Failed to sign up. Error: ${error.response.data.message}`,
      })
    );
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
  reducers: {
    revertSignUpSuccess: (state) => ({ ...state, signUpSuccess: false }),
  },
  extraReducers: (builder) => {
    // sign in cases
    builder.addCase(signIn.pending, (state) => isPending(state));
    builder.addCase(signIn.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(signIn.rejected, (state, action) => isRejected(state, action));
    // google sign in
    builder.addCase(googleSignin.pending, (state) => isPending(state));
    builder.addCase(googleSignin.fulfilled, (state, action) => isFulfilled(state, action));
    builder.addCase(googleSignin.rejected, (state, action) => isRejected(state, action));

    // sign up cases
    builder.addCase(signUp.pending, (state) => isPending(state));
    builder.addCase(signUp.fulfilled, (state) => {
      const currentState = state;
      currentState.loading = false;
      currentState.signUpSuccess = true;
    });
    builder.addCase(signUp.rejected, (state, action) => isRejected(state, action));
  },
});

export default authSlice.reducer;
export const { revertSignUpSuccess } = authSlice.actions;
