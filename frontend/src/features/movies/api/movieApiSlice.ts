import {  MovieProps } from "../model/Movie";
import { apiSlice } from "app/auth/apiSlice";

export const movieApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPlayingNowMovies: builder.query<{ results: MovieProps[] }, number | void>(
			{
				query: () => ({
					url: "/movie/now_playing?language=en-US&page=1",
					method: "GET"
				})
			}
		),
		getLatestMovie: builder.query<{ results: MovieProps[] }, number | void>({
			query: () => ({
				url: "/movie/latest",
				method: "GET"
			})
		}),
		getMovieByName: builder.query<{ results: MovieProps[] }, number | void>({
			query: () => ({
				url: `/search/movie?query=harry&include_adult=false&language=en-US&page=1`,
				method: "GET"
			})
		})
	})
});

export const { useGetPlayingNowMoviesQuery, useGetMovieByNameQuery, useGetLatestMovieQuery } =
	movieApiSlice;
