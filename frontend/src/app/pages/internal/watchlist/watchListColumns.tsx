import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export type Movie = {
    id: string | number;
    title: string;
    isWatched: boolean;
    vote_average: number;
};

const SortHeader = ({ title, column, alignEnd }: { title: string; alignEnd?: boolean; column: any }) => {
    return (
        <div
            className={clsx('flex items-center gap-2 cursor-pointer', alignEnd ? 'justify-end' : '')}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4 cur" />
        </div>
    );
};

export const columns: ColumnDef<Movie>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => <SortHeader title={'Title'} column={column} />,
    },
    {
        accessorKey: 'isWatched',
        header: ({ column }) => <SortHeader title={'Status'} column={column} />,
        cell: ({ row }) => {
            const isWatched = row.getValue('isWatched');
            return (
                <div
                    className={clsx(
                        'py-1 px-4  inline shadow-md no-underline rounded-full text-white text-xs font-medium cursor-pointer',
                        isWatched ? 'bg-green-600' : 'bg-red-700'
                    )}
                >
                    {isWatched ? 'Watched' : 'Not Watched'}
                </div>
            );
        },
    },
    {
        accessorKey: 'vote_average',
        header: ({ column }) => <SortHeader title={'Vote'} alignEnd column={column} />,
        cell: ({ row }) => <div className="text-right">{row.getValue('vote_average')}</div>,
    },
];
