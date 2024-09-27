import { cart, removeFromCart, updateCartQuantity, updateDeliveryDate, loadProductsFromCart} from "../../data/cart-backend.js";
import{ loadProducts, products} from "../../data/products.js"
import { formatCurrency } from "../utils/money.js";
import dayjs from ' https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

const today = dayjs();
const nday = today.add(7, 'day');
console.log(nday);
console.log(nday.format('dddd, MMMM D'));


export function renderOrderSummary() {
    loadProductsFromCart(cart =>  {
        if (!cart || cart.length === 0) return;

        let cartSummary = '';
        cart.forEach((cartItem) => {
            const productId = cartItem.productId;

            let matchingProduct;

            products.forEach((product) =>{
                if(product.id === productId){
                    matchingProduct = product;
                }
            });

            /*
            console.log('product hai?');
            console.log(matchingProduct);
            console.log('dikha?');
            */

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
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
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

            //console.log(cartSummary);
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

                loadProductsFromCart(renderOrderSummary);
            });

        });

        
        document.querySelectorAll('.js-update-link')
        .forEach((link) =>{

            link.addEventListener('click', () =>{
                const productId = link.dataset.productId;

                console.log(productId);
                updateCartQuantity(productId);

                loadProductsFromCart(renderOrderSummary);

                console.log('OK');
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

                loadProductsFromCart(() => {
                    renderOrderSummary();
                    renderPaymentSummary();
                });

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
    });
}
// maybe u forget future me i know you definely will : so i put the event listners in the function by 
// understanding that i am deleteing the previous html by putting em in a function 
// so if i am deleting the prev data and updating it with new html i need to
// add those event listners for this currently updated html tooo thats the logic;