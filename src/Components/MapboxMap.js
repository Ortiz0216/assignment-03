import React, {Component} from 'react';
import ReactMapboxGl, {Layer,Feature} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN,
});

class MapboxMap extends Component {

    constructor(props) {
        super(props);

        const mapstyles = ["basic", "streets", "bright", "light", "dark", "satellite"];

        this.app_name = "Pizza Bandit";
        this.order_date = new Date();

        this.state = {
            lng: -98.5795,
            lat: 39.828175,
            mapstyle: mapstyles[Math.floor(Math.random() * mapstyles.length)],
        };

        this.setCurrentLocation = this.setCurrentLocation.bind(this);

    }

    /* get current location from browser/user agent */
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
        }else{
            console.log("Geolocation is not supported by this browser.");
        }
    }

    componentWillMount(){
        //get location from browser
        this.setCurrentLocation();
    }

    //lifecycle method
    componentDidMount(){



        //lift lat/lng state
        const coords = { 
            lat: this.state.lat,
            lng: this.state.lng,
        };
        this.props.sendMapCoordsUpdate(coords);        

    }

    componentDidUpdate(prevProps, prevState, snapshot){

        /*so we don't update on every little change, just check to see
        if lat or lon changed */
        if(this.state.lat !== prevState.lat || this.state.lng !== prevState.lng){

            console.log(`Previous Lat: ${prevState.lat} and Prevous Lon:${prevState.lng}`);
            console.log(`Current Lat: ${this.state.lat} and Current Lon:${this.state.lng}`);

            //lift lat/lng state
            const coords = { 
                lat: this.state.lat,
                lng: this.state.lng,
            };
            this.props.sendMapCoordsUpdate(coords);
        }
    }     
  
    render(){

        //unpacking the object
        const { lng, lat, mapstyle } = this.state;

        return(
            <div>
                {/* <div className="mx-auto">{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div> */}
                <Map style={`mapbox://styles/mapbox/${mapstyle}-v9`}
                    center={[lng, lat]}
                    containerStyle={{
                        //set height to be 1/3 of available screen height - this is vanilla javascript
                        height: window.screen.availHeight / 3 + "px",
                        width: Math.floor(window.screen.availWidth * 0.52) + "px"
                        //width: "100%"
                    }}>
                    <Layer type="symbol"
                            id="marker"
                            layout={{ "icon-image": "marker-15"}}>
                            <Feature coordinates={[lng, lat]}/>
                    </Layer>
                </Map>
          </div>
        );
    }
}

export default MapboxMap;