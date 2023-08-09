import { createAsyncThunk } from '@reduxjs/toolkit';

const backendURL = 'http://localhost:5000/api';

export interface RegisterUserProps {
    username: string;
    email: string;
    password: string;
}

export const registerUser = createAsyncThunk(
    'auth/register',
    async (
        { username, email, password }: RegisterUserProps,
        { rejectWithValue },
    ) => {
        try {
            await fetch(`${backendURL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);
