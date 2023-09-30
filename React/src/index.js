import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Importe BrowserRouter
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router> {/* Coloque o BrowserRouter aqui */}
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
