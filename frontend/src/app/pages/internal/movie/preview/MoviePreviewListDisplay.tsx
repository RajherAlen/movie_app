import { useNavigate, useParams } from 'react-router-dom';

import SimilarMovies from '../../dashboard/list/components/SimilarMovies';
import { Modal } from 'components/index';
import { Button } from 'components/ui/Button';
import Video from 'components/video/Video';

import { useGetMovieDetailsQuery, useGetMovieVideoQuery } from 'features/movies/api/movieApiSlice';
import { MovieCard } from 'features/movies/components';

import { LucideEye } from 'lucide-react';

const MoviePreviewListDisplay = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();

    const movieDetails = useGetMovieDetailsQuery(movieId);
    const movieVideo = useGetMovieVideoQuery(movieId);

    if (!movieDetails.isLoading && !movieDetails.data) {
        return (
            <div className="flex flex-col  items-center py-10 px-5 bg-slate-800 rounded-lg">
                <p className="text-xl mb-4">No info for this movie</p>
                <Button onClick={() => navigate(-1)}>Go back</Button>
            </div>
        );
    }

    return movieDetails.isFetching ? (
        <div>Loading</div>
    ) : (
        <div>
            <div className="flex gap-5">
                {movieDetails.data ? <MovieCard banner movie={movieDetails.data!} /> : null}
                <div className="flex flex-col gap-4">
                    <Modal>
                        <Modal.Trigger className="inline-flex items-center gap-2 justify-center h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                            <LucideEye width={16} />
                            Watch trailer
                        </Modal.Trigger>
                        <Modal.Content className="max-w-[43rem]">
                            {movieVideo.data && movieVideo.data?.results[0] ? (
                                <Video videoId={movieVideo.data?.results[0].key} />
                            ) : null}
                        </Modal.Content>
                    </Modal>
                    {/* <Button variant="outline">Add to watchlist</Button> */}
                </div>
            </div>

            <SimilarMovies />
        </div>
    );
};

export default MoviePreviewListDisplay;
