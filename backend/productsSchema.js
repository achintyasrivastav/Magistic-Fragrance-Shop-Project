const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,  // Fixing the typo
  },

  name: {
    type: String,
    required: true,  // Fixing the typo
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
    default: 0,  // Fixing the typo
    required: true,
  },

  keywords: {
    type: [String],  // Defining it as an array of strings
    enum: ["women", "men"],  // Correcting enum usage
    required: true, 
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
