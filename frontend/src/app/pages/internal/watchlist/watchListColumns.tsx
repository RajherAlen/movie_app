import { useNavigate } from 'react-router-dom';

import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

export type Movie = {
    id: string | number;
    title: string;
    isWatched: boolean;
    vote_average: number;
    movie_id: string;
};

interface SortHeaderProps {
    title: string;
    additoinalClass?: string;
    column: any;
    direction?: 'asc' | 'desc' | false;
}

const SortHeader = ({ title, column, additoinalClass, direction }: SortHeaderProps) => {
    let directionIcon;
    if (direction === 'desc') {
        directionIcon = <ArrowDown className="ml-2 h-4 w-4 cur" />;
    } else if (direction === 'asc') {
        directionIcon = <ArrowUp className="ml-2 h-4 w-4 cur" />;
    } else {
        directionIcon = <ArrowUpDown className="ml-2 h-4 w-4 cur" />;
    }

    return (
        <div
            className={clsx('flex items-center gap-2 cursor-pointer', additoinalClass ? additoinalClass : '')}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {title}
            {directionIcon}
        </div>
    );
};

export const columns: ColumnDef<Movie>[] = [
    {
        accessorKey: 'title',
        header: (params) => {
            const sortedDir = params.column.getIsSorted();
            return <SortHeader title={'Title'} column={params.column} direction={sortedDir} />;
        },
        size: 700,
        cell: (params) => {
            const { title, movie_id } = params.row.original;
            const navigate = useNavigate();

            const handleTitleClick = () => {
                navigate(`/movie/preview/${movie_id}`);
            };

            return (
                <p className="inline-block cursor-pointer hover:text-gray-300 transition-all duration-200" onClick={handleTitleClick}>
                    {title}
                </p>
            );
        },
    },
    {
        accessorKey: 'isWatched',
        header: (params) => {
            const sortedDir = params.column.getIsSorted();
            return (
                <SortHeader
                    title={'Status'}
                    additoinalClass="justify-center"
                    column={params.column}
                    direction={sortedDir}
                />
            );
        },
        cell: (params) => {
            const isWatched = params.row.getValue('isWatched');

            return (
                <div className="flex justify-center">
                    <div
                        className={clsx(
                            'py-1 px-4  inline shadow-md no-underline rounded-full text-white text-xs font-medium cursor-pointer',
                            isWatched === "true" ? 'bg-green-600' : 'bg-red-700'
                        )}
                    >
                        {isWatched === "true" ? 'Watched' : 'Not Watched'}
                    </div>
                </div>
            );
        },
        size: 200,
        maxSize: 200,
    },
    {
        accessorKey: 'vote_average',
        header: (params) => {
            const sortedDir = params.column.getIsSorted();
            return (
                <SortHeader title={'Vote'} additoinalClass="justify-end" column={params.column} direction={sortedDir} />
            );
        },
        cell: ({ row }) => <div className="text-right">{row.getValue('vote_average')}</div>,
        size: 100,
    },
];
