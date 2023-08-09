import { useEffect, useState } from 'react';

import {
    useGetPlayingNowMoviesQuery,
    useGetTopRatedMovieQuery,
    useGetUpcomingMovieQuery,
} from 'features/movies/api/movieApiSlice';
import { MovieCard, MovieFilter, MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';

const DashboardListDisplay = () => {
    const { data, isLoading } = useGetPlayingNowMoviesQuery();
    const { data: topRated } = useGetTopRatedMovieQuery();

    const [movieList, setMovieList] = useState<MovieProps[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([]);

    useEffect(() => {
        if (data) {
            setMovieList(data.results);
        }

        if (topRated) {
            setTopRatedMovies(topRated.results);
        }
    }, [data, topRated]);

    return (
        <>
            <MovieFilter />

            <div className="mb-6 grid grid-cols-2 gap-6">
                <MovieCard
                    banner={true}
                    movie={movieList[0]}
                    isLoading={isLoading}
                />
                <MovieCard
                    banner={true}
                    movie={movieList[2]}
                    isLoading={isLoading}
                />
            </div>

            <MovieList
                isLoading={isLoading}
                movieList={movieList}
                title="Playing now"
                movieNumber={4}
            />
            <MovieList
                isLoading={isLoading}
                movieList={topRatedMovies}
                title="Popular movies"
                movieNumber={4}
            />
        </>
    );
};

export default DashboardListDisplay;
