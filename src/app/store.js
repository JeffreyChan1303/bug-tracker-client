import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { ticketApi } from '../services/ticket/ticketApi';
import { projectApi } from '../services/project/projectApi';
import userReducer from '../services/user/userSlice';
import authReducer from '../services/user/authSlice';

// Ticket Imports
import allTicketsReducer from '../services/ticket/allTicketsSlice';
import myTicketsReducer from '../services/ticket/myTicketsSlice';
import crudFeedbackReducer from '../services/crudFeedbackSlice';
import addTicketReducer from '../services/ticket/addTicketSlice';
import ticketDetailsReducer from '../services/ticket/ticketDetailsSlice';
import ticketArchiveReducer from '../services/ticket/ticketArchiveSlice';

// Project Imports
import allProjectsReducer from '../services/project/allProjectsSlice';
import myProjectsReducer from '../services/project/myProjectsSlice';
import projectArchiveReducer from '../services/project/projectArchiveSlice';



import addProjectReducer from '../services/project/addProjectSlice';



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
        ticketDetails: ticketDetailsReducer,
        ticketArchive: ticketArchiveReducer,

        // Project stores
        allProjects: allProjectsReducer,
        myProjects: myProjectsReducer,
        projectArchive: projectArchiveReducer,


        addProject: addProjectReducer,
        
    },

    

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ticketApi.middleware),
});

export default store;

setupListeners(store.dispatch)