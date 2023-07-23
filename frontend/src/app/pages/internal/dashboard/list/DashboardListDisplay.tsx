import { useGetPlayingNowMoviesQuery } from 'features/movies/api/movieApiSlice';
import { MovieCard } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';
import { useEffect, useState } from 'react';

const DashboardListDisplay = () => {
    const { data, isLoading } = useGetPlayingNowMoviesQuery();
    const [movieList, setMovieList] = useState<MovieProps[]>([]);

    // const { data, isLoading } = useGetMovieByNameQuery();
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            setMovieList(data.results);
        }
    }, [data, isLoading]);

    return (
        <div className='grid grid-cols-4 gap-4'>
            {movieList.map((movie) => {
                return <MovieCard {...movie} key={movie.id} />;
            })}
        </div>
    );
};

export default DashboardListDisplay;
