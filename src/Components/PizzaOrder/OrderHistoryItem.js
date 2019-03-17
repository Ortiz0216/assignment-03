//npm imports
import React from 'react';

const component_name = "ORDER_HISTORY_ITEM";

const OrderHistoryItem = (props) => {


    console.log(component_name,
                props);

    const {id, date, item, price, vendor} = props.order;

    let datestring = new Date(date.seconds * 1000).toDateString();

    return(
        <tr>
            <td>{id}</td>
            <td>{datestring}</td>
            <td>{item}</td>
            <td>${price}</td>
            <td>{vendor}</td>
        </tr>
    );
};

export default OrderHistoryItem;