import React from 'react';

type Props = {
    children: React.ReactNode;
};

export const MainContent: React.FC<Props> = (props) => {
    return <div className='p-6'>{props.children}</div>;
};
