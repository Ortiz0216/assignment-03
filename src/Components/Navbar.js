//npm imports
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//my imports
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import firebase from '../Firebase';

const Navbar = (props) => {

    let login_content, logged_in_user;
    //let {login_content}

    //we'll conditionally show login or logout
    if(props.userAuthenticated){
        logged_in_user = firebase.auth().currentUser;
        login_content= <LogoutForm user={logged_in_user}
                                    onFormSubmit={props.handleLogoutFormSubmission} />
    }else{
        login_content = <LoginForm form_name="Login"
                                    onFormSubmit={props.handleLoginFormSubmission}  />            
    }    

    return(
        <div className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <a class="navbar-brand" href="#">Pizza Bandit!</a>                    
            <ul class="nav navbar-nav mr-auto" >
                <li class="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>                    
                <li class="nav-item">
                    <Link className="nav-link" to="/order">Order</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>                                        
            </ul>
            {login_content}
        </div>
    );
}

export default Navbar;