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

const initialValue = {
    id: 0,
    name: '',
}

const DashboardListDisplay = () => {
    const movieName = useAppSelector((state) => state.movieStore.movieName);

    const [selectedGenre, setSelectedGenre] = useState<SelectedGenreProps>(initialValue);

    return (
        <>
            <MovieFilter
                selectedGenre={selectedGenre.name}
                setGenre={setSelectedGenre}
                handleClearValue={() => setSelectedGenre(initialValue)}
            />

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
