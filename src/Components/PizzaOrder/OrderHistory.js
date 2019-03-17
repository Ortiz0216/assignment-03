//npm imports
import React, {Component} from 'react';
//my imports
import './OrderHistoryItem';
import { GetAllOrders } from '../../Services/DB';
import OrderHistoryItem from './OrderHistoryItem';

const component_name = "ORDER_HISTORY COMPONENT";

class OrderHistory extends Component{

    constructor(props){
        super(props);

        this.state = {
            orders: [],
        }

        // console.log(component_name,
        //             `The email we got from daddy is: ${this.props.email}`);
    
    }

    componentDidMount(){

        //read email from props and store
        let ordersInquiry = {
            email: this.props.email,
            //by passing this method into the firebase method, we will use it to
            //receive data from the firebase cloud firestore
            callback: (docs) => {

                let results = []

                docs.forEach( (doc) => {

                    const {date, email, price, item, vendor } = doc.data();

                    let orderItem = {
                        id: doc.id,
                        date: date,
                        email: email,
                        item: item,
                        price: price,
                        vendor: vendor,
                    }

                    results.push(orderItem);
                    //console.log(component_name, doc.id, " => ", doc.data());
                });

                results.forEach( (item) => {
                    console.log(component_name, item.id, " => ", item.email);                    
                });

                this.setState(
                    {
                        orders: results,
                    }
                );                
            }
        }
    
        //call the DB method
        GetAllOrders(ordersInquiry);
    }

    render(){

        return (
            <React.Fragment>
                <h3>Orders for: {this.props.email}</h3>
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Pizza Place</th>
                            </tr>
                            {this.state.orders.map( (order) => 
                                <OrderHistoryItem   key={order.id} 
                                                    order={order} />
                            )}                        
                        </thead>
                    </table>
                </div>            
            </React.Fragment>
        );
    }

}
// const OrderHistory = (props) => {

// };

export default OrderHistory;