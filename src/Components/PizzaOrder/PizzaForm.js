import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { AddOrder } from '../../Services/DB';
import PizzaEntry from './PizzaEntry';

const component_name = "PIZZA_FORM";

class PizzaForm extends Component{
    //constructor
    constructor(props) {
        super(props);

        this.initialState = {       
            order_date: new Date(),
            pizza_type: '',
            pizza_price: '',
            order_placed: false,
        }

        this.state = this.initialState;

        //associate method as property
        this.handleSelectedPizza   = this.handleSelectedPizza.bind(this);

        console.log("{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}} ===>", this.props.place.title);
        console.log("{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}} ===>", this.props.email);        
    };
    
    handleSelectedPizza(pizza_selection){

        const {pizza, price} = pizza_selection;

        console.log("HANDLE_SELECTED_PIZZA ===>", pizza);          
        console.log("HANDLE_SELECTED_PIZZA ===>", price);

        this.setState( () => {
                return {
                    pizza_type: pizza,
                    pizza_price: price,
                }                
            }
        );

        //read email from props and store
        let orderRequest = {
            order: { 
                email: this.props.email,
                pizza: pizza,
                price: price,
                date:  this.state.order_date,
                place: this.props.place.title,
            },
            //by passing this method into the firebase method, we will use it to
            //receive data from the firebase cloud firestore
            callback: () => {

                this.setState(
                    {
                        order_placed: true,
                    }
                );                
            }
        }
    
        //call the DB method
        AddOrder(orderRequest);

    }

    render() {
        
        if(this.state.order_placed === true) {
            //flip it back
            this.setState({
                order_placed: false,
            });
            return <Redirect to='/history' />
        }

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