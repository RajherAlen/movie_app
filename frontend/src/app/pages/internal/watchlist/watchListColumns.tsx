import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowUpDown } from 'lucide-react';

export type Movie = {
    id: string | number;
    title: string;
    isWatched: boolean;
    vote_average: number;
};

const SortHeader = ({ title, column, additoinalClass }: { title: string; additoinalClass?: string; column: any }) => {
    return (
        <div
            className={clsx('flex items-center gap-2 cursor-pointer', additoinalClass ? additoinalClass : '')}
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
        size: 700,
    },
    {
        accessorKey: 'isWatched',
        header: ({ column }) => <SortHeader title={'Status'} additoinalClass="justify-center" column={column} />,
        cell: ({ row }) => {
            const isWatched = row.getValue('isWatched');
            return (
                <div className="flex justify-center">
                    <div
                        className={clsx(
                            'py-1 px-4  inline shadow-md no-underline rounded-full text-white text-xs font-medium cursor-pointer',
                            isWatched ? 'bg-green-600' : 'bg-red-700'
                        )}
                    >
                        {isWatched ? 'Watched' : 'Not Watched'}
                    </div>
                </div>
            );
        },
        size: 200,
        maxSize: 200,
    },
    {
        accessorKey: 'vote_average',
        header: ({ column }) => <SortHeader title={'Vote'} additoinalClass="justify-end" column={column} />,
        cell: ({ row }) => <div className="text-right">{row.getValue('vote_average')}</div>,
        size: 100,
    },
];
