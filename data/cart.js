export let cart = JSON.parse(localStorage.getItem('cart')) || [];

if(!cart){
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 0,
        deliveryOptionId : '1',
    },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 0,
        deliveryOptionId : '2',
    }];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
        matchingItem.quantity += 1;

        //update the quantinty using endpoint here
        updateCartQuantityBackend(productId, matchingItem.quantity);
        loadProductsFromCart();
    }
    else{
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId : '1',
        });

        addToCartBackend(productId, 1, '1');
        loadProductsFromCart();
    }

    saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    //bas yahi
    deleteFromCartBackend(productId);
    loadProductsFromCart();

    cart = newCart;
    saveToStorage();
}

export function updateCartQuantity(productId){
    console.log('Bunny');
    cart.forEach((cartItem) => {

        if(cartItem.productId === productId){
            console.log(cartItem.quantity);
            cartItem.quantity += 1;
            console.log(cartItem.quantity);

            updateCartQuantityBackend(productId, cartItem.quantity);
            loadProductsFromCart();
        }
    });

    saveToStorage();
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

//now trying it from the backend 

let cart2 = [];

function loadProductsFromCart(){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
        cart2 = JSON.parse(xhr.response);

        console.log(cart2);
    });
  
    xhr.open('GET', 'http://localhost:3003/cartlist');
    xhr.send();
}

loadProductsFromCart();

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