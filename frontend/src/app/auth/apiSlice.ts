import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Njc0ZDcxZmFhZGQyOGJmMzExMmE3N2NhOTQ0MzZkYSIsInN1YiI6IjYwN2FiMmZiN2E5N2FiMDA1N2M1M2RhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o2wZcqBUfmtLaniBTOKoPjYfmhGd1vi60gm2AowOeAg";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://api.themoviedb.org/3",
	// mode: 'no-cors',
	prepareHeaders(headers) {
		headers.set("Content-Type", "application/json");
		headers.set("authorization", `Bearer ${API_KEY}`);

		return headers;
	}
});

export const apiSlice = createApi({
	baseQuery: baseQuery,
	endpoints: () => ({})
});
