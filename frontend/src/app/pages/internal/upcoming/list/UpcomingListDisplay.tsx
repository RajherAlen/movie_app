import { useEffect, useState } from 'react';

import { useGetUpcomingMovieQuery } from 'features/movies/api/movieApiSlice';
import { MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';

const UpcomingListDisplay = () => {
    const { data, isLoading } = useGetUpcomingMovieQuery();
    const [movieList, setMovieList] = useState<MovieProps[]>([]);

    useEffect(() => {
        if (data) {
            setMovieList(data.results);
        }
    }, [data, isLoading]);

    return (
        <div>
            <MovieList
                isLoading={isLoading}
                movieList={movieList}
                title="Upcoming Movies"
                grid
            />
        </div>
    );
};

export default UpcomingListDisplay;
