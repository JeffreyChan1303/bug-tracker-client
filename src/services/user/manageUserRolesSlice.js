import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    users: [],
    error: '',
    currentPage: null,
    numberOfPages: null,
};


// generates pending, fulfilled, and rejected action types
export const getAllUsers = createAsyncThunk('user/getAllUsers', async (page, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getAllUsers(page);

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Failed to fetch all users. error: ${error.message}` }))
        return rejectWithValue(error)
    }
})

export const getAllUsersBySearch = createAsyncThunk('user/getAllUsersBySearch', async ({ search, page } , {dispatch, rejectWithValue}) => {
    const searchQuery = search;

    try {
        const { data } = await api.getAllUsersBySearch(page, searchQuery);

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Failed to fetch all users. error: ${error.message}` }))
        return rejectWithValue(error)
    }
})

const isPending = (state) => {
    state.loading = true;
};
const isFulfilled = (state, action) => {
    state.loading = false;
    state.users = action.payload.data;
    state.error = '';
    state.currentPage = action.payload?.currentPage;
    state.numberOfPages = action.payload?.numberOfPages;
};
const isRejected = (state, action) => {
    state.loading = false;
    state.users = [];
    state.error = action.payload.message;
};

const manageUserRolesSlice = createSlice({
    name: 'manageUserRoles',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllUsers.pending, (state) => isPending(state));
        builder.addCase(getAllUsers.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getAllUsers.rejected, (state, action) => isRejected(state, action));
        builder.addCase(getAllUsersBySearch.pending, (state) => isPending(state));
        builder.addCase(getAllUsersBySearch.fulfilled, (state, action) => isFulfilled(state, action));
        builder.addCase(getAllUsersBySearch.rejected, (state, action) => isRejected(state, action));
    },
})


export default manageUserRolesSlice.reducer;


export const manageUserRolesActions = manageUserRolesSlice.actions