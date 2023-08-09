import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './publicRoutes';

export const PublicArea: React.FC = () => {
    const elements = useRoutes(publicRoutes);

    return elements;
};

export default PublicArea;
