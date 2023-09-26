import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from './hooks';

type Props = {
    children: JSX.Element;
};

export const AuthenticationGuard: React.FC<Props> = (props) => {
    const { userInfo, userToken } = useAppSelector((state) => state.authStore);

    // show unauthorized screen if no user or token is found in redux store
    if (!userInfo || !userToken) {
        return (
            <div>
                <div>
                    <h1>Unauthorized</h1>
                    <span>
                        <NavLink to="/login">Login</NavLink> to gain access
                    </span>
                </div>
            </div>
        );
    }

    // returns child route elements
    return props.children;
};
