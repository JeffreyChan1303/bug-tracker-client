import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  setAuthData: {
    loading: false,
    error: '',
  },
  authData: null,
};

export const setAuthData = createAsyncThunk('user/setAuthData', async (params, { rejectWithValue }) => {
  try {
    const data = JSON.parse(localStorage.getItem('profile'));

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

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
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
