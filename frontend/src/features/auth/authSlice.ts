import { loginUser } from "./actions/authApiSlice";
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
			state.userInfo = payload.data.userInfo;
			state.userToken = payload.data.userToken;

			LocalStorageProvider.set("userInfo", state.userInfo);
			LocalStorageProvider.set("userToken", state.userToken);
		}
	}
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
