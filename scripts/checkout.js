import { renderOrderSummary } from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

new Promise((resolve) => {
    console.log('starting promise');
    loadProducts(() =>{
        console.log('loading producs is finished');
        resolve();
    });
}).then(() =>{
    console.log('next step');
    renderOrderSummary();
    renderPaymentSummary();

});

//callbackks were creating issues princesss
//so you remove it hehehehehe