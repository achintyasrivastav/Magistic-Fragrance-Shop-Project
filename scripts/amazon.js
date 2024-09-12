import { products } from '../data/products.js';
import {cart, addToCart} from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

let productHTML = '';

products.forEach((product) => {
    productHTML +=  `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-spacer"></div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
                Add to Cart
            </button>
        </div>`;

    console.log(productHTML);
});

document.querySelector('.js-products-grid')
 .innerHTML = productHTML;

function updateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.cart-quantity')
        .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
 .forEach((button) => {
    button.addEventListener('click', () =>{
        
        const productId = button.dataset.productId;
        
        addToCart(productId);
        updateCartQuantity();
         
    });
   
});

window.onload = function () {
    // Typewriter effect for the heading
    gsap.to(".gsap-heading", {
      duration: 2.5, // The time it takes for the whole text to appear
      width: "100%", // Reveal the full width of the heading
      ease: "steps(20)", // Typewriter steps animation
      onComplete: () => {
        // Blink the cursor effect
        gsap.to(".gsap-heading", { borderRightColor: "transparent", repeat: -1, yoyo: true, duration: 0.6 });
      }
    });

    // Scale up the subtext after the heading animation
    gsap.to(".gsap-subtext", {
      duration: 1.5,
      scale: 1, // Scale up to its original size
      delay: 3, // Delayed to start after the heading
      ease: "elastic.out(1, 0.3)" // Elastic bounce effect
    });
  }