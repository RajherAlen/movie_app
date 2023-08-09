import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppContainer } from 'layouts/AppContainer';

import { store } from 'app/auth/store';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
);
