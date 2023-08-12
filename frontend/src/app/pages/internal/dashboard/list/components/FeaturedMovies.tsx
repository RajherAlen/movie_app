import { useEffect, useState } from 'react';

import { useGetPlayingNowMoviesQuery } from 'features/movies/api/movieApiSlice';
import { MovieCard } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';

const FeaturedMovies = () => {
    const [movieList, setMovieList] = useState<MovieProps[]>([]);
    const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useGetPlayingNowMoviesQuery();

    useEffect(() => {
        if (nowPlayingMovies) {
            setMovieList(nowPlayingMovies.results);
        }
    }, [nowPlayingMovies]);

    return (
        <div className="mb-6 grid grid-cols-2 gap-6">
            <MovieCard
                banner
                movie={movieList[0]}
                isLoading={nowPlayingLoading}
            />
            <MovieCard
                banner
                movie={movieList[2]}
                isLoading={nowPlayingLoading}
            />
        </div>
    );
};

export default FeaturedMovies;
