import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from 'components/index';
import { Button } from 'components/ui/Button';

import { useChangeStatusMutation, useDeleteMovieMutation } from 'features/watchlist/api/watchListApiSlice';

import { useAppSelector } from 'app/auth/hooks';

import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowDown, ArrowUp, ArrowUpDown, DeleteIcon, TrashIcon, Video } from 'lucide-react';
import validationToast from 'utils/validation/validationToast';

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
                <p
                    className="inline-block cursor-pointer hover:text-gray-300 transition-all duration-200"
                    onClick={handleTitleClick}
                >
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
            console.log(isWatched);
            const { userInfo } = useAppSelector((state) => state.authStore);
            const [changeStatus] = useChangeStatusMutation();

            const handleStatusChange = () => {
                const movieId = params.row.original.movie_id;

                changeStatus({ movieId, userId: userInfo.id, isWatched: isWatched === 'false' ? 'true' : 'false' });
            };

            return (
                <div className="flex justify-center">
                    <div
                        onClick={handleStatusChange}
                        className={clsx(
                            'py-1 px-4  inline shadow-md no-underline rounded-full text-white text-xs font-medium cursor-pointer',
                            isWatched === 'true' ? 'bg-green-600' : 'bg-red-700'
                        )}
                    >
                        {isWatched === 'true' ? 'Watched' : 'Not Watched'}
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
    {
        accessorKey: 'action',
        header: () => {
            return <div className="text-right">Action</div>;
        },
        cell: (params) => {
            const { userInfo } = useAppSelector((state) => state.authStore);
            const [deleteMovie, { isError, data }] = useDeleteMovieMutation();
            const [isOpen, setIsOpen] = useState<boolean>(false);

            useEffect(() => {
                if (data) {
                    validationToast({
                        status: 'success',
                        message: 'Movie is removed',
                    });
                }

                if (isError) {
                    validationToast({
                        status: 'error',
                        message: 'Something went wrong, please try again',
                    });
                }
            }, [data, isError]);

            const handleDeleteMovie = (e: any) => {
                const movieId = e.target.getAttribute('data-id');
                deleteMovie({ movieId, userId: userInfo.id });
                setIsOpen(false);
            };

            return (
                <div className="text-right">
                    <Modal onOpenChange={setIsOpen} open={isOpen}>
                        <Modal.Trigger className="inline-flex items-center gap-2 justify-center h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                            <TrashIcon width="16" />
                            Delete
                        </Modal.Trigger>
                        <Modal.Content
                            title="Delete movie"
                            description="Are you sure you want to delete this movie from watchlist?"
                        >
                            <div className="flex gap-2 justify-end">
                                <Button variant="outline" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="inline-flex item-center gap-2"
                                    onClick={handleDeleteMovie}
                                    data-id={params.row.original.movie_id}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Modal.Content>
                    </Modal>
                </div>
            );
        },
        size: 100,
    },
];
