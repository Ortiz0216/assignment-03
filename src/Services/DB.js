import firebase from './Firebase';

const db = firebase.firestore();

const component_name = "Services/DB";


const GetAllOrders = (inquiry) => {
    
    //stuff
    let ordersRef = db.collection("orders");
    let orders;

    ordersRef.where("email", "==", `${inquiry.email}`).get()
            .then( (querySnapshot) => {
                if(!querySnapshot.empty){
                    inquiry.callback(querySnapshot);
                }
            })
            .catch((error) => {
                console.error(component_name, error);
            });

    return orders;

}

export { GetAllOrders };