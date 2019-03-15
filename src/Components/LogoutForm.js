import React, { Component } from 'react';

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

        let current_user;
        if(this.props.user){
            current_user = this.props.user;
        }
        else{
            current_user = 'NOBODY';
        }

        return (
            <div>
                <h2>{this.props.form_name}</h2>
                <form onSubmit={this.onFormSubmit}>
                    <p>{current_user.email} is logged in</p>
                    <button type="submit" 
                            className="btn btn-primary">Logout</button>
                </form>
            </div>            
        );
    };
}

export default LogoutForm;