const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true, 
    },
    quantity: {
        type : Number,
        required: true,
    },
    deliveryOptionId: {
        type : String,
        required: true,
    }

});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;