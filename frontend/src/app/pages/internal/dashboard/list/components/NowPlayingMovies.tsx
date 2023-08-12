import { useEffect, useState } from 'react';

import { useGetPlayingNowMoviesQuery } from 'features/movies/api/movieApiSlice';
import { MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';

const NowPlayingMovies = () => {
    const [movieList, setMovieList] = useState<MovieProps[]>([]);
    const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useGetPlayingNowMoviesQuery();

    useEffect(() => {
        if (nowPlayingMovies) {
            setMovieList(nowPlayingMovies.results);
        }
    }, [nowPlayingMovies]);

    return (
        <MovieList
            isLoading={nowPlayingLoading}
            movieList={movieList}
            title="Playing now"
            // movieNumber={4}
        />
    );
};

export default NowPlayingMovies;
