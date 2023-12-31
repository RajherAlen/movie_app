import { useEffect, useState } from 'react';

import { useAppSelector } from 'app/auth/hooks';

import { Calendar, Compass, Heart } from 'lucide-react';

import NavigationItem from './NavigationItem';

const Navigation = () => {
    const { userInfo } = useAppSelector((state) => state.authStore);

    return (
        <div className="w-52 border-r px-6">
            <div className="py-6 font-bold">Movie DB</div>

            <div className="border-t py-6">
                <p className="mb-4 text-xs font-bold text-slate-400">
                    News Feed
                </p>
                <div>
                    <NavigationItem
                        to="/dashboard"
                        icon={Compass}
                        title="Browse"
                    />
                    <NavigationItem
                        to="/comming-soon"
                        icon={Calendar}
                        title="Comming Soon"
                    />
                    <NavigationItem
                        to={`/watchlist/${userInfo.id}`}
                        icon={Heart}
                        title="Watchlist"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
