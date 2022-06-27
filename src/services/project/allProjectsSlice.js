import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    loading: false,
    projects: [],
    error: '',
    currentPage: null,
    numberOfPages: null,
};


// generates pending, fulfilled, and rejected action types
export const getAllProjects = createAsyncThunk('project/getAllProjects', async (page, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getAllProjects(page);

        dispatch(handleAlerts({ severity: 'success', message: 'All Projects page successfully got the items'}))
        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `All Projects Page: ${error.message}` }))
        return rejectWithValue(error)
    }
})

export const getAllProjectsBySearch = createAsyncThunk('project/getAllProjectsBySearch', async ({ search, page } , {dispatch, rejectWithValue}) => {
    const searchQuery = search;

    try {
        const { data } = await api.getAllProjectsBySearch(page, searchQuery);

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `All Tickets Page: ${error.message}` }))
        return rejectWithValue(error)
    }
})

const isPending = (state) => {
    state.loading = true;
};
const isFulfilled = (state, action) => {
    state.loading = false;
    state.projects = action.payload.data;
    state.error = '';
    state.currentPage = action.payload?.currentPage;
    state.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
    state.loading = false;
    state.projects = [];
    state.error = action.payload.message;
};

const allProjectsSlice = createSlice({
    name: 'allProjects',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllProjects.pending, (state) => isPending(state));
        builder.addCase(getAllProjects.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getAllProjects.rejected, (state, action) => isRejected(state, action));
        builder.addCase(getAllProjectsBySearch.pending, (state) => isPending(state));
        builder.addCase(getAllProjectsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getAllProjectsBySearch.rejected, (state, action) => isRejected(state, action));
    },
})


export default allProjectsSlice.reducer;


export const allProjectsActions = allProjectsSlice.actions;