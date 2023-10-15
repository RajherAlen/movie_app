import { apiSlice } from "app/auth/apiSlice";

const backendURL = "http://localhost:5000";

export interface LoginUserProps {
	username: string;
	password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${backendURL}/auth/login`,
				method: "POST",
				body: data
			})
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${backendURL}/auth/register`,
				method: "POST",
				body: data
			})
		})
	})
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
