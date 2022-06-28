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
    currentPage: null,
    numberOfPages: null,
}

export const getUserNotifications = createAsyncThunk('user/getUserNotifications', async (page, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.getUserNotifications(page);

        console.log(data)
        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message:`User notifications were not able to be fetched. Error: ${error.message}` }));
        return rejectWithValue(error);
    }
})

export const getUserNotificationsBySearch = createAsyncThunk('user/getUserNotificationsBySearch', async ({ page, search }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;
    try {
        const { data } = await api.getUserNotificationsBySearch(page, searchQuery);

        console.log(data)
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

export const deleteUserNotification = createAsyncThunk('user/deleteUserNotification', async (createdAt, { dispatch, rejectWithValue }) => {
    try {
        const { data } = api.deleteUserNotification(createdAt);


        return data;
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
            state.notifications = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;
        })
        builder.addCase(getUserNotifications.rejected, (state, action) => {
            state.getUserNotifications.loading = false;
            state.getUserNotifications.error = action.payload.message;
        })

        // Get User Notifications By Search

        builder.addCase(getUserNotificationsBySearch.pending, (state) => {
            state.getUserNotifications.loading = true;
        })
        builder.addCase(getUserNotificationsBySearch.fulfilled, (state, action) => {
            state.getUserNotifications.loading = false;
            state.notifications = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;
        })
        builder.addCase(getUserNotificationsBySearch.rejected, (state, action) => {
            state.getUserNotificationsBySearch.loading = false;
            state.getUserNotificationsBySearch.error = action.payload.message;
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