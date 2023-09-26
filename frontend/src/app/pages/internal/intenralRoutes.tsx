import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { PageLoader } from 'components/loaders';

import MainLayout from 'layouts/MainLayout';

const NotFound = React.lazy(() => import('../NotFound'));
// prettier-ignore
const DashboardListDisplay = React.lazy(() => import('./dashboard/list/DashboardListDisplay'));
// prettier-ignore
const UpcomingListDisplay = React.lazy(() => import('./upcoming/list/UpcomingListDisplay'));
// prettier-ignore
const MoviePreviewListDisplay = React.lazy(() => import('./movie/preview/MoviePreviewListDisplay'));
// prettier-ignore
const WatchListListDisplay = React.lazy(() => import('./watchlist/WatchListListDisplay'));

export const internalRoutes: RouteObject[] = [
    {
        children: [
            {
                element: <Navigate to="/" />,
                index: true,
            },
            {
                element: <MainLayout />,
                children: [
                    {
                        element: (
                            <React.Suspense fallback={<PageLoader />}>
                                <DashboardListDisplay />
                            </React.Suspense>
                        ),
                        path: '/dashboard',
                    },
                    {
                        element: (
                            <React.Suspense fallback={<PageLoader />}>
                                <UpcomingListDisplay />
                            </React.Suspense>
                        ),
                        path: '/comming-soon',
                    },
                    {
                        element: (
                            <React.Suspense fallback={<PageLoader />}>
                                <MoviePreviewListDisplay />
                            </React.Suspense>
                        ),
                        path: '/movie/preview/:movieId',
                    },
                    {
                        element: (
                            <React.Suspense fallback={<PageLoader />}>
                                <WatchListListDisplay />
                            </React.Suspense>
                        ),
                        path: '/watchlist/:userId',
                    },
                ],
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
