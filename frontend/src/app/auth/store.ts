import authSlice from 'features/auth/authSlice';
import movieSlice from 'features/movies/movieSlice';

import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        authStore: authSlice,
        movieStore: movieSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ serializableCheck: false }).concat(
            apiSlice.middleware,
        );
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
