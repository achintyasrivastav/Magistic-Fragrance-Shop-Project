import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";


export function renderPaymentSummary(){
    let totalProductPrice = 0;
    let totalShippingPrice = 0;
    let totalItems = cart.length;

    cart.forEach((cartItem) => {

        //get the id 
        //then get the price from product
        let currPrice = 0;

        products.forEach((product) =>{
            if(product.id === cartItem.productId){
                currPrice = product.priceCents;
            }
        })
        totalProductPrice += (currPrice)*(cartItem.quantity);

        deliveryOptions.forEach((item) =>{
            if(item.id === cartItem.deliveryOptionId){
                totalShippingPrice += item.priceCents;
            }
        });

    });
    let taxCents = totalProductPrice*0.1;

    //generate html 

    let html = '';

    html = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalProductPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalProductPrice + totalShippingPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalProductPrice + totalShippingPrice + taxCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    document.querySelector('.js-payment-summary').innerHTML = html;

    let nhtml = `
     Checkout (<a class="return-to-home-link"
            href="amazon.html">${totalItems} items</a>)
    `

    document.querySelector('.checkout-header-middle-section')
     .innerHTML = nhtml;
}

