const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
      name: {type: String},
      price: {type: Number}
    },
    { timestamps: true }
  );
  
  const products = mongoose.model("products", productSchema);
  module.exports = products;