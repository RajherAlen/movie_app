import React from 'react';
import { RouteObject } from 'react-router-dom';
import { PageLoader } from 'components/loaders';

const NotFound = React.lazy(() => import('../NotFound'));

export const publicRoutes: RouteObject[] = [
    {
        // Public layout
        children: [
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Login /> */}
                    </React.Suspense>
                ),
                path: 'login',
            },
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Register /> */}
                    </React.Suspense>
                ),
                path: 'register',
            },
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        <NotFound />
                    </React.Suspense>
                ),
                path: '*',
            },
        ],
    },
];
