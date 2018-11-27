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
    }]
  });

  cart = cart[0];

  // Add the product id as string 
  let cartProducts = cart.get("products") ? cart.get("products").split(",") : [];

  cartProducts.push(productId);

  cart.set("products", cartProducts+"");

  // Save the cart products
  await cart
    .updateOffers()
    .then( () => {
      console.log("ADDDDDDD", cart.get("products"));
      return res.status(200).send(cart);
    });
};

module.exports.removeProduct = async (req, res) => {
  let { productId } = req.body;
  let { id }        = req.user;

  // Find the user's Cart
  let cart = await Carts.findOrCreate({ 
    where : { user : id }, 
    defaults : { products : "" },
    include : [{
      model : CartGifts, // Include the current gifts that are already applied to the cart
      as    : 'gifts' 
    }] 
  });

  cart = cart[0];

  // Convert the string to array
  let cartProducts = cart.get("products").split(",");

  // Get the last product ID position
  let pos = cartProducts.lastIndexOf(productId+"");
  console.log(cartProducts, pos);

  // Remove the last instance on the array
  cartProducts.splice(pos, 1);

  cart
    // Save the array as string
    .set("products", cartProducts + "")
    .updateOffers()
    .then( () => {
      return res.status(200).send(true);
    });
};

module.exports.clean = async (req, res) => {
  let { id } = req.user;

  let cart = await Carts.findOrCreate({ 
    where : { user : id },
    defaults : { products : "" }, 
    include : [{
      model : CartGifts, // Include the current gifts that are already applied to the cart
      as    : 'gifts' 
    }]
  });

  cart = cart[0];
  CartGifts.destroy({ where : { cart : cart.id } });

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
  let cart = await Carts.findOrCreate({
    where : { user : id },
    defaults : { products : "" }, 
    include : [{
      model : CartGifts, // Include the current gifts that are already applied to the cart
      as    : 'gifts' 
    }] 
  });

  cart = cart[0];

  // If the cart is empty, do nothing
  if (!cart.products) { return res.status(200).send("Empty"); }

  await cart.updateOffers(cart);

  res.status(200).send(cart.toJSON());
};
