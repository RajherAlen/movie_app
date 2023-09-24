import { Link, useLocation } from 'react-router-dom';

import clsx from 'clsx';

interface SvgIconProps {
    width: number;
    className?: string;
}

type SvgIconComponent = React.FC<SvgIconProps>;

interface NavigationItemProps {
    icon?: SvgIconComponent;
    title: string;
    to: string;
}

const NavigationItem = ({ icon: Icon, title, to }: NavigationItemProps) => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const isActive = currentLocation === to;

    const isActiveStyle = isActive
        ? 'text-slate-600 dark:text-white'
        : 'text-slate-400';

    return (
        <Link
            to={to}
            className="mb-1 flex items-center gap-3 rounded-sm p-2 transition-all ease-out hover:bg-slate-100 hover:dark:bg-slate-900"
        >
            {Icon && <Icon width={16} className={isActiveStyle} />}
            <div className={clsx('text-sm font-medium', isActiveStyle)}>
                {title}
            </div>
        </Link>
    );
};

export default NavigationItem;
