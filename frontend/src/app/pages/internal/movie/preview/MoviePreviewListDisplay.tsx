import { useNavigate, useParams } from 'react-router-dom';

import Video from 'components/video/Video';

import {
    useGetMovieDetailsQuery,
    useGetMovieVideoQuery,
} from 'features/movies/api/movieApiSlice';
import { MovieCard } from 'features/movies/components';
import SimilarMovies from '../../dashboard/list/components/SimilarMovies';

const MoviePreviewListDisplay = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();

    const movieDetails = useGetMovieDetailsQuery(movieId);
    const movieVideo = useGetMovieVideoQuery(movieId);

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

            <SimilarMovies />
        </div>
    );
};

export default MoviePreviewListDisplay;
