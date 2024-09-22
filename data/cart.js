export let cart = JSON.parse(localStorage.getItem('cart'));

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
    }
    else{
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId : '1',
        });
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