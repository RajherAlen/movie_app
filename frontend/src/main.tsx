import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContainer } from 'layouts/AppContainer';

import { store } from 'app/auth/store';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppContainer>
        <Provider store={store}>
            <App />
            <ToastContainer
                theme="colored"
                hideProgressBar
                autoClose={1500}
                transition={Zoom}
                draggable
            />
        </Provider>
    </AppContainer>,
);
