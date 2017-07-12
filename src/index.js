import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import threads from './threads.json';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App threads={threads.sort((a, b) => a.id - b.id)} />, document.getElementById('root'));
registerServiceWorker();
