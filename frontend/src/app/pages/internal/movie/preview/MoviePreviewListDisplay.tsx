import { MovieCard } from 'features/movies/components';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMovieDetailsQuery } from 'features/movies/api/movieApiSlice';

const MoviePreviewListDisplay = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const { data, isLoading, isFetching } = useGetMovieDetailsQuery(movieId);

    if (!isLoading && !data) {
        return navigate(-1);
    }

    return isFetching ? <div>Loading</div> : <MovieCard movie={data!} />;
};

export default MoviePreviewListDisplay;
