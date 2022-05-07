import { configureStore } from '@reduxjs/toolkit';

import { api } from '../services/api';

export default configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
});