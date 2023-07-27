import { MovieDetails, MovieGenresProps, MovieProps } from "../model/Movie";
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
		getMovieByName: builder.query<{ results: MovieProps[] }, string | void>({
			query: (movieName: string) => ({
				url: `/search/movie?query=${movieName}`,
				method: "GET"
			})
		}),
		getMovieDetails: builder.query<MovieDetails, number | string | void>({
			query: (movieId: number | string) => ({
				url: `/movie/${movieId}`,
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

export const {
	useGetPlayingNowMoviesQuery,
	useGetMovieByNameQuery,
	useGetUpcomingMovieQuery,
	useGetPopularMovieQuery,
	useGetGenresQuery,
	useGetMovieDetailsQuery
} = movieApiSlice;
