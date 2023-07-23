import { Calendar, Compass, Heart, Megaphone } from 'lucide-react';
import NavigationItem from './NavigationItem';

const Navigation = () => {
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
                        icon={<Compass width={16} className="text-slate-400" />}
                        title="Browse"
                    />
                    <NavigationItem
                        to="/watchlist"
                        icon={<Heart width={16} className="text-slate-400" />}
                        title="Watchlist"
                    />
                    <NavigationItem
                        to="/comming-soon"
                        icon={<Calendar width={16} className="text-slate-400" />}
                        title="Comming Soon"
                    />
                    <NavigationItem
                        to="/watchlist"
                        icon={<Heart width={16} className="text-slate-400" />}
                        title="Watchlist"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
