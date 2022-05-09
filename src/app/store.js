import { configureStore } from '@reduxjs/toolkit';

import { ticketApi } from '../services/ticketApi';

export default configureStore({
    reducer: {
        [ticketApi.reducerPath]: ticketApi.reducer,
    },
});