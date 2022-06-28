import { createSlice, createAsyncThunk, findNonSerializableValue } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    getUserNotifications: {
        loading: false,
        error: '',
    },
    createUsersNotification: {
        loading: false,
        error: '',
    },
    deleteUserNotification: {
        loading: false,
        error: '',
    },
    notifications: [],
}

export const getUserNotifications = createAsyncThunk('user/getUserNotifications', async (params, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.getUserNotifications();

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message:`User notifications were not able to be fetched. Error: ${error.message}` }));
        return rejectWithValue(error);
    }
})

export const createUsersNotification = createAsyncThunk('user/createUsersNotifications', async (params, { dispatch, rejectWithValue }) => {
    try {
        const { data } = api.createUsersNotification(params);

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Users notification was not able to be created. Error: ${error.message}` }));
        return rejectWithValue(error);
    }
})

export const deleteUserNotification = createAsyncThunk('user/deleteUserNotification', async (params, { dispatch, rejectWithValue }) => {
    try {

    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `User notification was not able to be deleted. Error: ${error.message}` }));
        return rejectWithValue(error);
    }
})



const notificationsSlice = createSlice({
    name: 'Notifications',
    initialState,
    extraReducers: builder => {
        // Get User Notifications
        builder.addCase(getUserNotifications.pending, (state) => {
            state.getUserNotifications.loading = true;
        })
        builder.addCase(getUserNotifications.fulfilled, (state, action) => {
            state.getUserNotifications.loading = false;
            state.notifications = action.payload;
        })
        builder.addCase(getUserNotifications.rejected, (state, action) => {
            state.getUserNotifications.loading = false;
            state.error = action.payload.message;
        })

        // Create Users Notification
        builder.addCase(createUsersNotification.pending, (state) => {
            state.createUsersNotification.loading = true;
        })
        builder.addCase(createUsersNotification.fulfilled, (state, action) => {
            state.createUsersNotification.loading = false;
        })
        builder.addCase(createUsersNotification.rejected, (state, action) => {
            state.createUsersNotification.loading = false;
            state.createUsersNotification.error = action.payload.message;
        })

        // Delete User Notification
        builder.addCase(deleteUserNotification.pending, (state) => {
            state.deleteUserNotification.loading = true;
        })
        builder.addCase(deleteUserNotification.fulfilled, (state, action) => {
            state.deleteUserNotification.loading = false;
        })
        builder.addCase(deleteUserNotification.rejected, (state, action) => {
            state.deleteUserNotification.loading = false;
            state.deleteUserNotification.error = action.payload.message;
        })
    }
})

export default notificationsSlice.reducer;
export const notificationsActions = notificationsSlice.actions;