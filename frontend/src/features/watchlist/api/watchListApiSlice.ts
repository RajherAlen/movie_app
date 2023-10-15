import { apiSlice } from "app/auth/apiSlice";

const backendURL = "http://localhost:5000";

export const watchListApiSlice = apiSlice
	.enhanceEndpoints({ addTagTypes: ["movieList"] })
	.injectEndpoints({
		endpoints: (build) => ({
			getWatchList: build.query({
				query: (userId) => ({
					url: `${backendURL}/movie-list/${userId}`,
					method: "GET"
				}),
				providesTags: ["movieList"]
			}),
			addToWatchList: build.mutation({
				query: ({ movie, userId }) => ({
					url: `${backendURL}/movie-list/${userId}`,
					method: "POST",
					body: movie
				}),
				invalidatesTags: ["movieList"]
			}),
			deleteMovie: build.mutation({
				query: ({ movieId, userId }) => ({
					url: `${backendURL}/movie-list/${userId}`,
					method: "DELETE",
					body: {
						movieId
					}
				}),
				invalidatesTags: ["movieList"]
			}),
			changeStatus: build.mutation({
				query: ({ isWatched, userId, movieId }) => ({
					url: `${backendURL}/movie-list/${userId}`,
					method: "PATCH",
					body: {
						movieId,
						isWatched
					}
				}),
				invalidatesTags: ["movieList"]
			})
		}),
		overrideExisting: true
	});

export const {
	useGetWatchListQuery,
	useAddToWatchListMutation,
	useDeleteMovieMutation,
	useChangeStatusMutation
} = watchListApiSlice;
