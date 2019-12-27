import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './utils/registerServiceWorker';

ReactDOM.render(<App />, document.querySelector('#root'));

serviceWorker.unregister();
