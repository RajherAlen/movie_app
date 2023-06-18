import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authSlice from 'features/auth/authSlice';

export const store = configureStore({
	reducer: {
        authStore: authSlice,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({ serializableCheck: false }).concat(
			apiSlice.middleware
		);
	}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
