import React from 'react';

type Props = {
    children: React.ReactNode;
};

export const MainContent: React.FC<Props> = (props) => {
    return <div className="overflow-y-auto  p-6">{props.children}</div>;
};
