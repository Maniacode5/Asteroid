import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import App from './js/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>, document.getElementById('root'));
registerServiceWorker();
