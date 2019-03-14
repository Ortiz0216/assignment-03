import React, { Component } from 'react';

import PizzaPlace from './PizzaPlace';


class PizzaPlaces extends Component{

    constructor(props){
        super(props);

        this.state = {
            pizza_place_list: [],            
        }

        this.getPizzaPlacesFromHereAPI = this.getPizzaPlacesFromHereAPI.bind(this);        
    }

    componentDidMount(){
        //make rest call
        //this.getPizzaPlacesFromHereAPI();
        console.log(`LatLon properties from parent at PizzaPlaces Component Mount: LAT ${this.props.coords.lat} LON: ${this.props.coords.lng}`);
    }

    componentDidUpdate(prevProps, prevState, snapshot){

        /*so we don't update on every little change, just check to see
        if lat or lon changed */
        if(this.props.coords.lat !== prevProps.coords.lat || this.props.coords.lng !== prevProps.coords.lng){

            console.log(`Previous Lat: ${prevProps.coords.lat} and Prevous Lon:${prevProps.lng}`);
            console.log(`Current Lat: ${this.props.coords.lat} and Current Lon:${this.props.coords.lng}`);

            //make rest call
            this.getPizzaPlacesFromHereAPI();    
        }
    }      

    getPizzaPlacesFromHereAPI(){
    
        const here_api_url      = "https://places.cit.api.here.com/places/v1/autosuggest?";
        const here_api_at       = `at=${this.props.coords.lat},${this.props.coords.lng}&`;
        const here_api_q        = "q=pizza&";
        const here_api_app_id   = `app_id=${process.env.REACT_APP_HERE_API_APP_ID}&`;
        const here_api_app_code = `app_code=${process.env.REACT_APP_HERE_API_APP_CODE}`;

        console.log(here_api_url + here_api_at + here_api_q + here_api_app_id + here_api_app_code);
    
        //the built-in fetch API will make the REST/AJAX call for us: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch    
        fetch(here_api_url + here_api_at + here_api_q + here_api_app_id + here_api_app_code)
          .then( (response) => {
              //call HERE API and get returned list
              return response.json();
            }
          )
          //filter down to response that have locations (lat/lon)
          .then( (responseAsJson) => {
    
            //use the JavaScript filter method - https://www.w3schools.com/jsref/jsref_filter.asp
            const filtered = responseAsJson.results.filter( (result) => {
              //this checks to see if this record has a position array
              return result.position;
    
            });
    
            //return the filtered results
            return filtered;
            
          })
          //receive the promise response returned as a JSON object
          .then( (filtered) => {
    
              this.setState( () => {
                return {
                  pizza_place_list: filtered,
                }
              }
            );
    
            return filtered;
          })
          .then( (filtered) => {
    
            this.state.pizza_place_list.forEach( (pizza_place) => {
                const pizzalocation = pizza_place.title + ' ' +
                                      pizza_place.vicinity + ' ' +
                                      pizza_place.category;
    
                console.log(pizzalocation);
              }
            );
            console.log(this.state.pizza_place_list[2].title);
          })
          .catch(error => console.error(error));
    }    

    render(){

        const places = this.state.pizza_place_list;
        return(
            <div>
                <h1>{this.props.title}</h1> 
                <div className="card-columns">
                    {places.map( (place) => 
                        <PizzaPlace key={place.id} 
                                    placedata={place} />
                    )}
                </div>                
            </div>
        );
    }
}

export default PizzaPlaces;