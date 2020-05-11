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
    <nav>
   <div className="nav-wrapper green">
     <div className="container">
       <a href="#" className="brand-logo">Sponikle</a>
       <ul id="nav-mobile" className="right hide-on-med-and-down">
         {!isAuthenticated() &&(
           <>
         <li><Link to = "/" > Home </Link></li>
         <li><Link to = "/signin"> SignIn </Link></li>
         <li><Link to = "/signUp" > SignUp </Link></li>
           </>
      )}
      {isAuthenticated()&&(
        <>
        <li><Link to={`/user/${isAuthenticated().user._id}`}>{`${isAuthenticated().user.name}'s Profile`}</Link></li>
        <li><Link to="/users" > Users </Link></li>
        <li><Link onClick = {() => Signout() } to="/" > SignOut </Link></li>
        </>
        )}
       </ul>
     </div>

   </div>
 </nav>
     </div>
);

export default Menu;
