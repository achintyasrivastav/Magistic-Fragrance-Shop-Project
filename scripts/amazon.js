import { products} from '../data/products.js';
import {cart, addToCart} from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

//loadProducts(renderProductsGrid); 

function renderProductsGrid(){

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
}

renderProductsGrid();