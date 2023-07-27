import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { PageLoader } from 'components/loaders';
import MainLayout from 'layouts/MainLayout';

const NotFound = React.lazy(() => import('../NotFound'));
const DashboardListDisplay = React.lazy(() => import('./dashboard/list/DashboardListDisplay'));
const UpcomingListDisplay = React.lazy(() => import('./upcoming/list/UpcomingListDisplay'));
const MoviePreviewListDisplay = React.lazy(() => import('./movie/preview/MoviePreviewListDisplay'));

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
