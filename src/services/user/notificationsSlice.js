import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
  getUserNotificationsBySearch: {
    loading: false,
    error: '',
  },
  notifications: [],
  currentPage: null,
  numberOfPages: null,
};

export const getUserNotificationsBySearch = createAsyncThunk(
  'user/getUserNotificationsBySearch',
  async ({ page, search }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;

    try {
      const { data } = await api.getUserNotificationsBySearch(page, searchQuery);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `User notifications were not able to be fetched. Error: ${error.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const deleteUserNotification = createAsyncThunk(
  'user/deleteUserNotification',
  async (createdAt, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.deleteUserNotification(createdAt);

      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `User notification was not able to be deleted. Error: ${error.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const readNotification = createAsyncThunk(
  'user/readNotification',
  async ({ createdAt }, { rejectWithValue }) => {
    try {
      const { data } = await api.readNotification(createdAt);

      return data;
    } catch (error) {
      console.log(error);
      // Failing to read notification does not need an alert
      // dispatch(
      //   handleAlerts({
      //     severity: 'error',
      //     message: `failed to read notification. Error: ${error.response.data.message}`,
      //   })
      // );
      return rejectWithValue(error);
    }
  }
);

export const readAllNotifications = createAsyncThunk(
  'user/readAllNotifications',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.readAllNotifications();

      dispatch(
        handleAlerts({ severity: 'success', message: `Successfully read all notifications` })
      );
      return data;
    } catch (error) {
      console.log(error);
      dispatch(
        handleAlerts({
          severity: 'error',
          message: `failed to read all notifications. Error: ${error.message}`,
        })
      );
      return rejectWithValue(error);
    }
  }
);

const notificationsSlice = createSlice({
  name: 'Notifications',
  initialState,
  extraReducers: (builder) => {
    // Get User Notifications By Search
    builder.addCase(getUserNotificationsBySearch.pending, (state) => {
      const currentState = state;
      currentState.getUserNotificationsBySearch.loading = true;
    });
    builder.addCase(getUserNotificationsBySearch.fulfilled, (state, action) => {
      const currentState = state;
      currentState.getUserNotificationsBySearch.loading = false;
      currentState.notifications = action.payload.notifications;
      currentState.currentPage = action.payload.currentPage;
      currentState.numberOfPages = action.payload.numberOfPages;
    });
    builder.addCase(getUserNotificationsBySearch.rejected, (state, action) => {
      console.log(action);
      const currentState = state;
      currentState.getUserNotificationsBySearch.loading = false;
      currentState.getUserNotificationsBySearch.error = action.payload.message;
    });
  },
});

export default notificationsSlice.reducer;
export const notificationsActions = notificationsSlice.actions;
