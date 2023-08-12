import { useState } from 'react';

import FeaturedMovies from './components/FeaturedMovies';
import MoviesByGenre from './components/MoviesByGenre';
import MoviesBySearchQuery from './components/MoviesBySearchQuery';
import NowPlayingMovies from './components/NowPlayingMovies';
import TopRatedMovies from './components/TopRatedMovies';

import { MovieFilter } from 'features/movies/components';

import { useAppSelector } from 'app/auth/hooks';

interface SelectedGenreProps {
    id: number;
    name: string;
}

const DashboardListDisplay = () => {
    const movieName = useAppSelector((state) => state.movieStore.movieName);

    const [selectedGenre, setSelectedGenre] = useState<SelectedGenreProps>({
        id: 0,
        name: '',
    });

    return (
        <>
            <MovieFilter setGenre={setSelectedGenre} />

            {movieName && <MoviesBySearchQuery />}
            {selectedGenre.name !== '' && <MoviesByGenre {...selectedGenre} />}
            {!movieName && selectedGenre.name === '' && (
                <>
                    <FeaturedMovies />
                    <NowPlayingMovies />
                    <TopRatedMovies />
                </>
            )}
        </>
    );
};

export default DashboardListDisplay;
