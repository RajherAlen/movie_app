import { DataTable } from 'components/table/DataTable';

import { useGetWatchListQuery } from 'features/watchlist/api/watchListApiSlice';

import { useAppSelector } from 'app/auth/hooks';

import { columns } from './watchListColumns';

const WatchListListDisplay = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data, isLoading } = useGetWatchListQuery(userInfo.id);

    if (isLoading) return <div>Loading...</div>;

    if (data?.length === 0 || !data) return <div>List is empty</div>;

    // // LINK TO PREVIEW

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                showFilterInput
                filterPlaceholder="Search by title"
                columnFiltering="title"
            />
        </>
    );
};

export default WatchListListDisplay;
