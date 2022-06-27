import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    loading: false,
    error: '',
    projects: [],
    currentPage: null,
    numberOfPages: null,
}

export const getArchivedProjects = createAsyncThunk('project/getArchivedProjects', async ( page, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.getArchivedProjects(page);

        dispatch(handleAlerts({ severity: 'success', message: 'successfully fetched archived projects! '}))

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Archived projects were not able to be retrieved. Error: ${error.message}` }));
        return rejectWithValue(error)
    }
})

export const getArchivedProjectsBySearch = createAsyncThunk('project/getArchivedProjectsBySearch', async ({ page, search }, { dispatch, rejectWithValue }) => {
    const searchQuery = search;
    try {
        const { data } = await api.getArchivedProjectsBySearch(page, searchQuery);

        dispatch(handleAlerts({ severity: 'success', message: `All archived projects were retrieved successfully` }));
        return data;
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `getArchivedProjectsBySearch failed with error: ${error.message}`}));
        return rejectWithValue(error)
    }
})


const isPending = (state) => {
    state.loading = true;
};
const isFulfilled = (state, action) => {
    state.loading = false;
    state.projects = action.payload?.data;
    state.error = '';
    state.currentPage = action.payload?.currentPage;
    state.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
    state.loading = false;
    state.projects = [];
    state.error = action.error.message;
};


const projectArchiveSlice = createSlice({
    name: 'projectArchive',
    initialState,
    extraReducers: builder => {
        builder.addCase(getArchivedProjects.pending, (state) => isPending(state));
        builder.addCase(getArchivedProjects.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getArchivedProjects.rejected, (state, action) => isRejected(state, action));
        builder.addCase(getArchivedProjectsBySearch.pending, (state) => isPending(state));
        builder.addCase(getArchivedProjectsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getArchivedProjectsBySearch.rejected, (state, action) => isRejected(state, action));
    }
})

export default projectArchiveSlice.reducer;
