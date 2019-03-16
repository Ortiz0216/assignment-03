//npm imports
import React from 'react';
//my imports
import './OrderHistoryItem';
import firebase from './Firebase';


const OrderHistory = (props) => {
    

    return (
        <React.Fragment>
            <h1>Orders for: {props.email}</h1>
            <div className="row">
                <table className="table-hover">
                    <thead>
                        <th>
                            <th>Date</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Pizza Place</th>
                        </th>
                    </thead>

                </table>
            </div>            
        </React.Fragment>
    );
};

export default OrderHistory;