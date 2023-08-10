import React from 'react';

import { Input } from 'components/ui/input';

import { searchedMovie } from 'features/movies/movieSlice';

import { useAppDispatch } from 'app/auth/hooks';

interface MainHeaderProps {
    children?: React.ReactNode;
}

const MainHeader = ({ children }: MainHeaderProps) => {
    const dispatch = useAppDispatch();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        delayedSearch(name);
    };

    const delayedSearch = (name: string) => {
        dispatch(searchedMovie(name));
    };

    return (
        <header className="body-font h-20 w-full border-b py-4 text-gray-600">
            <div className="w-52">
                <Input
                    placeholder="Search movie or TV show"
                    onChange={handleSearchChange}
                />
            </div>
            {children}
        </header>
    );
};

export default MainHeader;
