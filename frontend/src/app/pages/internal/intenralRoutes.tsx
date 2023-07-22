import React from 'react';
import { RouteObject } from 'react-router-dom';
import { PageLoader } from 'components/loaders';

const NotFound = React.lazy(() => import('../NotFound'));

export const internalRoutes: RouteObject[] = [
    {
        children: [
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Login /> */}
                    </React.Suspense>
                ),
                path: '/all',
            },
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Register /> */}
                    </React.Suspense>
                ),
                path: '/:category',
            },
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Register /> */}
                    </React.Suspense>
                ),
                path: '/most-watched',
            },
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Register /> */}
                    </React.Suspense>
                ),
                path: '/new',
            },
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Register /> */}
                    </React.Suspense>
                ),
                path: '/discovery',
            },
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <Register /> */}
                    </React.Suspense>
                ),
                path: '/watch-later',
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
