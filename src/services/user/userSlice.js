import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  setAuthData: {
    loading: false,
    error: '',
  },
  emailVerification: {
    loading: false,
    error: '',
  },
  authData: null,
};

export const setAuthData = createAsyncThunk(
  'user/setAuthData',
  async (params, { rejectWithValue }) => {
    try {
      const data = JSON.parse(localStorage.getItem('profile'));

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const emailVerification = createAsyncThunk(
  'user/emailVarification',
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.emailVerification(token);
      dispatch(
        handleAlerts({ serverity: 'success', message: 'email has been successfully varified' })
      );

      return data;
    } catch (error) {
      console.log(error);
      dispatch(handleAlerts({ serverity: 'error', message: `${error.response.data.message}` }));
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    auth: (state, action) => {
      // put into local storage so computer remembers device
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      console.log(action?.payload);
      // change the current state
      return { ...state, authData: action?.payload };
    },
    logout: (state) => {
      localStorage.clear();
      window.location.reload();
      return { ...state, authData: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAuthData.pending, (state) => {
      const currentState = state;
      currentState.setAuthData.loading = true;
    });
    builder.addCase(setAuthData.fulfilled, (state, action) => {
      const currentState = state;
      currentState.setAuthData.loading = false;
      currentState.authData = action.payload;
    });
    builder.addCase(setAuthData.rejected, (state, action) => {
      const currentState = state;
      currentState.setAuthData.loading = false;
      currentState.setAuthData.error = action.payload.message;
    });
    builder.addCase(emailVerification.pending, (state) => {
      const currentState = state;
      currentState.emailVerification.loading = true;
    });
    builder.addCase(emailVerification.fulfilled, (state) => {
      const currentState = state;
      currentState.emailVerification.loading = false;
    });
    builder.addCase(emailVerification.rejected, (state, action) => {
      const currentState = state;
      currentState.emailVerification.loading = false;
      currentState.emailVerification.error = action.payload.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
