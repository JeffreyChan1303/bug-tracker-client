import { configureStore } from '@reduxjs/toolkit';

import { ticketApi } from '../services/ticketApi';
import { projectApi } from '../services/projectApi';
import userReducer from '../services/userSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        [ticketApi.reducerPath]: ticketApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        user: userReducer,
    },


    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ticketApi.middleware),
});

export default store;

setupListeners(store.dispatch)