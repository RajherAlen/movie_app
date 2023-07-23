import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useEffect } from "react";

function App() {
    const elements = useRoutes(routes);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/app/dashboard');
        }
    }, []);

    return elements;
}

export default App;
