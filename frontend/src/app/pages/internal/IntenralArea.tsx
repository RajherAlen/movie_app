import { useRoutes } from 'react-router-dom';
import { internalRoutes } from './intenralRoutes';

export const IntenralArea: React.FC = () => {
    const elements = useRoutes(internalRoutes);

    return elements;
};

export default IntenralArea;
