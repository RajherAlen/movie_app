import {
    useGetPlayingNowMoviesQuery,
    useGetPopularMovieQuery,
} from 'features/movies/api/movieApiSlice';
import { MovieCard, MovieFilter, MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';
import { useEffect, useState } from 'react';

const DashboardListDisplay = () => {
    const { data, isLoading } = useGetPlayingNowMoviesQuery();
    const { data: popularData, isLoading: loading } = useGetPopularMovieQuery();

    const [movieList, setMovieList] = useState<MovieProps[]>([]);
    const [popularList, setPopularList] = useState<MovieProps[]>([]);

    useEffect(() => {
        if (data) {
            setMovieList(data.results);
        }

        if (popularData) {
            setPopularList(popularData.results);
        }
    }, [data, popularData]);

    return (
        <>
            <MovieFilter />

            <div className="mb-6">
                <MovieCard
                    banner={true}
                    movie={movieList[0]}
                    isLoading={isLoading}
                />
            </div>

            <MovieList isLoading={isLoading} movieList={movieList} title="Playing now" movieNumber={4} />
            <MovieList isLoading={isLoading} movieList={popularList}  title="Popular movies" movieNumber={4} />
        </>
    );
};

export default DashboardListDisplay;
