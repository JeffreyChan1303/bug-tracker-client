import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

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
        // User stores
        user: userReducer,
        auth: authReducer,

        // Ticket stores
        allTickets: allTicketsReducer,
        myTickets: myTicketsReducer,
        addTicket: addTicketReducer,
        ticketDetails: ticketDetailsReducer,
        ticketArchive: ticketArchiveReducer,

        // Project stores
        allProjects: allProjectsReducer,
        myProjects: myProjectsReducer,
        projectArchive: projectArchiveReducer,


        addProject: addProjectReducer,


        // Other stores
        crudFeedback: crudFeedbackReducer,

        
    },

});

export default store;

setupListeners(store.dispatch)