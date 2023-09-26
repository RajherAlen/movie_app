import { useGetWatchListQuery } from 'features/watchlist/api/watchListApiSlice';

import { useAppSelector } from 'app/auth/hooks';

const WatchListListDisplay = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);
    const { data, isLoading } = useGetWatchListQuery(userInfo.id);
    console.log(data)
    if (isLoading) return <div>Loading...</div>;
    
    if (data?.length === 0) return <div>List is empty</div>;

    return (
        <div>
            {data?.map((movie: any) => {
                const { title, overview, poster_path, vote_average } = movie;
                return (
                    <div key={movie.id}>
                        <div>{title}</div>
                        {/* <div>{overview}</div> */}
                        {/* <div>{poster_path}</div> */}
                        {/* <div>{vote_average}</div> */}
                    </div>
                );
            })}
        </div>
    );
};

export default WatchListListDisplay;
