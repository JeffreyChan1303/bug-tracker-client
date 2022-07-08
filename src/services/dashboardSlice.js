import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/index';
import { handleAlerts } from './alertsSlice';

const initialState = {
    getActiveProjects: {
        data: null,
        loading: false,
        error: '',
    },
    getActiveTickets: {
        data: null,
        loading: false,
        error: '',
    },
    getUnassignedTickets: {
        data: null,
        loading: false,
        error: '',
    },
    getUnreadNotifications: {
        data: null,
        loading: false,
        error: '',
    }
}

export const getActiveProjects = createAsyncThunk('project/getActiveProjects', async ( params, { dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getActiveProjects();
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get number of active projects. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

export const getActiveTickets = createAsyncThunk('ticket/getActiveTickets', async ( params, { dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getActiveTickets();
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get number of active tickets. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

export const getUnassignedTickets = createAsyncThunk('ticket/getUnassignedTickets', async ( params, { dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getUnassignedTickets();
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get number of unassigned tickets. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

export const getUnreadNotifications = createAsyncThunk('user/getUnreadNotifications', async ( params, { dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getUnreadNotifications();
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get number of unread notifications. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})



const dashboardSlice = createSlice({
    name: 'Dashboard',
    initialState,
    extraReducers: builder => {
        // Get Active Projects
        builder.addCase(getActiveProjects.pending, (state) => {
            state.getActiveProjects.loading = true;
        })
        builder.addCase(getActiveProjects.fulfilled, (state, action) => {
            state.getActiveProjects.loading = false;
            state.getActiveProjects.data = action.payload;
        })
        builder.addCase(getActiveProjects.rejected, (state, action) => {
            state.getActiveProjects.loading = false;
            state.getActiveProjects.error = action.payload.message
        })

        // Get Active Tickets

        builder.addCase(getActiveTickets.pending, (state) => {
            state.getActiveTickets.loading = true;
        })
        builder.addCase(getActiveTickets.fulfilled, (state, action) => {
            state.getActiveTickets.loading = false;
            state.getActiveTickets.data = action.payload;
        })
        builder.addCase(getActiveTickets.rejected, (state, action) => {
            state.getActiveTickets.loading = false;
            state.getActiveTickets.error = action.payload.message
        })

        // Get Unassigned Tickets

        builder.addCase(getUnassignedTickets.pending, (state) => {
            state.getUnassignedTickets.loading = true;
        })
        builder.addCase(getUnassignedTickets.fulfilled, (state, action) => {
            state.getUnassignedTickets.loading = false;
            state.getUnassignedTickets.data = action.payload;
        })
        builder.addCase(getUnassignedTickets.rejected, (state, action) => {
            state.getUnassignedTickets.loading = false;
            state.getUnassignedTickets.error = action.payload.message
        })

        // Get Unread Notifications

        builder.addCase(getUnreadNotifications.pending, (state) => {
            state.getUnreadNotifications.loading = true;
        })
        builder.addCase(getUnreadNotifications.fulfilled, (state, action) => {
            state.getUnreadNotifications.loading = false;
            state.getUnreadNotifications.data = action.payload;
        })
        builder.addCase(getUnreadNotifications.rejected, (state, action) => {
            state.getUnreadNotifications.loading = false;
            state.getUnreadNotifications.error = action.payload.message
        })



    }
})


export default dashboardSlice.reducer;