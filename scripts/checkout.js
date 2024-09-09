import { cart, removeFromCart, updateDeliveryDate} from "../data/cart.js";
import{ products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from ' https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";

hello();
const today = dayjs();
const nday = today.add(7, 'day');
console.log(nday);
console.log(nday.format('dddd, MMMM D'));

function renderOrderSummary() {

    let cartSummary = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        let matchingProduct;

        products.forEach((product) =>{
            if(product.id === productId){
                matchingProduct = product;
            }
        });

        let deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryData = '';
        deliveryOptions.forEach((option) => {
            if(option.id===deliveryOptionId){
                deliveryData = option;
            }
        });

        const todaysDate = dayjs();
        //add delivery days accordingly
        const stringtodayDate = todaysDate.add(deliveryData.deliveryDays, 'days');
        const displayDate = stringtodayDate.format('dddd, MMMM D');
        
        cartSummary += 
        `<div class="cart-item-container 
            js-cart-item-container-${matchingProduct.id}">

            <div class="delivery-date  js-delivery-date-${matchingProduct.id}">
            Delivery Date : ${displayDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name};
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class = "delete-quantity-link link-primary 
                    js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>

                ${deliveryOptionsHTML(matchingProduct, cartItem)}
                
                </div>
            </div>
        </div>`;
    });


    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryProduct) =>{

            const todaysDate = dayjs();
            //add delivery days accordingly
            const stringtodayDate = todaysDate.add(deliveryProduct.deliveryDays, 'days');
            const displayDate = stringtodayDate.format('dddd, MMMM D');

            const displayPrice = deliveryProduct.priceCents === 0 
                ? 'FREE' 
                : `${formatCurrency(deliveryProduct.priceCents)}`;

            const canCheck = deliveryProduct.id === cartItem.deliveryOptionId;


            html += `<div class="delivery-option js-delivery-option"
                data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryProduct.id}">
                <input type="radio"
                ${canCheck ? 'checked' : ''}
                class=i"delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date data-delivery-date = ${matchingProduct.id}">
                    ${displayDate}
                </div>
                <div class="delivery-option-price data-delivery-option = ${matchingProduct.id}">
                    $${displayPrice} - Shipping
                </div>
                </div>
            </div>`

        });

        return html;
    }

    //document.querySelector('.delivery-option-input').value;

    document.querySelector('.js-order-summary')
    .innerHTML = cartSummary;


    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });

    });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element) =>{

        element.addEventListener('click', () =>{

            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;

            console.log(productId);
            console.log(deliveryOptionId);

            updateDeliveryDate(productId, deliveryOptionId);
            renderOrderSummary();

            /*
            let days = 0;
            deliveryOptions.forEach((option)=>{
                if(option.id===deliveryOptionId){
                    days = option.deliveryDays;
                }
            });
            
            const todaysDate = dayjs();
            //add delivery days accordingly
            const stringtodayDate = todaysDate.add(days, 'days');
            const displayDate = stringtodayDate.format('dddd, MMMM D');

            document.querySelector(`.js-delivery-date-${productId}`)
            .innerHTML = `Delivery Date: ${displayDate}`;
            */
        });
    });
}

renderOrderSummary();
// maybe u forget : so i put the event listners in the function by 
// understanding that i am deleteing the previous html by putting em in a function 
// so if i am deleting the prev data and updating it with new html i need to
// add those event listners for this currently updated html tooo thats the logic;