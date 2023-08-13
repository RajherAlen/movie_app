import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';
import { Check, Dot, Flag, MoveDown, PlusCircleIcon } from 'lucide-react';

import { MovieDetails, MovieProps } from '../model/Movie';
import MovieImg from './MovieImg';

interface MovieCardProps {
    movie: MovieProps | MovieDetails;
    banner?: boolean;
    fullHeight?: boolean;
    isLoading?: boolean;
    grid?: boolean;
}

const MovieCard = (props: MovieCardProps) => {
    const { movie } = props;
    const isBanner = props.fullHeight ? 'h-full' : 'h-72';

    return !props.isLoading && movie ? (
        <MovieCardComp
            movie={movie}
            banner={props.banner}
            fullHeight={props.fullHeight}
            grid={props.grid}
        />
    ) : (
        <div className="w-full rounded-2xl shadow">
            <div
                className={`animate-pulse ${isBanner} w-full rounded-2xl bg-slate-800`}
            ></div>
        </div>
    );
};

export default MovieCard;

const MovieCardComp = (props: MovieCardProps) => {
    const { movie, fullHeight, banner } = props;
    const navigate = useNavigate();

    const cardClassName = clsx(
        !props.grid && !banner ? 'w-52 min-w-200' : '',
        'group relative mb-5 cursor-pointer overflow-hidden rounded-sm bg-slate-800 text-white bg-blend-darken',
    );

    return (
        <div
            className={cardClassName}
            onClick={() => navigate(`/movie/preview/${movie.id}`)}
        >
            <MovieImg
                path={movie.poster_path}
                fullHeight={fullHeight}
                banner={banner}
            />

            <PlusCircleIcon className="absolute right-2 top-2 text-white transition-all hover:scale-110" />

            <div className="relative p-3">
                <h1 className="text-md mb-3 font-bold truncate">
                    {movie.title}
                </h1>

                <div className="flex items-center gap-2 mb-1">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                        {movie.vote_average > 6 ? (
                            <Check width={16} />
                        ) : (
                            <MoveDown width={16} />
                        )}
                        {movie.vote_average}
                    </p>
                    <Dot />
                    <p className="font-up flex items-center gap-2 text-sm font-semibold">
                        <Flag width={16} />
                        {movie.original_language}
                    </p>
                </div>
                <p className="text-xs text-slate-500">{movie.release_date}</p>
            </div>
        </div>
    );
};
