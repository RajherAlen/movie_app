import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

function App() {
    const elements = useRoutes(routes);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/app/dashboard');
        }
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {elements}
        </ThemeProvider>
    );
}

export default App;
