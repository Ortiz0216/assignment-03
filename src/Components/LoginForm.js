import React, { Component } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

const component_name = "LOGIN_FORM COMPONENT";

class LoginForm extends Component {

    //constructor
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            user: {},
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    //method to receive lifted Email state from child
    onEmailChange(email){
        
        console.log(component_name, "Email from the child: " + email);

        this.setState( () => {
                return {
                    email
                };
            }
        );

        console.log(component_name, "Email from the parent state: " + this.state.email);
    }

    //method to receive lifted Password state from child
    onPasswordChange(password){
        
        console.log(component_name, "From the child: " + password);

        this.setState( () => {
                return {
                    password
                };
            }
        );

        console.log(component_name, "Password from the parent state: " + this.state.password);
    }    

    onFormSubmit(event){

        event.preventDefault();

        //create a user object to send back to App
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState( () => {
                return {
                    user
                };
            }
        );

        console.log(component_name, `${user.email} has entered a password for authentication`);        

        //this is also lifting state to the parent
        this.props.onFormSubmit(user);

        //return false;

    }

    render() {
        return (
            <React.Fragment>
                <form className="form form-inline ml-auto" onSubmit={this.onFormSubmit}>
                    <EmailInput onEmailInputChange={this.onEmailChange}
                                email={this.state.email} />
                    <PasswordInput onPasswordInputChange={this.onPasswordChange}
                                   password={this.state.password} />
                    <button type="submit" 
                            className="btn btn-primary mb-2">Login</button>
                </form>
            </React.Fragment>              
        );
    };
}

export default LoginForm;