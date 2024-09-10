class Cart{

    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

        if(!this.cartItems){
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 0,
                deliveryOptionId : '1',
            },{
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 0,
                deliveryOptionId : '2',
            }];
        }
    }

    saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
    }

    addToCart(productId){
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
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
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId : '1',
            });
        }
    
        saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];
    
        this.cartItems.forEach((cartItem) =>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
        saveToStorage();
    }

    updateDeliveryDate(productId, deliveryOptionId){
        let matchingItem;
    
        console.log(productId);
        console.log(deliveryOptionId);
    
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        saveToStorage();
    }

};