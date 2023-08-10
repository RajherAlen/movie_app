import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Input } from 'components/ui/input';

import { searchedMovie } from 'features/movies/movieSlice';

import { useAppDispatch } from 'app/auth/hooks';

interface MainHeaderProps {
    children?: React.ReactNode;
}

const MainHeader = ({ children }: MainHeaderProps) => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const [searchName, setSearchName] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;

        setSearchName(name);
        delayedSearch(name);
    };

    const delayedSearch = (name: string) => {
        dispatch(searchedMovie(name));
    };

    useEffect(() => {
        delayedSearch('');
        setSearchName('');
    }, [params]);

    return (
        <header className="body-font min-h-[75px] h-[75px] w-full border-b py-4 text-gray-600">
            {params['*'] === 'dashboard' && (
                <div className="w-52">
                    <Input
                        placeholder="Search movie or TV show"
                        onChange={handleSearchChange}
                        value={searchName}
                    />
                </div>
            )}
            {children}
        </header>
    );
};

export default MainHeader;
