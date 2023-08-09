import { useNavigate, useParams } from 'react-router-dom';

import Video from 'components/video/Video';

import {
    useGetMovieDetailsQuery,
    useGetMovieVideoQuery,
    useGetSimilarMovieQuery,
} from 'features/movies/api/movieApiSlice';
import { MovieCard, MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';

const MoviePreviewListDisplay = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const movieDetails = useGetMovieDetailsQuery(movieId);
    const movieVideo = useGetMovieVideoQuery(movieId);
    const similarMovies = useGetSimilarMovieQuery(movieId);

    if (!movieDetails.isLoading && !movieDetails.data) {
        return navigate(-1);
    }

    return movieDetails.isFetching ? (
        <div>Loading</div>
    ) : (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {movieDetails.data ?<MovieCard fullHeight movie={movieDetails.data!} /> : null}
                {movieVideo.data && movieVideo.data?.results[0] ? <Video videoId={movieVideo.data?.results[0].key} /> : null}
            </div>

            <div className="mt-10">
                <MovieList 
                    isLoading={similarMovies.isLoading}
                    movieList={similarMovies.data?.results}
                    title="Similar Movies"
                    movieNumber={4}
                />
            </div>
        </div>
    );
};

export default MoviePreviewListDisplay;
