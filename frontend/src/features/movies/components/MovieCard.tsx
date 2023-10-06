import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAddToWatchListMutation } from 'features/watchlist/api/watchListApiSlice';

import { useAppSelector } from 'app/auth/hooks';

import clsx from 'clsx';
import { Check, Dot, Flag, MoveDown, PlusCircleIcon } from 'lucide-react';
import validationToast from 'utils/validation/validationToast';

import { MovieComponentProps } from '../model/Movie';
import MovieImg from './MovieImg';

const MovieCard = (props: MovieComponentProps) => {
    const { isLoading, movie } = props;

    return !isLoading && movie ? <MovieCardComp {...props} /> : <LoadingCard />;
};

const MovieCardComp = (props: MovieComponentProps) => {
    const { movie, banner, grid } = props;
    
    const navigate = useNavigate();
    const cardClass = getCardClassName(grid, banner);

    const handleCardClick = () => {
        navigate(`/movie/preview/${movie.id}`);
    };

    return (
        <div className={cardClass} onClick={handleCardClick} data-id={movie.id}>
            <MovieInfo {...props} />
        </div>
    );
};

const MovieInfo = ({ movie, fullHeight, banner }: MovieComponentProps) => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const [addToWatchList, { isError, data }] = useAddToWatchListMutation();

    useEffect(() => {
        if (data) {
            validationToast({
                status: 'success',
                message: 'Movie is added',
            });
        }

        if (isError) {
            validationToast({
                status: 'error',
                message: 'Something went wrong, please try again',
            });
        }
    }, [data, isError]);

    const handleAddMovie = (e: any) => {
        e.stopPropagation();

        addToWatchList({ movie, userId: userInfo.id });
    };

    return (
        <>
            <MovieImg path={movie.poster_path} fullHeight={fullHeight} banner={banner} />
            <PlusCircleIcon
                onClick={(e: React.MouseEvent) => handleAddMovie(e)}
                className="absolute right-2 top-2 text-white transition-all hover:scale-110"
            />

            <div className="relative p-3">
                <h1 className="text-md mb-3 font-bold truncate">{movie.title}</h1>

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
            <div className={`animate-pulse ${props.isBanner} w-full rounded-2xl bg-slate-800`}></div>
        </div>
    );
};

const getCardClassName = (grid: boolean | undefined, banner: boolean | undefined) => {
    return clsx(
        'group relative mb-5 max-h-420 cursor-pointer overflow-hidden rounded-sm bg-slate-800 text-white bg-blend-darken transition-all duration-300 ease-in-out',
        !grid && !banner && 'w-52 min-w-200'
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
