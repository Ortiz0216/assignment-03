import React from 'react';

const EmailInput = (props) => {

    let email = '';    

    const onEmailChange = (event) => {
        
        email = event.target.value;

        //this is lifting the state value to the parent
        props.onEmailInputChange(email);        

    };

    return(
        <div className="form-group">
        {/* <label className="mr-sm-2" htmlFor="exampleInputEmail1">Email address</label> */}
        <input 
            aria-describedby="emailHelp" 
            className="form-control input-sm mb-2 mr-sm-2" 
            id="exampleInputEmail1" 
            onChange={onEmailChange}
            placeholder="Enter email"
            type="email"
            value={props.email}  />
        </div>
    );
};

export default EmailInput;
