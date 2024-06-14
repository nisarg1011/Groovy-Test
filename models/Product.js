const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productname: 
    { 
      type: String, 
      required: true,
      unique: true 
    },

    price: 
    {
       type: String, 
       required: true, 
      },

    desc:
     { 
      type: String, 
      required: true,
     },

    categories: 
    { 
      type: Array 
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
