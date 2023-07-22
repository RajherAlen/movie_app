import React from 'react';
import MainHeader from './MainHeader';

const MainLayout = () => {
    return (
        <div className="bg">
            <div>Navigation</div>
            <div>
                <MainHeader />
                <div>Content</div>
            </div>
        </div>
    );
};

export default MainLayout;
