import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';

export type MainLayoutProps = {
    children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => (
    <Layout {...props}>
        <Outlet />
    </Layout>
);

export default MainLayout;
