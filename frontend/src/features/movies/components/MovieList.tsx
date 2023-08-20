import { forwardRef } from 'react';

import CardListLoader from 'components/cards/CardListLoader';

import clsx from 'clsx';

import { MovieCard } from '.';
import { MovieProps } from '../model/Movie';

interface MovieListProps {
    isLoading: boolean;
    movieList: MovieProps[];
    movieNumber?: number;
    title: string;
    grid?: boolean;
	showTrailer?: boolean;
}

const MovieList = (props: MovieListProps) => {
    const setMovieNumber = props.movieNumber
        ? props.movieNumber
        : props.movieList.length;
        
    const cardClassName = clsx(
        'flex overflow-hidden overflow-x-auto',
        props.grid && 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7',
        'gap-4',
    );

    return (
        <div className="mb-10">
            <h1 className="mb-6 text-lg font-bold text-slate-300">
                {props.title}
            </h1>
            <div className={cardClassName}>
                {!props.isLoading ? (
                    props.movieList?.slice(0, setMovieNumber).map((movie) => {
                        return (
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                                isLoading={props.isLoading}
                                grid={props.grid}
                                showTrailer={props.showTrailer}
                            />
                        );
                    })
                ) : (
                    <CardListLoader list={setMovieNumber} />
                )}
            </div>
        </div>
    );
};

export default MovieList;
