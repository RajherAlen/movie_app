import { useEffect, useState } from 'react';

import { useGetMovieByGenreQuery } from 'features/movies/api/movieApiSlice';
import { MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';

interface MoviesByGenreProps {
    name: string;
    id: number;
}

const MoviesByGenre = (props: MoviesByGenreProps) => {
    const [moviesByGenre, setMoviesByGenre] = useState<MovieProps[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data: genreMovies, isLoading: genreLoading } =
        useGetMovieByGenreQuery({ genreId: props.id, page: currentPage });

    useEffect(() => {
        if (genreMovies) {
            setMoviesByGenre(genreMovies.results);
        }
    }, [genreMovies]);

    return (
        <MovieList
            isLoading={genreLoading}
            movieList={moviesByGenre}
            title={props.name}
            grid
        />
    );
};

export default MoviesByGenre;
