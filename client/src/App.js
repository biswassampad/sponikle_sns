import React from 'react';
import Router from './Router';
import {BrowserRouter} from 'react-router-dom';

// styling imports
import { Grommet } from 'grommet';
import './index.css';
import './styles/colors.css';


const App = () =>(
<Grommet plain>
       <BrowserRouter>
         <Router />
       </BrowserRouter>
  </Grommet>

)

export default App;
