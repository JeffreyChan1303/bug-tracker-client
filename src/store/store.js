import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

// User Imports
import userReducer from '../services/user/userSlice';
import authReducer from '../services/user/authSlice';
import allUsersReducer from '../services/user/allUsersSlice';
import notificationsReducer from '../services/user/notificationsSlice';

// Ticket Imports
import allTicketsReducer from '../services/ticket/allTicketsSlice';
import myTicketsReducer from '../services/ticket/myTicketsSlice';
import addTicketReducer from '../services/ticket/addTicketSlice';
import ticketDetailsReducer from '../services/ticket/ticketDetailsSlice';
import ticketArchiveReducer from '../services/ticket/ticketArchiveSlice';
import unassignedTicketsReducer from '../services/ticket/unassignedTicketsSlice';

// Project Imports
import allProjectsReducer from '../services/project/allProjectsSlice';
import myProjectsReducer from '../services/project/myProjectsSlice';
import projectArchiveReducer from '../services/project/projectArchiveSlice';
import addProjectReducer from '../services/project/addProjectSlice';
import projectDetailsReducer from '../services/project/projectDetailsSlice';
import projectUsersReducer from '../services/project/projectUsersSlice';

// Other imports
import alertsReducer from '../services/alertsSlice';
import dashboardReducer from '../services/dashboardSlice';
import supportTicketsReducer from '../services/ticket/supportTicketsSlice';

export const store = configureStore({
  reducer: {
    // User stores
    user: userReducer,
    auth: authReducer,
    allUsers: allUsersReducer,
    notifications: notificationsReducer,

    // Ticket stores
    allTickets: allTicketsReducer,
    myTickets: myTicketsReducer,
    addTicket: addTicketReducer,
    ticketDetails: ticketDetailsReducer,
    ticketArchive: ticketArchiveReducer,

    unassignedTickets: unassignedTicketsReducer,

    // Project stores
    allProjects: allProjectsReducer,
    myProjects: myProjectsReducer,
    addProject: addProjectReducer,
    projectDetails: projectDetailsReducer,
    projectUsers: projectUsersReducer,
    projectArchive: projectArchiveReducer,

    // Other stores
    alerts: alertsReducer,
    dashboard: dashboardReducer,
    supportTickets: supportTicketsReducer,
  },
});

export default store;

setupListeners(store.dispatch);
