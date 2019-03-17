import React, { Component } from 'react';

class PizzaEntry extends Component {
    
    //constructor
    constructor(props){
        super(props);

        this.prices = [4.99, 5.99, 6.99, 7.99];        

        this.state = {
            selected_pizza: '',
            selected_pizza_price: this.prices[Math.floor(Math.random() * this.prices.length)],
            style_value: 'btn btn-lg btn-block btn-primary',
        };

        this.handleSelectedPizzaButtonClick = this.handleSelectedPizzaButtonClick.bind(this);

    }

    handleSelectedPizzaButtonClick(event){

        //badge badge-success
        this.setState( () => {
                return {
                    style_value: "btn btn-lg btn-block btn-success",
                    selected_pizza: this.props.pizza_type,
                }
            }
        );   

        let pizza_selection = {
            pizza: this.props.pizza_type + " Pizza",
            price: this.state.selected_pizza_price,
        };

        this.props.onClick(pizza_selection);
    }

    render() {

        const selected_pizza = this.props.pizza_type;

        return (
            <div className="card bg-light mb-3">
                <img src={"img/" + this.props.pizza_type + ".png"} className="card-img-top" alt={this.props.pizza_type + " Pizza"} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.pizza_type} Pizza</h5>
                    <p className="card-text">A tasty {this.props.pizza_type} Pizza from a local provider.</p>
                    <p className="card-text text-center"><strong>YOUR PRICE:</strong> ${this.state.selected_pizza_price}</p>
                    <button className={this.state.style_value}
                            onClick={this.handleSelectedPizzaButtonClick}
                            value={this.selected_pizza} >
                        Select {this.props.pizza_type} Pizza
                    </button>
                </div>
            </div>
        );        
    }
}

export default PizzaEntry;