//npm imports
import React from 'react';
import { Link } from "react-router-dom";

//my imports
import LoginForm from '../Login/LoginForm';
import LogoutForm from '../Login/LogoutForm';
import firebase from '../../Services/Firebase';

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
            <a className="navbar-brand" href="#">Pizza Bandit!</a>                    
            <ul className="nav navbar-nav mr-auto" >
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>                    
                <li className="nav-item">
                    <Link className="nav-link" to="/order">Order</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/history">History</Link>
                </li>                
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>                                        
            </ul>
            {login_content}
        </div>
    );
}

export default Navbar;