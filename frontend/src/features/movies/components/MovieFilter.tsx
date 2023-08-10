import { useEffect, useState } from 'react';

import Select from 'components/select/Select';

import { useGetGenresQuery } from '../api/movieApiSlice';
import { MovieGenres } from '../model/Movie';

interface MovieFilterProps {
    setGenre: (movies: any) => void;
}

const MovieFilter = ({ setGenre }: MovieFilterProps) => {
    const { data, isLoading } = useGetGenresQuery();
    const [movieGenres, setMovieGenres] = useState<MovieGenres[]>([]);

    useEffect(() => {
        if (data) {
            setMovieGenres(data.genres);
        }
    }, [data, isLoading]);

    return (
        <div className="mb-8 flex gap-6">
            <div>
                <Select
                    label="Select genres"
                    placeholder="Genres"
                    options={movieGenres}
                    onChange={(e: any) => setGenre(movieGenres.filter(item => item.name === e)[0])}
                />
            </div>
            {/* <div>
                <Select
                    label="Select rating"
                    placeholder="Rating"
                    onChange={()=> {}}
                    options={[
                        { name: '10', id: Math.random() },
                        { name: '9', id: Math.random() },
                        { name: '8', id: Math.random() },
                        { name: '7', id: Math.random() },
                        { name: '6', id: Math.random() },
                        { name: '5', id: Math.random() },
                        { name: '4', id: Math.random() },
                        { name: '3', id: Math.random() },
                        { name: '2', id: Math.random() },
                        { name: '1', id: Math.random() },
                    ]}
                />
            </div> */}
        </div>
    );
};

export default MovieFilter;
