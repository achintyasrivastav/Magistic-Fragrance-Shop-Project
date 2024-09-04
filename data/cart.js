export const cart = [];

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
        });
    }
}
