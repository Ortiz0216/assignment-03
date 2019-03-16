//npm imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//my imports
import JumbotronComponent from './Components/JumbotronComponent';
import LoginForm from './Components/LoginForm';
import LogoutForm from './Components/LogoutForm';
import MapboxMap from './Components/MapboxMap';
import Navbar from './Components/Navbar';
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
        //event handlers
        this.handleLoginFormSubmission = this.handleLoginFormSubmission.bind(this);
        this.handleLogoutFormSubmission = this.handleLogoutFormSubmission.bind(this);        
        this.handleMapCoordsUpdate = this.handleMapCoordsUpdate.bind(this);
        
        //composite pages for routing
        this.HomePage = this.HomePage.bind(this);
        this.OrderPage = this.OrderPage.bind(this);

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
    
    // PAGES //////////////////////////////////////////////////////////////////
    // HOME PAGE
    HomePage() {

        //destructuring the state object
        const { lng, lat, } = this.state;  

        return(
            <React.Fragment>
                <div className="row py-2">
                    <MapboxMap sendMapCoordsUpdate={this.handleMapCoordsUpdate} />
                </div>        
                <div className="row">
                    <PizzaPlaces coords={
                                {
                                    lat: lat,
                                    lng: lng,
                                }}
                                title="Nearby Pizza Locations" />
                </div>   
            </React.Fragment>            
        );
    }

    // ORDER PAGE    
    OrderPage() {

        //destructuring the state object
        const { lng, lat, } = this.state;        

        let pizza_form;

        if(this.state.user.userAuthenticated){
            pizza_form = <div className="row">
                            <PizzaForm />
                         </div>;
        }else{
            pizza_form = <div className="row"><p>You must be logged in to order.</p></div>;

        }        

        return(
            <React.Fragment>
                <div className="row">
                    {pizza_form}
                </div>
                <div className="row">
                    <PizzaPlaces coords={
                                {
                                    lat: lat,
                                    lng: lng,
                                }}
                                title="Nearby Pizza Locations" />
                </div> 
            </React.Fragment>            
        );     

    }

    // ABOUT PAGE    
    AboutPage(){

        const bees = ["img/bee1.png","img/bee2.png","img/bee3.png","img/bee4.png","img/bee5.png"];
        const bee = bees[Math.floor(Math.random() * bees.length)];
        return(
            <React.Fragment>
                <div className="text-center">
                    <img src={bee} alt="busy bee" />
                    <h1>Pizza Bandit is the Bee's Knees!</h1>                    
                </div>                
            </React.Fragment>            
        )
    }


    render() {

        //useful for ReactRouter v4
        //https://www.techiediaries.com/react-router-dom-v4/#react-router_vs_react-router-dom_vs_react-router-native        
        return (

            <div>
                <header>
                    <Navbar userAuthenticated={this.state.user.userAuthenticated}
                            handleLoginFormSubmission={this.handleLoginFormSubmission}
                            handleLogoutFormSubmission={this.handleLogoutFormSubmission} />
                    <JumbotronComponent app_name={this.app_name}
                                        order_date={this.order_date} />             
  
                </header>                                    
                <div className="container">
                    {/* <Route path="/" exact component={HomePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/contact" component={ContactPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component="{RegisterPage}" />
                    <Route path="/me" component={ProfilePage} /> */}

                    <Route path="/" exact component={this.HomePage} />
                    <Route path="/order" component={this.OrderPage} />
                    <Route path="/about" component={this.AboutPage} />                    
                </div>
            </div>            
        );
    }
}

export default App;