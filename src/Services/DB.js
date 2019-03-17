import firebase from './Firebase';

const db = firebase.firestore();

const component_name = "Services/DB";

const AddOrder = (orderInquiry) => {
    
    const {email, pizza, price, date, place} = orderInquiry.order;

    console.log(component_name, `${email} # ${pizza} # ${date} # ${place} # ${price} #`)

    // Add a new document with a generated id.
    db.collection("orders").add({
        date: date,
        email: email,
        item: pizza,
        price: price,
        vendor: place,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        orderInquiry.callback();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

};

const GetAllOrders = (inquiry) => {
    
    //stuff
    let ordersRef = db.collection("orders");

    ordersRef.where("email", "==", `${inquiry.email}`).get()
            .then( (querySnapshot) => {
                if(!querySnapshot.empty){
                    inquiry.callback(querySnapshot);
                }
            })
            .catch((error) => {
                console.error(component_name, error);
            });

};

export { AddOrder, GetAllOrders };