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
            <React.Fragment>
                <form className="form form-inline ml-auto" onSubmit={this.onFormSubmit}>
                    <span className="navbar-text align-middle"><p className="text-light mr-sm-2">{current_user.email}</p></span>
                    <button type="submit" 
                            className="btn btn-primary mb-2 mr-sm-2">Logout</button>
                </form>
            </React.Fragment>              
        );
    };
}

export default LogoutForm;