import { addToMovieList } from "./actions/addToMovieList";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	movieList: [],
	isLoading: false,
	error: ""
};

const watchlistSlice = createSlice({
	name: "watchlist",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addToMovieList.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addToMovieList.fulfilled, (state, { payload }) => {
				console.log("FULFILLEEEED", payload);
				state.movieList = payload;
				state.isLoading = false;
			})
			.addCase(addToMovieList.rejected, (state, { payload }) => {
				console.log("ERROOOOR", payload);

				state.isLoading = false;
				state.error = "Something went wrong";
			});
	}
});

export const {} = watchlistSlice.actions;
export default watchlistSlice.reducer;
