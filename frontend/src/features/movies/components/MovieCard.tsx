import { Check, Dot, Flag, MoveDown, PlusCircleIcon } from 'lucide-react';
import { MovieProps } from '../model/Movie';
import MovieImg from './MovieImg';

interface MovieCardProps {
    movie: MovieProps;
    banner?: boolean;
    isLoading?: boolean;
}

const MovieCard = (props: MovieCardProps) => {
    const { movie } = props;
    const isBanner = props.banner ? 'h-96' : 'h-52';

    return !props.isLoading && movie ? (
        <div
            className={`group relative mb-5 ${isBanner} cursor-pointer overflow-hidden rounded-2xl bg-slate-800 p-4 text-white bg-blend-darken`}
        >
            <MovieImg path={movie.backdrop_path} banner={props.banner} />

            <PlusCircleIcon className="absolute right-2 top-2 text-white transition-all hover:scale-110" />

            <div className="relative">
                <h1 className="my-3 text-2xl font-bold">{movie.title}</h1>

                <div className="flex items-center gap-2">
                    <p className="flex items-center gap-2 text-lg font-semibold">
                        {movie.vote_average > 6 ? (
                            <Check width={16} />
                        ) : (
                            <MoveDown width={16} />
                        )}
                        {movie.vote_average}
                    </p>
                    <Dot />
                    <p className="font-up flex items-center gap-2 text-lg font-semibold">
                        <Flag width={16} />
                        {movie.original_language}
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full shadow rounded-2xl">
            <div className={`animate-pulse ${isBanner} w-full bg-slate-800 rounded-2xl`}>
            </div>
        </div>
    );
};

export default MovieCard;
