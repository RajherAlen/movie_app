import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	movieName: '',
	currentPage: 1,
};

const movieSlice = createSlice({
	name: "movie",
	initialState,
	reducers: {
		searchedMovie: (state, { payload }) => {
			state.movieName = payload;
		},
		setNewPage: (state, {payload}) => {
			state.currentPage = payload;
		}
	}
});

export const { searchedMovie, setNewPage } = movieSlice.actions;
export default movieSlice.reducer;
