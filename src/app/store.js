import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { ticketApi } from '../services/ticket/ticketApi';
import { projectApi } from '../services/project/projectApi';
import userReducer from '../services/user/userSlice';
import authReducer from '../services/user/authSlice';
import allTicketsReducer from '../services/ticket/allTicketsSlice';
import myTicketsReducer from '../services/ticket/myTicketsSlice';
import crudFeedbackReducer from '../services/crudFeedbackSlice';
import addTicketReducer from '../services/ticket/addTicketSlice';
import deleteTicketReducer from '../services/ticket/deleteTicketSlice';
import ticketDetailsReducer from '../services/ticket/ticketDetailsSlice';
import editTicketReducer from '../services/ticket/editTicketSlice';
import ticketArchiveReducer from '../services/ticket/ticketArchiveSlice';

import allProjectReducer from '../services/project/allProjectsSlice';
import allProjectsSlice from '../services/project/allProjectsSlice';

export const store = configureStore({
    reducer: {
        [ticketApi.reducerPath]: ticketApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,

        // User stores
        user: userReducer,
        auth: authReducer,

        // Ticket stores
        allTickets: allTicketsReducer,
        myTickets: myTicketsReducer,
        crudFeedback: crudFeedbackReducer,
        addTicket: addTicketReducer,
        deleteTicket: deleteTicketReducer,
        ticketDetails: ticketDetailsReducer,
        editTicket: editTicketReducer,
        ticketArchive: ticketArchiveReducer,

        // Project stores
        allProjects: allProjectsSlice,
    },

    

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ticketApi.middleware),
});

export default store;

setupListeners(store.dispatch)