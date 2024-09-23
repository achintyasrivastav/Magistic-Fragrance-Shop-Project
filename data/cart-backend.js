export let cart = [];

//now trying it from the backend 
function loadProductsFromCart(){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        cart = JSON.parse(xhr.response);

        console.log(cart);
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
        }
    });

    if(matchingItem){

        //update the quantinty using endpoint here
        updateCartQuantityBackend(productId, matchingItem.quantity);
        loadProductsFromCart();
    }
    else{

        addToCartBackend(productId, 1, '1');
        loadProductsFromCart();
    }

    saveToStorage();
}

export function removeFromCart(productId){

    //bas yahi
    deleteFromCartBackend(productId);
    loadProductsFromCart();
}

export function updateCartQuantity(productId){
  
    cart.forEach((cartItem) => {

        if(cartItem.productId === productId){

            updateCartQuantityBackend(productId, cartItem.quantity);
            loadProductsFromCart();
        }
    });
}

export function updateDeliveryDate(productId, deliveryOptionId){
    let matchingItem;

    console.log(productId);
    console.log(deliveryOptionId);

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();
}

//
function updateCartQuantityBackend(productId, oldQuantity){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(cart2);
    });

    xhr.open('PUT', `http://localhost:3003/cartlist/${productId}/quantity`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const newQuantity = oldQuantity + 1;
    const dataToUpdate = { quantity: newQuantity };
    xhr.send(JSON.stringify(dataToUpdate));
}

function deleteFromCartBackend(productId){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(cart2);
    });

    xhr.open('DELETE', `http://localhost:3003/cartlist/${productId}`);
    xhr.send();
}

function addToCartBackend(productId, quantity, deliveryOptionId){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        console.log(cart2);
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