const mongoose = require("mongoose");
const Schema = mongoose.Schema

const orderSchema = mongoose.Schema(
    {
      email: {type: String},
      itemList: [{
        productId : { type: Schema.Types.ObjectId, ref: 'products'},
        count: {type: Number}
      }]
    },
    { timestamps: true }
  );
  
  const order = mongoose.model("orders", orderSchema);
  module.exports = order;