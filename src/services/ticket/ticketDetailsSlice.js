import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { handleAlerts } from '../crudFeedbackSlice';

const initialState = {
    loading: false,
    error: '',
    ticket: {},
}

export const getTicketDetails = createAsyncThunk('ticket/getTicketDetails', async (id, {dispatch, rejectWithValue}) => {
    try {
        const { data } = await api.getTicketDetails(id);
        // console.log(data);
        
        return data;
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `Failed to get ticket details of ticket ${id}`}));
        return rejectWithValue(error)
    }
});

const getTicketDetailsSlice = createSlice({
    name: 'getTicketDetails',
    initialState,
    extraReducers: builder => {
        builder.addCase(getTicketDetails.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getTicketDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.ticket = action.payload;
        })
        builder.addCase(getTicketDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default getTicketDetailsSlice.reducer;

