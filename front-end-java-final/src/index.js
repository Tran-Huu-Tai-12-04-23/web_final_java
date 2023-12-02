import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProviderApp from './context/theme';
import LoginProviderApp from './context/login';
import LoadingProviderApp from './context/loadingContext';
import SearchProviderApp from './context/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SearchProviderApp>
            <LoadingProviderApp>
                <LoginProviderApp>
                    <ThemeProviderApp>
                        <App />
                    </ThemeProviderApp>
                </LoginProviderApp>
            </LoadingProviderApp>
        </SearchProviderApp>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
