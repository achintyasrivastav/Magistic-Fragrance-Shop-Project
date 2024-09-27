export let cart = [];

//now trying it from the backend 
export function loadProductsFromCart(displayCart) {
    fetch('https://magistic-fragrance-shop-project.onrender.com/cartlist')
        .then(response => response.json())
        .then(cart => {
            console.log(cart);
            displayCart();
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
        });
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
function updateCartQuantityBackend(productId, oldQuantity) {
    const newQuantity = oldQuantity + 1;
    const dataToUpdate = { quantity: newQuantity };

    fetch(`https://magistic-fragrance-shop-project.onrender.com/cartlist/${productId}/quantity`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
    })
    .then(response => response.json())
    .then(updatedCart => {
        console.log(updatedCart);
    })
    .catch(error => {
        console.error('Error updating cart quantity:', error);
    });
}


function updateDeliveryDateBackend(productId, deliveryOptionId) {
    const dataToUpdate = { deliveryOptionId: deliveryOptionId };

    fetch(`https://magistic-fragrance-shop-project.onrender.com/cartlist/${productId}/delivery`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
    })
    .then(response => response.json())
    .then(updatedCart => {
        console.log(updatedCart);
    })
    .catch(error => {
        console.error('Error updating delivery date:', error);
    });
}


function deleteFromCartBackend(productId) {
    fetch(`https://magistic-fragrance-shop-project.onrender.com/cartlist/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(updatedCart => {
        console.log(updatedCart);
    })
    .catch(error => {
        console.error('Error deleting from cart:', error);
    });
}


function addToCartBackend(productId, quantity, deliveryOptionId) {
    const dataToSend = {
        productId: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOptionId,
    };

    fetch('https://magistic-fragrance-shop-project.onrender.com/cartlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(updatedCart => {
        console.log(updatedCart);
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
    });
}
