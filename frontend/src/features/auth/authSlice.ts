import { loginUser } from "./actions/loginUser";
import { registerUser } from "./actions/registerUser";
import { createSlice } from "@reduxjs/toolkit";
import LocalStorageProvider from "utils/storage/LocalStorageProvider";

interface AuthSliceProps {
	loading: boolean;
	userInfo: any;
	userToken: string | null | unknown;
	error: string | null | unknown;
	success: boolean;
}

// initialize userToken from local storage
const userToken = LocalStorageProvider.get("userToken").value
	? LocalStorageProvider.get("userToken").value
	: null;

// initialize userInfo from local storage
const userInfo = LocalStorageProvider.get("userInfo").value
	? LocalStorageProvider.get("userInfo").value
	: null;

const initialState: AuthSliceProps = {
	loading: false,
	userInfo: userInfo,
	userToken: userToken,
	error: null,
	success: false
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			LocalStorageProvider.remove("userInfo");
			LocalStorageProvider.remove("userToken");

			state.loading = false;
			state.userInfo = null;
			state.userToken = null;
			state.error = null;
		},
		setCredentials: (state, { payload }) => {
			state.userInfo = payload.userInfo;
			state.userToken = payload.userToken;
		}
	},
	extraReducers(builder) {
		// login user
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userInfo = payload.userInfo;
				state.userToken = payload.userToken;

				if (payload.message) {
					state.error = payload.message;
				}
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			// register user
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.loading = false;
				state.success = true; // registration successful
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			});
	}
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
