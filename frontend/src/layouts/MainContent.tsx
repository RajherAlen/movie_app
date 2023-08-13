import React, { useEffect, useState } from 'react';

import { setNewPage } from 'features/movies/movieSlice';

import { useAppDispatch, useAppSelector } from 'app/auth/hooks';

type Props = {
    children: React.ReactNode;
};

export const MainContent: React.FC<Props> = (props) => {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.movieStore.currentPage);
    
    const [currentPage, setCurrentPage] = useState<number>(page);

    const handleScroll = (e: any) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

        if (bottom) {
            // No need to use prev here, just increment the value directly
            setCurrentPage(() => page + 1);
        }
    };

    useEffect(() => {
        // Dispatch the action when currentPage changes
        dispatch(setNewPage(currentPage));
    }, [currentPage, dispatch]);

    return (
        <div className="overflow-y-auto p-6" onScroll={(e) => handleScroll(e)}>
            {props.children}
        </div>
    );
};

