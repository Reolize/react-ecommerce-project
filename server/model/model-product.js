const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  img: {
    type: String,

  },
  title: {
    type: String, 

  },

  prevprice: {
    type: String,

  },
  newprice: {
    type: String,

  },
  company: {
    type: String,

  },
  color: {
    type: String,

  },
  category: {
    type: String,

  },
  quantity: {
    type: Number,

  },

});

module.exports = mongoose.model('Products', productSchema);