import React from 'react';

const JumbotronComponent = (props) => {

    return (
        <div className="jumbotron jumbotron-fluid text-center">
            <h1 className="display-4">{props.app_name}!</h1>
            <p className="lead">Select the Pizza you want and we'll have a local Pizza Shop deliver the lowest price possible to you now. All sizes are Large.</p>
            <p>{props.order_date.toDateString()}</p>
        </div>
    );    
}

export default JumbotronComponent;