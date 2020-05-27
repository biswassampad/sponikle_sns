import React from 'react';
import {Route,Switch} from 'react-router-dom';

import PrivateRoute from './Router/privateRoute';

import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Dashboard from './pages/Dashboard';
import Profile from './pages/user/profile';
import Menu from './components/Menu';
import User from './pages/user/users';
import Editprofile from './pages/user/editProfile';
import Feed from './pages/Wall';
import Map from './pages/Map';


const Router =()=>(
  <div>
    <Switch>
      <Route path="/" component={Home} exact></Route>
      <Route path="/signup" component={Signup} exact></Route>
        <Route path="/signin" component={Signin} exact></Route>
          <Route path="/dashboard" component={Dashboard} exact></Route>
          <Route path="/user/:userId" component={Profile} exact></Route>
          <Route path="/feed" component={Feed} exact></Route>
          <Route path="/users" component={User} exact></Route>
          <Route path="/explore" component={Map} exact></Route>
          <PrivateRoute path="/user/edit/:userId" component={Editprofile} exact></PrivateRoute>>
    </Switch>
  </div>
)

export default Router;
