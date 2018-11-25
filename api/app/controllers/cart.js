'use strict';

const path          = require('path');
const passport      = require('passport');
const _             = require('underscore');
const Users         = require(path.join(process.env.PWD, '/db/models/users'));
const Carts         = require(path.join(process.env.PWD, '/db/models/carts'));
const Products      = require(path.join(process.env.PWD, '/db/models/products'));
const Gifts         = require(path.join(process.env.PWD, '/db/models/gifts'));
const Discounts     = require(path.join(process.env.PWD, '/db/models/discounts'));
const CartGifts     = require(path.join(process.env.PWD, '/db/models/cartgifts'));
const CartDiscounts = require(path.join(process.env.PWD, '/db/models/cartdiscounts'));

const cartLib      = require(path.join(process.env.PWD, '/app/lib/cart'));
const getFrequenty = require(path.join(process.env.PWD, '/app/lib/getFrequenty'));

module.exports.add = async (req, res) => {
  let { productId } = req.body;
  let { id }        = req.user;

  // Verify that the product exist
  let product = await Products.findOne({ 
    where : { id : productId }, 
    include : [{ 
      model : Gifts, // Include possible gifts 
      as : 'gifts' 
    },{ 
      model : Discounts,
      as : 'discounts' // Include possible discounts
    }]
  });
    
  // If the product doesnt exists, do nothing 
  if (!product){ return res.status(401).send(false); }

  let cart = await Carts.findOrCreate({ 
    where : { user : id }, 
    defaults : { products : "", total : 0 }, 
    include : [{
      model : CartGifts, // Include the current gifts that are already applied to the cart
      as    : 'gifts' 
    },{
      model : CartDiscounts, // Include the current discounts that are [...]
      as    : 'discounts'
    }]
  });

  cart = cart[0];
  let JSONcart = cart.toJSON(); 

  // Add the product id as string 
  let cartProducts = cart.get("products") ? cart.get("products").split(",") : [];

  // Verify if the discount to this product has been aplied
  let discounted   = _.find(cart.discounts, discount => { return discount.discounting == product.id });

  cart.set("total", cart.get("total")+product.price)
  cartProducts.push(productId);

  product = product.toJSON();
         
  // If a gift can be applied
  if(product.gifts[0]){
  // As cartProducts is a non-primitive value, it will be modified here 
    await cartLib.applyGift(cart, product, cartProducts);
  } 

  cart.set("products", cartProducts+"");

  // If an discount can be applied
  if(product.discounts[0] && !discounted){
    // This will modify the cart "total" attribute
    cartLib.applyDiscount(cart, product, cartProducts);
  } 

   // Save the cart products
   cart
     .save()
     .then( () => {
       console.log("ADDDDDDD", cartProducts);
       return res.status(200).send(cart);
     });
};

module.exports.removeProduct = async (req, res) => {
  let { productId } = req.body;
  let { id }        = req.user;

  // Find the user's Cart
  let cart = await Carts.findOrCreate({ where : { id }, defaults : { products : "" } });
  cart = cart[0];

  // Get the last product ID position
  let pos = str.lastIndexOf(productId+"");

  // Convert the string to array
  let cartProducts = cart.get("products").split(",");

  // Remove the last instance on the array
  cartProducts.splice(pos, 1);

  cart
    // Save the array as string
    .set("products", cartProducts + "")
    .update()
    .then( () => {
      return res.status(200).send(true);
    });
};

module.exports.clean = async (req, res) => {
  let { id } = req.user;

  let cart = await Carts.findOrCreate({ 
    where : { user : id },
    include : [{
      model : CartGifts, // Include the current gifts that are already applied to the cart
      as    : 'gifts' 
    },{
      model : CartDiscounts, // Include the current discounts that are [...]
      as    : 'discounts'
    }]
  });

  cart = cart[0];
  CartGifts.destroy({ where : { cart : cart.id } });
  CartDiscounts.destroy({ where : { cart : cart.id } });

  cart
    .destroy()
    .then( () => {
      return res.status(200).send(true);
    });
};

module.exports.get = async (req, res) => {
  // Get user ID
  let { id } = req.user;

  // Use the user ID to get its cart
  let cart = await Carts.findOrCreate({ where : { user : id }, defaults : { products : "" } });
  cart = cart[0];

  // If the cart is empty, do nothing
  if (!cart.products) { return res.status(200).send("Empty"); }

  res.status(200).send(cart.toJSON());
};
