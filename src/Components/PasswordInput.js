import React from 'react';

const PasswordInput = (props) => {

    let password = '';

    const onPasswordChange = (event) => {
        password = event.target.value;

        props.onPasswordInputChange(password);

    }

    return(
        <div className="form-group">
        {/* <label className="mr-sm-2" htmlFor="exampleInputPassword1">Password</label> */}
        <input className="form-control input-sm mb-2 mr-sm-2" 
               id="exampleInputPassword1" 
               onChange={onPasswordChange}
               placeholder="Password" 
               type="password"
               value={props.password}  />
        </div>
    );

};

export default PasswordInput;