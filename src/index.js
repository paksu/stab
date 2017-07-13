import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import threads from './threads.json';
import registerServiceWorker from './registerServiceWorker';

const sortedThreads = threads.sort((a, b) => {
  if (parseInt(a.id, 10) < parseInt(b.id, 10)) {
    return -1;
  }
  if (parseInt(a.id, 10) > parseInt(b.id, 10)) {
    return 1;
  }
  return 0;
});

ReactDOM.render(<App threads={sortedThreads} />, document.getElementById('root'));
registerServiceWorker();
