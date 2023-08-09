import { apiSlice } from 'app/auth/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        getUserDetails: builder.query({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetUserDetailsQuery } = authApiSlice;
