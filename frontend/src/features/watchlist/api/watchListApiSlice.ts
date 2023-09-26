import { apiSlice } from "app/auth/apiSlice";

const backendURL = "http://localhost:5000";

export const watchListApiSlice = apiSlice
	.enhanceEndpoints({ addTagTypes: ["movieList"] })
	.injectEndpoints({
		endpoints: (build) => ({
			getWatchList: build.query<any[], any>({
				query: (userId) => ({
					url: `${backendURL}/movie-list/${userId}`,
					method: "GET"
				}),
				providesTags: ["movieList"]
			}),
			addToWatchList: build.mutation<{}, any>({
				query: ({ movie, userId }) => ({
					url: `${backendURL}/movie-list/${userId}`,
					method: "POST",
					body: movie
				}),
				invalidatesTags: ["movieList"]
			})
		}),
		overrideExisting: true
	});

export const { useGetWatchListQuery, useAddToWatchListMutation } =
	watchListApiSlice;
