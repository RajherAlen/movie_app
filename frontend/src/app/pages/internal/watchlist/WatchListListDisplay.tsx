import CustomTable from 'components/table/CustomTable';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'components/ui/table';

import { useGetWatchListQuery } from 'features/watchlist/api/watchListApiSlice';

import { useAppSelector } from 'app/auth/hooks';
import clsx from 'clsx';

const WatchListListDisplay = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data, isLoading } = useGetWatchListQuery(userInfo.id);

    if (isLoading) return <div>Loading...</div>;

    if (data?.length === 0 || !data) return <div>List is empty</div>;

    // return <>TEST</>;

    // // TODO
    // // ADD FILTERS FOR WATCHED | NOT WATCHED

    // // PAGINATION

    // // SEARCH

    // // SORT BY VOTE | ALPHABETICAL

    // // LINK TO PREVIEW

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    {/* <TableHead>Overview</TableHead> */}
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Vote</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((movie: any) => (
                    <TableRow key={movie.id}>
                        <TableCell className="font-medium min-w-[250px]">
                            {movie.title}
                        </TableCell>
                        {/* <TableCell className="min-w-[600px] max-w-[600px] truncate whitespace-nowrap overflow-hidden">
                            {movie.overview}
                        </TableCell> */}
                        <TableCell className="text-center">
                            <div className={clsx(
                                "py-1 px-4  inline shadow-md no-underline rounded-full text-white text-xs font-medium cursor-pointer",
                                movie.isWatched ? 'bg-green-600' : 'bg-red-700'
                            )}>
                                {movie.isWatched ? "Watched":"Not Watched"}
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            {movie.vote_average}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default WatchListListDisplay;
