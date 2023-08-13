import { useEffect, useState } from 'react';

import { useGetMovieByGenreQuery } from 'features/movies/api/movieApiSlice';
import { MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';

import { useAppSelector } from 'app/auth/hooks';

interface MoviesByGenreProps {
    name: string;
    id: number;
}

const MoviesByGenre = (props: MoviesByGenreProps) => {
    const [allMovies, setAllMovies] = useState<MovieProps[]>([]);
    const currentPage = useAppSelector((state) => state.movieStore.currentPage);

    const { data: genreMovies, isLoading: genreLoading } =
        useGetMovieByGenreQuery({ genreId: props.id, page: currentPage });

    // Load initial movies and combine with previous movies
    useEffect(() => {
        if (genreMovies) {
            if (currentPage === 1) {
                setAllMovies(genreMovies.results);
            } else {
                setAllMovies((prevMovies) => [
                    ...prevMovies,
                    ...genreMovies.results,
                ]);
            }
        }
    }, [genreMovies]);

    return (
        <div>
            <MovieList
                isLoading={genreLoading}
                movieList={allMovies}
                title={props.name}
                grid
            />
        </div>
    );
};

export default MoviesByGenre;
