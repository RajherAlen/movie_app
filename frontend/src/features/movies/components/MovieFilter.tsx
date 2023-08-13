import { useEffect, useState } from 'react';

import Select from 'components/select/Select';

import { useGetGenresQuery } from '../api/movieApiSlice';
import { MovieGenres } from '../model/Movie';

interface MovieFilterProps {
    selectedGenre: string
    setGenre: (movies: any) => void;
    handleClearValue: () => void
}

const MovieFilter = ({ setGenre, selectedGenre, handleClearValue }: MovieFilterProps) => {
    const { data, isLoading } = useGetGenresQuery();
    const [movieGenres, setMovieGenres] = useState<MovieGenres[]>([]);
    
    useEffect(() => {
        if (data) {
            setMovieGenres(data.genres);
        }
    }, [data, isLoading]);

    return (
        <div className="mb-8">
            <Select
                label="Select genres"
                placeholder="Genres"
                options={movieGenres}
                onChange={(e: any) => setGenre(movieGenres.filter(item => item.name === e)[0])}
                value={selectedGenre}
                handleClearValue={handleClearValue}
            />
        </div>
    );
};

export default MovieFilter;
