import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    // this will send back our http only secure cookie
    // send cookie to with every query
    // credentials: 'include',

    // We attaching that access token to our header every time with every request
    // if we have cookie wer're attaching those credentials in that cookie every time
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).authStore.userToken;

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers;
    }
})

export const apiSlice = createApi({
    baseQuery: baseQuery,
    endpoints: builder => ({})
})
