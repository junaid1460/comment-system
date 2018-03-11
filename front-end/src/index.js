import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RR from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RR />, document.getElementById('root'));
registerServiceWorker();
