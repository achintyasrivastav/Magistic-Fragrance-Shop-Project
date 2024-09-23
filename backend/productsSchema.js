const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true, 
  },

  name: {
    type: String,
    required: true,
  },

  rating: {
    stars: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0,
    }
  },

  priceCents: {
    type: Number,
    default: 0,  
    required: true,
  },

  keywords: {
    type: [String],  
    enum: ["women", "men"],  
    required: true, 
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;