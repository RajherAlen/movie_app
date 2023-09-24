import { createAsyncThunk } from '@reduxjs/toolkit';
import LocalStorageProvider from 'utils/storage/LocalStorageProvider';

const backendURL = 'http://localhost:5000';

export interface LoginUserProps {
    username: string;
    password: string;
}

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }: LoginUserProps, { rejectWithValue }) => {
        try {
            const res = await fetch(`${backendURL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            console.log(res)
            
            const data = await res.json();
            
            console.log(data);
            // store user's token in local storage
            // LocalStorageProvider.set('userInfo', data.userInfo);
            // LocalStorageProvider.set('userToken', data.userToken);

            return data;
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
