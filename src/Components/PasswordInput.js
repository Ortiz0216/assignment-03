import React from 'react';

const PasswordInput = (props) => {

    let password = '';

    const onPasswordChange = (event) => {
        password = event.target.value;

        props.onPasswordInputChange(password);

    }

    return(
        <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input className="form-control" 
               id="exampleInputPassword1" 
               onChange={onPasswordChange}
               placeholder="Password" 
               type="password"
               value={props.password}  />
        </div>
    );

};

export default PasswordInput;