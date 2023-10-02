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

const WatchListListDisplay = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data, isLoading } = useGetWatchListQuery(userInfo.id);

    if (isLoading) return <div>Loading...</div>;

    if (data?.length === 0 || !data) return <div>List is empty</div>;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Overview</TableHead>
                    <TableHead className='text-right'>Vote</TableHead>
                    {/* <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((movie: any) => (
                    <TableRow key={movie.id}>
                        <TableCell className="font-medium min-w-[250px]">
                            {movie.title}
                        </TableCell>
                        <TableCell className="min-w-[600px] max-w-[600px] truncate whitespace-nowrap overflow-hidden">
                            {movie.overview}
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
