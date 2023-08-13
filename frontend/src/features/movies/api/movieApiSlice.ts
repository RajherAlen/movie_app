import { MovieDetails, MovieGenreProps, MovieGenresProps, MovieProps, MovieVideoProps } from "../model/Movie";
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
		getGenres: builder.query<{ genres: any }, number | void>({
			query: () => ({
				url: `/genre/movie/list`,
				method: "GET"
			})
		}),
		getMovieVideo: builder.query<{results: any}, string | void>({
			query: (movieId) => ({
				url: `/movie/${movieId}/videos?language=en-US`,
				method: "GET"
			})

		}),
		getSimilarMovie: builder.query<{results: any}, string | void>({
			query: (movieId) => ({
				url: `/movie/${movieId}/similar?language=en-US&page=1`,
				method: "GET"
			})
		}),
		getTopRatedMovie: builder.query<{results: MovieProps[]}, void>({
			query: () => ({
				url: `/movie/top_rated?language=en-US&page=1`,
				method: "GET"
			})
		}),
		getMovieByGenre: builder.query<{results: MovieProps[]}, MovieGenreProps>({
			query: ({genreId, page}) => ({
				url: `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
				method: "GET"
			})
		}),
	})
});

export const {
	useGetPlayingNowMoviesQuery,
	useGetMovieByNameQuery,
	useGetUpcomingMovieQuery,
	useGetPopularMovieQuery,
	useGetGenresQuery,
	useGetMovieDetailsQuery,
	useGetMovieVideoQuery,
	useGetSimilarMovieQuery,
	useGetTopRatedMovieQuery,
	useGetMovieByGenreQuery
} = movieApiSlice;
