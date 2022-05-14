import { configureStore } from '@reduxjs/toolkit';

import { ticketApi } from '../services/ticketApi';
import { projectApi } from '../services/projectApi';

export default configureStore({
    reducer: {
        [ticketApi.reducerPath]: ticketApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
    },
});