import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../api/index';
import { handleAlerts } from '../alertsSlice';

const initialState = {
    getMyTicketsBySearch: {
        loading: false,
        error: '',
    },
    getMyTicketStatistics: {
        loading: false,
        error: '',
    },
    tickets: [],
    currentPage: null,
    numberOfPages: null,
    myTicketsStatistics: {
        numberOfBugTickets: 1,
        numberOfFeatureTickets: 1,
        lowPriority: 0,
        mediumPriority: 0,
        highPriority: 0,
    }
};


export const getMyTicketsBySearch = createAsyncThunk('ticket/getMyTicketsBySearch', async ({ search, page } , { dispatch, rejectWithValue }) => {
    const searchQuery = search;
    // console.log(searchQuery, page)
    try {
        const { data } = await api.getMyTicketsBySearch(page, searchQuery);

        // console.log(data);
        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `My tickets were not able to be fetched. Error: ${error.message}`} ));
        return rejectWithValue(error)
    }
})

export const getMyTicketStatistics = createAsyncThunk('ticket/getMyTicketStatistics', async (params, { dispatch, rejectWithValue }) => {
    try {
        const { data } = await api.getMyTicketStatistics();

        return data
    } catch (error) {
        console.log(error);
        dispatch(handleAlerts({ severity: 'error', message: `My ticket statistics were not able to be fetched. Error: ${error.message}`} ));
        return rejectWithValue(error);
    }
})


const myTicketsSlice = createSlice({
    name: 'myTickets',
    initialState,
    extraReducers: builder => {
        builder.addCase(getMyTicketsBySearch.pending, (state) => {
            state.getMyTicketsBySearch.loading = true;
        });
        builder.addCase(getMyTicketsBySearch.fulfilled, (state, action) => {
            state.getMyTicketsBySearch.loading = false;
            state.tickets = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.numberOfPages = action.payload.numberOfPages;
        });
        builder.addCase(getMyTicketsBySearch.rejected, (state, action) => {
            state.getMyTicketsBySearch.loading = false;
            state.getMyTicketsBySearch.error = action.payload.message;
        })



        builder.addCase(getMyTicketStatistics.pending, (state) => {
            state.getMyTicketStatistics.loading = true;
        });
        builder.addCase(getMyTicketStatistics.fulfilled, (state, action) => {
            state.getMyTicketStatistics.loading = false;
            state.myTicketsStatistics = action?.payload;
        });
        builder.addCase(getMyTicketStatistics.rejected, (state, action) => {
            state.getMyTicketStatistics.loading = false;
            state.getMyTicketStatistics.error = action.payload.message;
        })
    },
})


export default myTicketsSlice.reducer;


export const myTicketsActions = myTicketsSlice.actions;