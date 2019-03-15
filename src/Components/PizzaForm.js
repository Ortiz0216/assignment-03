import React, { Component } from 'react';

import PizzaEntry from './PizzaEntry';

class PizzaForm extends Component{
    //constructor
    constructor(props) {
        super(props);

        this.initialState = {       
            order_date: new Date(),
            pizza_type: '',
        }

        this.state = this.initialState;

        //associate method as property
        this.handleOrderSubmit   = this.handleOrderSubmit.bind(this);
        this.handleSelectedPizza   = this.handleSelectedPizza.bind(this);
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

    render() {
        return (
            <div>
                <div className="card-group">
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Cheese"/>
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Pepperoni" />
                    <PizzaEntry onClick={this.handleSelectedPizza} pizza_type="Supreme" />
                </div>
            </div>
        );
    };
}

export default PizzaForm;