import React from 'react';
import { BrowserRouter } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
};

export const AppContainer: React.FC<Props> = (props) => {
    return <BrowserRouter>{props.children}</BrowserRouter>;
};
