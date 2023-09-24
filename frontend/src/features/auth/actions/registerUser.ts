import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:5000";

export interface RegisterUserProps {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
}

export const registerUser = createAsyncThunk(
	"auth/register",
	async (
		{ firstName, lastName, username, email, password }: RegisterUserProps,
		{ rejectWithValue }
	) => {
		try {
			await fetch(`${backendURL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					firstName,
					lastName,
					username,
					email,
					password
				})
			});
		} catch (error: any) {
			// return custom error message from backend if present
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
