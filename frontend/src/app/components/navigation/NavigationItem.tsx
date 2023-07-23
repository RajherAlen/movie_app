import clsx from 'clsx';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItemProps {
    icon?: React.ReactNode;
    title: string;
    to: string;
}

const NavigationItem = (props: NavigationItemProps) => {
    const location = useLocation();
    const currentLocation = location.pathname;
    const isActive = currentLocation === props.to;

    return (
        <Link
            to={props.to}
            className='mb-1 flex items-center gap-4 rounded-sm p-2 ease-out transition-all hover:bg-slate-900'
        >
            {props.icon && props.icon}
            <div
                className={clsx(
                    'text-sm font-medium',
                    isActive ? 'text-white' : 'text-slate-400',
                )}
            >
                {props.title}
            </div>
        </Link>
    );
};

export default NavigationItem;
