import React from 'react';
import { NavLink } from 'react-router-dom';

import { UnauthorizedIcon } from 'components/icons';

import { useAppSelector } from 'app/auth/hooks';

type Props = {
    children: JSX.Element;
};

export const AuthenticationGuard: React.FC<Props> = (props) => {
    const { userInfo, userToken } = useAppSelector((state) => state.authStore);

    // show unauthorized screen if no user or token is found in redux store
    if (!userInfo || !userToken) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center flex-col w-64 p-6 rounded-lg bg-slate-800">
                    <UnauthorizedIcon />

                    <h1 className="text-xl font-semibold mb-5">Unauthorized</h1>

                    <NavLink
                        className="h-10 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                        to="auth/login"
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        );
    }

    // returns child route elements
    return props.children;
};
