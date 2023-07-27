import React from 'react';

type Props = {
    children: React.ReactNode;
};

export const MainContent: React.FC<Props> = (props) => {
    return <div className='py-6 pr-6 overflow-y-auto'>{props.children}</div>;
};
