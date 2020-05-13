import React from 'react';
import Router from './Router';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
const App = () =>(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
)

export default App;
