import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/AppComponent/App'
import 'bootstrap/dist/css/bootstrap.css';

import './styles/index.css'

ReactDOM.render( <BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('root'));


