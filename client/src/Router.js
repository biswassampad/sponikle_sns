import React from 'react';
import {Route,Switch} from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Dashboard from './pages/Dashboard';

import Menu from './components/Menu';
const Router =()=>(
  <div>
    <Menu/>
    <Switch>
      <Route path="/" component={Home} exact></Route>
      <Route path="/signup" component={Signup} exact></Route>
        <Route path="/signin" component={Signin} exact></Route>
          <Route path="/dashboard" component={Dashboard} exact></Route>
    </Switch>
  </div>
)

export default Router;
