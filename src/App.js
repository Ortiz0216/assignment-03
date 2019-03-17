//npm imports
import React, { Component } from 'react';
import { Route } from "react-router-dom";

//my imports
import JumbotronComponent from './Components/Header/JumbotronComponent';
import MapboxMap from './Components/Location/MapboxMap';
import Navbar from './Components/Header/Navbar';
import PizzaForm from './Components/PizzaOrder/PizzaForm';
import PizzaPlace from './Components/PizzaPlaces/PizzaPlace';
import PizzaPlaces from './Components/PizzaPlaces/PizzaPlaces';
import OrderHistory from './Components/PizzaOrder/OrderHistory';
import firebase from './Services/Firebase';
import './App.css';

const component_name = "APP COMPONENT";

/**
 * Entry point for the application
 */
class App extends Component {
    constructor(props) {
        super(props);

        //"local" variables to this instance
        this.app_name = "Pizza Bandit";
        this.order_date = new Date();
        
        //master app-level state
        this.state = {
            lng: -98.5795,  //US geographic center lng
            lat: 39.828175, //US geographic center lat
            user: {
                uid: '',
                //use the logged in user or nobody                
                userEmail: firebase.auth().currentUser ? firebase.auth().currentUser : '',
                userAuthenticated: false
            },
            pizza_place: '',
        };

        //bind methods to the class
        //event handlers
        this.handleLoginFormSubmission = this.handleLoginFormSubmission.bind(this);
        this.handleLogoutFormSubmission = this.handleLogoutFormSubmission.bind(this);        
        this.handleMapCoordsUpdate = this.handleMapCoordsUpdate.bind(this);
        this.handleSentRandomPlace = this.handleSentRandomPlace.bind(this);
        
        //composite pages for routing
        this.HomePage = this.HomePage.bind(this);
        this.OrderPage = this.OrderPage.bind(this);
        this.AboutPage = this.AboutPage.bind(this);
        this.OrderHistoryPage = this.OrderHistoryPage.bind(this);

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
                    console.log(component_name, 
                                `${firebase.auth().currentUser.email} is logged in`);                    
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
                console.log(component_name, 
                            "AUTH_STATE_CHANGED", "nobody is logged in");

            }
        });  
    }

    // LIFECYCLE METHODS //////////////////////////////////////////////////////    
    //run prior to mounting - useful to get initial LAT/LON from browser
    /**
     * Lifecycle method - runs just before monuting a component
     */
    componentWillMount(){
        //get location from browser
        this.setCurrentLocation();
    }    

    // UTILITIES //////////////////////////////////////////////////////////////
    /**
     * Gets current location from browser/user agent
     */
    setCurrentLocation(){
        //check to see if we can get the browser's geolocation
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                //set state properties for lat and long
                this.setState( () => {
                        return {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }
                );
            });
        } else {
            console.log(component_name, 
                        "Geolocation is not supported by this browser.");
        }
    }

    // EVENT HANDLERS /////////////////////////////////////////////////////////
    /**
     * Called from children components for updated map coordinates
     * @param {*} coords 
     */
    handleMapCoordsUpdate(coords){

        console.log(component_name, 
                    `Coords from child: LAT ${coords.lat} and LNG ${coords.lng}`)

        this.setState( () => {
                return {
                    lat: coords.lat,
                    lng: coords.lng,
                };
            }
        );
    }

    /**
     * User email and password from child component - used to log into Firebase
     * @param {*} user 
     */
    handleLoginFormSubmission(user){

        const { email, password, } = user;

        //sign into firebase using the auth service there
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                
                console.log(component_name, 
                            `${firebase.auth().currentUser.email} is logged in`)     
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(component_name, 
                            `Error: ${errorCode} and Message: ${errorMessage}`);
                // ...
            });

    }

    /**
     * Logout from Firebase
     * @param {*} user 
     */
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

    /**
     * Handle a randomly-selected place from the places API
     * @param {*} place 
     */
    handleSentRandomPlace(place) {
        this.setState({
            pizza_place: place,
        });
    }    
    
    // PAGES //////////////////////////////////////////////////////////////////
    /**
     * HOME PAGE composite component
     */
    HomePage() {

        //destructuring the state object
        const { lng, lat, } = this.state;  

        return(
            <React.Fragment>
                <div className="row py-2">
                    <MapboxMap lng={lng}
                               lat={lat}
                               sendMapCoordsUpdate={this.handleMapCoordsUpdate} />
                </div>        
                <div className="row">
                    <PizzaPlaces coords={
                                {
                                    lat: lat,
                                    lng: lng,
                                }}
                                title="Nearby Pizza Locations"
                                sendRandomPlace={this.handleSentRandomPlace} />
                </div>   
            </React.Fragment>            
        );
    }

    /**
     * ORDER PAGE composite component
     */
    OrderPage() {

        let pizza_form;
        let pizza_place;

        if(this.state.user.userAuthenticated){

            if(this.state.pizza_place){
                pizza_place =   <div className="card-columns">
                                    <PizzaPlace key={this.state.pizza_place.id} 
                                                placedata={this.state.pizza_place} />
                                </div> 
            }
            else{
                pizza_place = <div></div>;
            }

            pizza_form = <div className="row">
                            <PizzaForm email={this.state.user.userEmail}
                                       place={this.state.pizza_place} />
                            {pizza_place}                                       
                         </div>;

        }else{
            pizza_form = <div className="row"><p>You must be logged in to order.</p></div>;
        }

        return(
            <React.Fragment>
                <div className="row">
                    {pizza_form}
                </div>
            </React.Fragment>            
        );     

    }

    /**
     * ABOUT PAGE composite component
     */
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

    /**
     * ORDER HISTORY PAGE composite component
     */
    OrderHistoryPage(){

        console.log(component_name, this.state.user.userEmail);

        return(
            <OrderHistory email={this.state.user.userEmail} />
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

                    {/* take note that what is happening here is that the router
                        renders the content here in this space.  The Navbar and Jumbotron
                        stay in the same place on each page. */}
                    <Route path="/" exact component={this.HomePage} />
                    <Route path="/order" component={this.OrderPage} />
                    <Route path="/history" component={this.OrderHistoryPage} />
                    <Route path="/about" component={this.AboutPage} />
                </div>
            </div>            
        );
    }
}

export default App;