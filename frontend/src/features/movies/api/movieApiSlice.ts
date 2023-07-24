import {  MovieGenresProps, MovieProps } from "../model/Movie";
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
		getUpcomingMovie: builder.query<{ results: MovieProps[] }, number | void>({
			query: () => ({
				url: "/movie/upcoming",
				method: "GET"
			})
		}),
		getPopularMovie: builder.query<{ results: MovieProps[] }, number | void>({
			query: () => ({
				url: "/movie/popular",
				method: "GET"
			})
		}),
		getMovieByName: builder.query<{ results: MovieProps[] }, number | void>({
			query: () => ({
				url: `/search/movie?query=harry&include_adult=false&language=en-US&page=1`,
				method: "GET"
			})
		}),
		getGenres: builder.query<{ results: MovieGenresProps }, number | void>({
			query: () => ({
				url: `/genre/movie/list`,
				method: "GET"
			})
		})
	})
});

export const { useGetPlayingNowMoviesQuery, useGetMovieByNameQuery, useGetUpcomingMovieQuery, useGetPopularMovieQuery, useGetGenresQuery } =
	movieApiSlice;
