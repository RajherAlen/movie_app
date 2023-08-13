import { useParams } from 'react-router-dom';

import { useGetSimilarMovieQuery } from 'features/movies/api/movieApiSlice';
import { MovieList } from 'features/movies/components';

const SimilarMovies = () => {
    const { movieId } = useParams();
    const similarMovies = useGetSimilarMovieQuery(movieId);

    return (
        similarMovies.data?.results.length > 0 && (
            <div className="mt-10">
                <MovieList
                    isLoading={similarMovies.isLoading}
                    movieList={similarMovies.data?.results}
                    title="Similar Movies"
                />
            </div>
        )
    );
};

export default SimilarMovies;
