import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	movieName: ''
};

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		searchedMovie: (state, { payload }) => {
			state.movieName = payload;
		}
	}
});

export const { searchedMovie } = movieSlice.actions;
export default movieSlice.reducer;
