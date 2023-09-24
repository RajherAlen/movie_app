import { createAsyncThunk } from "@reduxjs/toolkit";
import LocalStorageProvider from "utils/storage/LocalStorageProvider";
import validationToast from "utils/validation/validationToast";

const backendURL = "http://localhost:5000";

export interface LoginUserProps {
	username: string;
	password: string;
}

export const loginUser = createAsyncThunk(
	"auth/login",
	async ({ username, password }: LoginUserProps, { rejectWithValue }) => {
		try {
			const res = await fetch(`${backendURL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username,
					password
				})
			});

			const data = await res.json();

			if (res.status === 200) {
				// store user's token in local storage
				LocalStorageProvider.set("userInfo", { ...data });
				LocalStorageProvider.set("userToken", data.userToken);
			} else {
				validationToast({
					status: "error",
					message: "Something went wrong please try again"
				});
			}

			return data;
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
