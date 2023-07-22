import React from 'react';
import { RouteObject } from 'react-router-dom';

import { PageLoader } from 'components/loaders';
// import { AuthenticationGuard } from 'app/auth/AuthenticationGuard';

const NotFound = React.lazy(() => import('./app/pages/NotFound'));
const PublicArea = React.lazy(() => import('./app/pages/public/PublicArea'));
const InternalArea = React.lazy(() => import('./app/pages/internal/IntenralArea'));

export const routes: RouteObject[] = [
    {
        children: [
            {
                // Public layout
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        <PublicArea />
                    </React.Suspense>
                ),
                path: '/*',
            },
            // ---------------------------------
            // PROTECTED AREA
            // ---------------------------------
            {
                element: (
                    <React.Suspense fallback={<PageLoader />}>
                        {/* <AuthenticationGuard> */}
                            <InternalArea />
                        {/* </AuthenticationGuard> */}
                    </React.Suspense>
                ),
                path: 'app/*', // Note: this can be changed
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
    {
        element: (
            <React.Suspense fallback={<PageLoader />}>
                <NotFound />
            </React.Suspense>
        ),
        path: '*',
    },
];
