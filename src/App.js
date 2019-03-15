//npm imports
import React, { Component } from 'react';

//my imports
import JumbotronComponent from './Components/JumbotronComponent';
import LoginForm from './Components/LoginForm';
import LogoutForm from './Components/LogoutForm';
import MapboxMap from './Components/MapboxMap';
import PizzaForm from './Components/PizzaForm';
import PizzaPlaces from './Components/PizzaPlaces';
import firebase from './Firebase';
import './App.css';

const component_name = "APP COMPONENT";

class App extends Component {
    constructor(props) {
        super(props);

        //"local" variables to this instance
        this.app_name = "Pizza Bandit";
        this.order_date = new Date();
        
        //master app-level state
        this.state = {
            lng: -98.5795,
            lat: 39.828175,
            user: {
                uid: '',                
                userEmail: '',
                userAuthenticated: false
            }
        };

        //bind methods to the class
        this.handleLoginFormSubmission = this.handleLoginFormSubmission.bind(this);
        this.handleLogoutFormSubmission = this.handleLogoutFormSubmission.bind(this);        
        this.handleMapCoordsUpdate = this.handleMapCoordsUpdate.bind(this);

        //what to do when authenticated
        //this example was useful: https://github.com/firebase/quickstart-js/blob/master/auth/email-password.html
        firebase.auth().onAuthStateChanged( (user) => {

            if(firebase.auth().currentUser){
                console.log(`FROM FIREBASE: ${firebase.auth().currentUser.email}`)
            }            

            //user logged in
            //values for id, displayname, and email come from firebase
            if(user){
                //get and set state values
                this.setState( () => {
                        return {
                            user: {
                                uid: user.id,
                                userEmail: user.email,
                                userAuthenticated: true
                            }
                        };
                    }
                );
                if(firebase.auth().currentUser){
                    console.log(component_name, `${firebase.auth().currentUser.email} is logged in`);                    
                }                
                
            } 
            //user not logged in
            else {
                //unset state values
                this.setState( () => {
                        return {
                            user: {
                                uid: '',
                                userEmail: '',
                                userAuthenticated: false
                            }
                        };
                    }
                );
                console.log(component_name, "AUTH_STATE_CHANGED", "nobody is logged in");

            }
        });  
    }

    handleMapCoordsUpdate(coords){

        console.log(component_name, `Coords from child: LAT ${coords.lat} and LNG ${coords.lng}`)

        this.setState( () => {
                return {
                    lat: coords.lat,
                    lng: coords.lng,
                };
            }
        );
    }

    handleLoginFormSubmission(user){

        const { email, password, } = user;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                
                console.log(component_name, `${firebase.auth().currentUser.email} is logged in`)     
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(component_name, `Error: ${errorCode} and Message: ${errorMessage}`);
                // ...
            });

    }

    handleLogoutFormSubmission(user){
        if(firebase.auth().currentUser){
            console.log(`${firebase.auth().currentUser.displayName} is logged in`);
        }   

        firebase.auth().signOut()
            .then(() => {
                console.log(component_name, `user is logged out`);
                this.setState( () => {
                    return {
                        user: {
                            userAuthenticated: false
                        }
                    };
                }
            );                
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(component_name, `Error: ${errorCode} and Message: ${errorMessage}`);
                // ...
            });

    }    

    render() {

        //unpacking the object
        const { lng, lat, } = this.state;

        let login_content;
        let logged_in_user;
        let pizza_form;

        if(this.state.user.userAuthenticated){
            logged_in_user = firebase.auth().currentUser;
            pizza_form = <div className="row">
                            <PizzaForm />
                         </div>;
        }else{
            pizza_form = <div></div>;

        }

        //we'll conditionally show login or logout
        if(this.state.user.userAuthenticated){
            login_content= <LogoutForm user={logged_in_user}
                                       onFormSubmit={this.handleLogoutFormSubmission} />
        }else{
            login_content = <LoginForm form_name="Login"
                                       onFormSubmit={this.handleLoginFormSubmission}  />            
        }

        return (
            <div className="container">
                <div className="row">
                    <JumbotronComponent app_name={this.app_name}
                                        order_date={this.order_date} />
                </div>
                <div className="row">
                    {login_content}
                </div>                   
                <div className="row py-2">
                    <MapboxMap sendMapCoordsUpdate={this.handleMapCoordsUpdate} />
                </div>
                <div className="row">
                    {pizza_form}
                </div>
                <div className="row">
                    <PizzaPlaces coords={
                                {
                                    lat: lat,
                                    lng: lng,
                                }}
                                title="Pizza Locations" />
                </div>        
                <div id="formresults" className="row"></div>
            </div>
        );
    }
}

export default App;