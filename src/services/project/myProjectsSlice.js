import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';

const initialState = {
    loading: false,
    projects: [],
    error: '',
    currentPage: null,
    numberOfPages: null,
};


export const getMyProjectsBySearch = createAsyncThunk('project/getMyProjectsBySearch', async ({ search, page } , {dispatch}) => {
    const searchQuery = search;

    try {
        const { data } = await api.getMyProjectsBySearch(page, searchQuery);

        // console.log(data);
        return data
    } catch (error) {
        console.log(error);   
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
    state.error = action.error.message;
};

const myProjectsSlice = createSlice({
    name: 'myProjects',
    initialState,
    extraReducers: builder => {
        builder.addCase(getMyProjectsBySearch.pending, (state) => isPending(state));
        builder.addCase(getMyProjectsBySearch.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getMyProjectsBySearch.rejected, (state, action) => isRejected(state, action));
    },
})


export default myProjectsSlice.reducer;


export const myProjectsActions = myProjectsSlice.actions;