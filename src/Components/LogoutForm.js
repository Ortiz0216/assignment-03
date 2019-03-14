import React, { Component } from 'react';
import * as firebase from 'firebase';

class LogoutForm extends Component {

    //constructor
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            results: '',
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.initFirebase = this.initFirebase.bind(this);

        this.firebaseapp = this.initFirebase();

    }

    initFirebase(){

        // REACT_APP_FIREBASE_API_KEY="AIzaSyAmyoDPN3I_UTRyKxNyKVgSXEtlOKXbt2o"
        // REACT_APP_FIREBASE_AUTH_DOMAIN="cidm4385-spring2019.firebaseapp.com"
        // REACT_APP_FIREBASE_DATABASE_URL="https://cidm4385-spring2019.firebaseio.com"
        // REACT_APP_FIREBASE_PROJECT_ID="cidm4385-spring2019"
        // REACT_APP_STORAGE_BUCKET="cidm4385-spring2019.appspot.com"
        // REACT_APP_MESSAGING_SENDER_ID="902346719730"        

        return firebase.initializeApp(
            {
                apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
                projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
                storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
                messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
              }
        );

    }

    //lift up data to parent and handle form submit
    onFormSubmit(event){

        //don't refresh page
        event.preventDefault();

        const results = "Email address is: " + this.state.email;

        this.setState( () => {
                return {
                    results
                };
            }
        );

        //this is also lifting state to the parent
        this.props.onFormSubmit(results);

    }

    render() {
        return (
            <div>
                <h2>{this.props.form_name}</h2>
                <form onSubmit={this.onFormSubmit}>
                    <p>{this.props.user.displayName} is logged in</p>
                    <button type="submit" 
                            className="btn btn-primary">Logout</button>
                </form>
            </div>            
        );
    };
}

export default LogoutForm;