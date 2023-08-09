import React from 'react';

import Navigation from 'components/navigation/Navigation';

import { MainContent } from './MainContent';
import MainHeader from './MainHeader';

export type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div className="flex min-h-screen">
            <Navigation />

            <div className="flex h-screen flex-1 flex-col pl-6">
                <MainHeader />
                <MainContent>{props.children}</MainContent>
            </div>
        </div>
    );
};

export default Layout;
