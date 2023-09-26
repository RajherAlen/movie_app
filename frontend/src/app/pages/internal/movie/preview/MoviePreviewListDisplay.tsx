import { useNavigate, useParams } from 'react-router-dom';

import SimilarMovies from '../../dashboard/list/components/SimilarMovies';
import { Button } from 'components/ui/Button';
import Video from 'components/video/Video';

import {
    useGetMovieDetailsQuery,
    useGetMovieVideoQuery,
} from 'features/movies/api/movieApiSlice';
import { MovieCard } from 'features/movies/components';

const MoviePreviewListDisplay = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();

    const movieDetails = useGetMovieDetailsQuery(movieId);
    const movieVideo = useGetMovieVideoQuery(movieId);

    if (!movieDetails.isLoading && !movieDetails.data) {
        return (
            <div className="flex flex-col  items-center py-10 px-5 bg-slate-800 rounded-lg">
                <p className='text-xl mb-4'>No info for this movie</p>
                <Button onClick={() => navigate(-1)}>Go back</Button>
            </div>
        );
    }

    return movieDetails.isFetching ? (
        <div>Loading</div>
    ) : (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {movieDetails.data ? (
                    <MovieCard banner movie={movieDetails.data!} />
                ) : null}
                {movieVideo.data && movieVideo.data?.results[0] ? (
                    <Video videoId={movieVideo.data?.results[0].key} />
                ) : null}
            </div>

            <SimilarMovies />
        </div>
    );
};

export default MoviePreviewListDisplay;
