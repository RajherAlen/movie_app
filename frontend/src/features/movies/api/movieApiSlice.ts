import { MovieDetails, MovieGenreProps, MovieProps,  } from "../model/Movie";
import { apiSlice } from "app/auth/apiSlice";

const movieBaseUrl = "api.themoviedb.org/3";

export const movieApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPlayingNowMovies: builder.query<{ results: MovieProps[] }, number | void>(
			{
				query: () => ({
					url: `${movieBaseUrl}/movie/now_playing?language=en-US&page=1`,
					method: "GET"
				})
			}
		),
		getUpcomingMovie: builder.query<{ results: MovieProps[] }, number | void>({
			query: () => ({
				url: `${movieBaseUrl}/movie/upcoming`,
				method: "GET"
			})
		}),
		getPopularMovie: builder.query<{ results: MovieProps[] }, number | void>({
			query: () => ({
				url: `${movieBaseUrl}/movie/popular`,
				method: "GET"
			})
		}),
		getMovieByName: builder.query<{ results: MovieProps[] }, string | void>({
			query: (movieName: string) => ({
				url: `${movieBaseUrl}/search/movie?query=${movieName}`,
				method: "GET"
			})
		}),
		getMovieDetails: builder.query<MovieDetails, number | string | void>({
			query: (movieId: number | string) => ({
				url: `${movieBaseUrl}/movie/${movieId}`,
				method: "GET"
			})
		}),
		getGenres: builder.query<{ genres: any }, number | void>({
			query: () => ({
				url: `${movieBaseUrl}/genre/movie/list`,
				method: "GET"
			})
		}),
		getMovieVideo: builder.query<{results: any}, string | void>({
			query: (movieId) => ({
				url: `${movieBaseUrl}/movie/${movieId}/videos?language=en-US`,
				method: "GET"
			})

		}),
		getSimilarMovie: builder.query<{results: any}, string | void>({
			query: (movieId) => ({
				url: `${movieBaseUrl}/movie/${movieId}/similar?language=en-US&page=1`,
				method: "GET"
			})
		}),
		getTopRatedMovie: builder.query<{results: MovieProps[]}, void>({
			query: () => ({
				url: `${movieBaseUrl}/movie/top_rated?language=en-US&page=1`,
				method: "GET"
			})
		}),
		getMovieByGenre: builder.query<{results: MovieProps[]}, MovieGenreProps>({
			query: ({genreId, page}) => ({
				url: `${movieBaseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`,
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
