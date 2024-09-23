export let cart = [];

//now trying it from the backend 
export function loadProductsFromCart(displayCart){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        cart = JSON.parse(xhr.response);

        console.log(cart);
        displayCart();
    });
  
    xhr.open('GET', 'http://localhost:3003/cartlist');
    xhr.send();
}

loadProductsFromCart();


export function addToCart(productId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
            //since object is an truthy value
            //item sets the matching item as true
            console.log(productId);
        }
    });

    if(matchingItem){

        //update the quantinty using endpoint here
        updateCartQuantity(productId, matchingItem.quantity);
    }
    else{

        addToCartBackend(productId, 1, '1');
    }

}

export function removeFromCart(productId){

    //bas yahi
    deleteFromCartBackend(productId);
}

export function updateCartQuantity(productId){
  
    cart.forEach((cartItem) => {

        if(cartItem.productId === productId){

            updateCartQuantityBackend(productId, cartItem.quantity);
        }
    });
}

export function updateDeliveryDate(productId, deliveryOptionId){

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            updateDeliveryDateBackend(productId, deliveryOptionId);
        }
    });
}

//
function updateCartQuantityBackend(productId, oldQuantity){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(cart);
    });

    xhr.open('PUT', `http://localhost:3003/cartlist/${productId}/quantity`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const newQuantity = oldQuantity + 1;
    const dataToUpdate = { quantity: newQuantity };
    xhr.send(JSON.stringify(dataToUpdate));
}

function updateDeliveryDateBackend(productId, deliveryOptionId){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(cart);
    });

    xhr.open('PUT', `http://localhost:3003/cartlist/${productId}/delivery`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const dataToUpdate = { deliveryOptionId: deliveryOptionId };
    xhr.send(JSON.stringify(dataToUpdate));
}

function deleteFromCartBackend(productId){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(cart);
    });

    xhr.open('DELETE', `http://localhost:3003/cartlist/${productId}`);
    xhr.send();
}

function addToCartBackend(productId, quantity, deliveryOptionId){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(cart);
    });

    xhr.open('POST', 'http://localhost:3003/cartlist');
    xhr.setRequestHeader('Content-Type', 'application/json');

    const dataToSend = {
        productId: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOptionId,
    };

    xhr.send(JSON.stringify(dataToSend));
}