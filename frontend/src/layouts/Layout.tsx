import Navigation from 'components/navigation/Navigation';
import React from 'react';
import MainHeader from './MainHeader';
import { MainContent } from './MainContent';

export type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <div className="min-h-screen flex">
            <Navigation />

            <div>
                <MainHeader />
                <MainContent>{props.children}</MainContent>
            </div>
        </div>
    );
};

export default Layout;
