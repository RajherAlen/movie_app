import { createAsyncThunk } from "@reduxjs/toolkit";
import validationToast from "utils/validation/validationToast";

const backendURL = "http://localhost:5000";

interface movieListProps {
	userId: string;
	movieId: string | number;
}

export const addToMovieList = createAsyncThunk(
	"movieList",
	async ({ userId, movieId }: movieListProps, { rejectWithValue }) => {
		try {
			const res = await fetch(`${backendURL}/movie-list/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					movieId
				})
			});

			const data = await res.json();

			if (res.status === 200) {
				// console.log(data);
			} else {
				validationToast({
					status: "error",
					message: "Something went wrong please try again"
				});
			}
            return data
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
