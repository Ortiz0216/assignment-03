import React, { Component } from 'react';

import PizzaEntry from './PizzaEntry';

class PizzaForm extends Component{
    //constructor
    constructor(props) {
        super(props);

        this.initialState = {       
            customer_email: '',            
            delivery_zipcode:'',
            order_date: new Date(),
            pizza_type: '',
        }

        this.state = this.initialState;

        //associate method as property
        this.handleOrderSubmit   = this.handleOrderSubmit.bind(this);
        this.handleEmailChange   = this.handleEmailChange.bind(this);        
        this.handleSelectedPizza   = this.handleSelectedPizza.bind(this);
        this.handleZipcodeChange = this.handleZipcodeChange.bind(this);

    };

    handleOrderSubmit(){

        //we'd save to the database here in the future

        const order = {
            customer_email: this.state.customer_email,            
            delivery_zipcode: this.state.delivery_zipcode,
            order_date: new Date(),
            pizza_type: this.state.pizza_type,
        };

        this.props.onSubmit(order);

    }
    
    handleSelectedPizza(selected_pizza){

        const pizza_type = selected_pizza;

        this.setState( () => {
                return {
                    pizza_type
                }                
            }
        );
    }

    handleEmailChange(event){
        const customer_email = event.target.value;

        this.setState( () => {
            return {
                customer_email
            }                
        }
    );        

    }

    handleZipcodeChange(event){

        const delivery_zipcode = event.target.value;

        this.setState( () => {
                return {
                    delivery_zipcode
                }
            }
        );
    }     

    render() {
        return (
            <div>
                <div className="card-group">
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Cheese"/>
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Pepperoni" />
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Supreme" />
                </div>
                <div className="form-group">
                <input className="form-control" 
                       id="zipcodeInput" 
                       onChange={this.handleZipcodeChange}                       
                       placeholder="Delivery zip code" 
                       type="text"
                       value={this.state.delivery_zipcode}  />
                </div>
                <div className="input-group mb-3">
                    <input 
                        className="form-control"            
                        id="emailInput"
                        onChange={this.handleEmailChange}
                        placeholder="User email address"
                        type="text"
                        value={this.state.customer_email} />
                    <div className="input-group-append">
                        <button className="btn btn-primary" 
                                id="button-addon2"
                                onClick={this.handleOrderSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    };
}

export default PizzaForm;