import React from 'react';
import ReactDOM from 'react-dom';
import MainRoutes from './routes/routes'
import { BrowserRouter} from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);