import  { useEffect, useState } from 'react';

import {
    useGetMovieByGenreQuery,
    useGetMovieByNameQuery,
    useGetPlayingNowMoviesQuery,
    useGetTopRatedMovieQuery,
} from 'features/movies/api/movieApiSlice';
import { MovieCard, MovieFilter, MovieList } from 'features/movies/components';
import { MovieProps } from 'features/movies/model/Movie';
import { useAppSelector } from 'app/auth/hooks';

const DashboardListDisplay = () => {
    const movieName = useAppSelector((state) => state.movieStore.movieName);

    const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([]);
    const [moviesByGenre, setMoviesByGenre] = useState<MovieProps[]>([]);
    const [movieList, setMovieList] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<{id: number, name: string}>({id: 0, name: ''});
  
    const { data: nowPlayingMovies, isLoading: nowPlayingLoading } = useGetPlayingNowMoviesQuery();
    const { data: topRated, isLoading: topRatedLoading } = useGetTopRatedMovieQuery();
    const { data: genreMovies, isLoading: genreLoading } = useGetMovieByGenreQuery(selectedGenre.id);
    const { data: searchResults, isLoading: searchResultsLoading } = useGetMovieByNameQuery(movieName);

    useEffect(() => {
        if (nowPlayingMovies) {
            setMovieList(nowPlayingMovies.results);
        }

        if (topRated) {
            setTopRatedMovies(topRated.results);
        }
    }, [nowPlayingMovies, topRated]);

    useEffect(() => {
        if (genreMovies && selectedGenre) {
            setMoviesByGenre(genreMovies.results);
        }
    }, [genreMovies, selectedGenre]);

    return (
        <>
            <MovieFilter setGenre={setSelectedGenre} />

            {movieName && searchResults ? (
                <MovieList
                    isLoading={searchResultsLoading}
                    movieList={searchResults.results}
                    title={`Searched name: ${movieName}`}
                    movieNumber={12}
                />
            ) : selectedGenre.name !== '' ? (
                <MovieList
                    isLoading={genreLoading}
                    movieList={moviesByGenre}
                    title={selectedGenre.name}
                    movieNumber={12}
                />
            ) : (
                <>
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

                    <MovieList
                        isLoading={nowPlayingLoading}
                        movieList={movieList}
                        title="Playing now"
                        movieNumber={4}
                    />
                    <MovieList
                        isLoading={topRatedLoading}
                        movieList={topRatedMovies}
                        title="Popular movies"
                        movieNumber={4}
                    />
                </>
            )}
        </>
    );
};

export default DashboardListDisplay;
