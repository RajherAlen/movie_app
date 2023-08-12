import EmptyStateCard from 'components/cards/EmptyStateCard';

import { useGetMovieByNameQuery } from 'features/movies/api/movieApiSlice';
import { MovieList } from 'features/movies/components';

import { useAppSelector } from 'app/auth/hooks';

const MoviesBySearchQuery = () => {
    const movieName = useAppSelector((state) => state.movieStore.movieName);
    const { data: searchResults, isLoading: searchResultsLoading } =
        useGetMovieByNameQuery(movieName);

    return searchResults && searchResults.results.length > 0 ? (
        <MovieList
            isLoading={searchResultsLoading}
            movieList={searchResults.results}
            title={`Searched name: ${movieName}`}
            // movieNumber={12}
        />
    ) : (
        <EmptyStateCard
            title="There is no movies with that name"
            description="Try change your search data"
        />
    );
};

export default MoviesBySearchQuery;
