import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { ticketApi } from '../services/ticket/ticketApi';
import { projectApi } from '../services/project/projectApi';
import userReducer from '../services/user/userSlice';
import authReducer from '../services/user/authSlice';
import allTicketsReducer from '../services/ticket/allTicketsSlice';

export const store = configureStore({
    reducer: {
        [ticketApi.reducerPath]: ticketApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        user: userReducer,
        auth: authReducer,
        allTickets: allTicketsReducer,
    },


    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ticketApi.middleware),
});

export default store;

setupListeners(store.dispatch)