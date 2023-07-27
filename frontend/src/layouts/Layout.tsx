import Navigation from 'components/navigation/Navigation';
import React from 'react';
import MainHeader from './MainHeader';
import { MainContent } from './MainContent';

export type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div className="flex min-h-screen">
            <Navigation />

            <div className="flex flex-1 flex-col pl-6 h-screen">
                <MainHeader />
                <MainContent>{props.children}</MainContent>
            </div>
        </div>
    );
};

export default Layout;
