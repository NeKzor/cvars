import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContextProvider from './ContextProvider';
import * as serviceWorker from './utils/serviceWorker';

const app = (
    <ContextProvider>
        <App />
    </ContextProvider>
);

ReactDOM.render(app, document.querySelector('#root'));

serviceWorker.unregister();
