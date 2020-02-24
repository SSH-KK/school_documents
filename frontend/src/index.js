import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles.scss';
import ErrorHandler from './components/ErrorHandler';
import * as serviceWorker from './serviceWorker';
const AppWithErrorHandler = (
    <ErrorHandler>
        <App />
    </ErrorHandler>
)
ReactDOM.render(AppWithErrorHandler, document.getElementById('app'));
serviceWorker.unregister();
