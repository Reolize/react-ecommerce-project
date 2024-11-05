const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchemaData = new mongoose.Schema({
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

})

const Products = mongoose.model("Product", userSchemaData);
module.exports = Products;
