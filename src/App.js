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

class App extends Component {
    constructor(props) {
        super(props);

        this.app_name = "Pizza Bandit";
        this.order_date = new Date();
        
        this.state = {
            lng: -98.5795,
            lat: 39.828175,
            uid: '',
            userDisplayName: '',
            userEmail: '',
            userAuthenticated: false
        };

        this.handleLoginFormSubmission = this.handleLoginFormSubmission.bind(this);
        this.handleMapCoordsUpdate = this.handleMapCoordsUpdate.bind(this);

        console.log(firebase);

        //what to do when authenticated
        //this example was useful: https://github.com/firebase/quickstart-js/blob/master/auth/email-password.html
        firebase.auth().onAuthStateChanged( (user) => {
            //user logged in
            //values for id, displayname, and email come from firebase
            if(user){
                //get and set state values
                this.setState( () => {
                        return {
                            uid: user.id,
                            userDisplayName: user.displayName,
                            userEmail: user.email,
                            userAuthenticated: true
                        };
                    }
                );
                console.log(`${this.state.userDisplayName} (${this.state.email}) is logged in`);
            } 
            //user not logged in
            else {
                //unset state values
                this.setState( () => {
                        return {
                            uid: '',
                            userDisplayName: '',
                            userEmail: '',
                            userAuthenticated: false
                        };
                    }
                );
                console.log('nobody is logged in');

            }
        });  
    }

    handleMapCoordsUpdate(coords){

        console.log(`Coords from child: LAT ${coords.lat} and LNG ${coords.lng}`)

        this.setState( () => {
                return {
                    lat: coords.lat,
                    lng: coords.lng,
                };
            }
        );
    }

    handleLoginFormSubmission(userdata){

    }    

    render() {

        //unpacking the object
        const { lng, lat, } = this.state;

        let login_content;

        //we'll conditionally show login or logout
        if(this.state.userAuthenticated === false){
            login_content = <LoginForm firebase={this.firebaseapp}
                                       form_name="Login"
                                       onFormSubmit={this.handleLoginFormSubmission}  />
        }else{
            login_content= <LogoutForm />
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
                <PizzaForm />
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