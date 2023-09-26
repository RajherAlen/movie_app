import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Video from 'components/video/Video';

import { addToMovieList } from 'features/watchlist/actions/addToMovieList';
import { useAddToWatchListMutation } from 'features/watchlist/api/watchListApiSlice';

// import { useAddToMovieListMutation } from 'features/watchlist/api/watchListApiSlice';
import { useAppSelector } from 'app/auth/hooks';

import clsx from 'clsx';
import { Check, Dot, Flag, MoveDown, PlusCircleIcon } from 'lucide-react';

import { useGetMovieVideoQuery } from '../api/movieApiSlice';
import { MovieComponentProps } from '../model/Movie';
import MovieImg from './MovieImg';

const MovieCard = (props: MovieComponentProps) => {
    const { isLoading, movie } = props;

    return !isLoading && movie ? <MovieCardComp {...props} /> : <LoadingCard />;
};

const MovieCardComp = (props: MovieComponentProps) => {
    const { movie, banner, showTrailer, grid } = props;
    const navigate = useNavigate();

    const [trailerTimeout, setTrailerTimeout] = useState<number | null>(null);
    const [trailer, setTrailer] = useState<boolean>(false);

    const isHovered = useRef(false);
    const movieRef = useRef<HTMLDivElement>(null);

    const movieVideo = useGetMovieVideoQuery(`${movie.id}`);

    const showMovieVideo = trailer && showTrailer;
    const cardClass = getCardClassName(grid, banner, showMovieVideo);

    const handleShowTrailer = () => {
        if (!isHovered.current) {
            isHovered.current = true;
            const timeoutId = setTimeout(() => setTrailer(true), 500);
            setTrailerTimeout(timeoutId);
        }
    };

    const handleHideTrailer = () => {
        isHovered.current = false;
        setTrailer(false);
        if (trailerTimeout !== null) {
            clearTimeout(trailerTimeout);
            setTrailerTimeout(null);
        }
    };

    return (
        <div
            className={cardClass}
            onClick={() => navigate(`/movie/preview/${movie.id}`)}
            onMouseEnter={handleShowTrailer}
            onMouseLeave={handleHideTrailer}
            ref={movieRef}
            data-id={movie.id}
        >
            {showMovieVideo ? (
                <Video
                    videoId={movieVideo.data?.results[0].key}
                    autoPlay={showMovieVideo}
                />
            ) : (
                <MovieInfo {...props} />
            )}
        </div>
    );
};

const MovieInfo = ({ movie, fullHeight, banner }: MovieComponentProps) => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const [addToMovieList] = useAddToWatchListMutation();

    const handleAddMovie = (e: any) => {
        e.stopPropagation();

        addToMovieList({ movie, userId: userInfo.id });
    };

    return (
        <>
            <MovieImg
                path={movie.poster_path}
                fullHeight={fullHeight}
                banner={banner}
            />
            <PlusCircleIcon
                onClick={(e: React.MouseEvent) => handleAddMovie(e)}
                className="absolute right-2 top-2 text-white transition-all hover:scale-110"
            />

            <div className="relative p-3">
                <h1 className="text-md mb-3 font-bold truncate">
                    {movie.title}
                </h1>

                <div className="flex items-center gap-2 mb-1">
                    <Vote vote={movie.vote_average} />
                    <Dot />
                    <p className="font-up flex items-center gap-2 text-sm font-semibold">
                        <Flag width={16} />
                        {movie.original_language}
                    </p>
                </div>
                <p className="text-xs text-slate-500">{movie.release_date}</p>
            </div>
        </>
    );
};

const LoadingCard = (props: { isBanner?: boolean }) => {
    return (
        <div className="w-full rounded-2xl shadow">
            <div
                className={`animate-pulse ${props.isBanner} w-full rounded-2xl bg-slate-800`}
            ></div>
        </div>
    );
};

const getCardClassName = (
    grid: boolean | undefined,
    banner: boolean | undefined,
    showMovieVideo: boolean | undefined,
) => {
    return clsx(
        'group relative mb-5 max-h-420 cursor-pointer overflow-hidden rounded-sm bg-slate-800 text-white bg-blend-darken transition-all duration-300 ease-in-out',
        !grid && !banner && 'w-52 min-w-200',
        showMovieVideo && 'hover:min-w-640',
    );
};

const Vote = ({ vote }: { vote: number }) => {
    const Icon = vote > 6 ? Check : MoveDown;

    return (
        <p className="flex items-center gap-2 text-sm font-semibold">
            <Icon width={16} />
            {vote}
        </p>
    );
};

export default MovieCard;
