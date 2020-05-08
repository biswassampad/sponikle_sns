import React from 'react';
import { Link } from 'react-router-dom';

import {isAuthenticated} from './../functions';

export const Signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("j");
        return fetch("http://localhost:8080/signout", {
            method: "GET"
        })
    }
}



const Menu = ({ history }) => (
  <div>
      {!isAuthenticated() &&(
        <>
        <Link to = "/" > Home </Link>
        <Link to = "/signin"> SignIn </Link>
          <Link to = "/signUp" > SignUp </Link>
          </>
      )}
      {isAuthenticated()&&(
        <>
          <Link onClick = {() => Signout() } to="/" > SignOut </Link>
          <p>{isAuthenticated().user.name}</p>
          </>
      )}
     </div>
);

export default Menu;
