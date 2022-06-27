import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    loading: false,
    error: '',
    notifications: [],
}

export const getUserNotifications = createAsyncThunk('user/getUserNotifications', async (userId, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.getUserNotifications(userId);
        console.log(data)

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message:`User notifications were not able to be fetched. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})



const notificationsSlice = createSlice({
    name: 'Notifications',
    initialState,
    extraReducers: builder => {
        builder.addCase(getUserNotifications.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUserNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = action.payload;
        })
        builder.addCase(getUserNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default notificationsSlice.reducer;
export const notificationsActions = notificationsSlice.actions;