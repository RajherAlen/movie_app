import { Check, Dot, Flag, MoveDown, PlusCircleIcon } from 'lucide-react';
import { MovieProps } from '../model/Movie';
import MovieImg from './MovieImg';

const MovieCard = (movie: MovieProps) => {
    return (
        <div className="group relative mb-5 h-52 cursor-pointer overflow-hidden rounded-2xl p-4 text-white bg-blend-darken bg-slate-800">
            <MovieImg path={movie.backdrop_path} />
            
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
    );
};

export default MovieCard;
