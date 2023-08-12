import { useGetTopRatedMovieQuery } from "features/movies/api/movieApiSlice";
import { MovieList } from "features/movies/components";
import { MovieProps } from "features/movies/model/Movie";
import { useEffect, useState } from "react";

const TopRatedMovies = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([]);
    const { data: topRated, isLoading: topRatedLoading } = useGetTopRatedMovieQuery();    

    useEffect(() => {
        if (topRated) {
            setTopRatedMovies(topRated.results);
        }
    }, [ topRated]);

    return (
        <MovieList
            isLoading={topRatedLoading}
            movieList={topRatedMovies}
            title="Popular movies"
            // movieNumber={4}
        />
    );
};

export default TopRatedMovies;
