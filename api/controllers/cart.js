'use strict';

const passport = require('passport');
const Users    = require('../models/users');
const Carts    = require('../models/carts');
const Products = require('../models/products');
const Offers   = require('../models/offers');
const Discounts= require('../models/discounts');
const _        = require('underscore');

let cartsController = {};

function getFrequenty(num, arr){
  return arr.reduce((total, element) => { return element == num ? total+1 : total }, 0);
};

function parseCart(cart, productTypes){
  // cart -> Model Cart, productTypes -> all product types on the cart

  // Get all available Discounts
  let discounts   = productTypes.map(product => product.toJSON().discounts[0]);
  
  // Get all offers applied to the cart
  let offers   = productTypes.map(product => product.toJSON().offers[0]);

  // Get all products on the cart
  let products = cart.products.split(",");
  
  // Calculate the total cost including the offer
  cart.total = productTypes.reduce((total, element) => { 
    let product      = element.toJSON();

    // Get the offer that can be applied to this product (will be false if no one can)
    let productDisc = _.find(discounts, function(discount){ 
      return discount ? discount.discounted == product.id : false; 
    });

    // Get the offer that can be applied to this product (will be false if no one can)
    let productOffer = _.find(offers, function(offer){ return offer ? offer.offerting == product.id : false; });

    // Determine if the cart acomplish the offer condition
    let condition    = productDisc ? getFrequenty(productDisc.buying, products) >= productDisc.howMany : false;

    // Get the number of instances of the product type on the user's cart
    let elementFrequenty = getFrequenty(product.id, products);

    // Add a text description to send to the user about his cart
    cart.description += `${product.type} x${elementFrequenty}\n`;

    // Determine the total cost
    let elementTotalCost = elementFrequenty*product.price; 

    if (productOffer){
      let saving = product.price*elementFrequenty/(1+productOffer.gifting);
      cart.saving += saving;
      elementTotalCost -= saving; 
    }

    if (condition){ 
      // if the condition is true, apply the offer
      let saving = (elementTotalCost/100)*productDisc.discounting;
      cart.saving += saving;
      elementTotalCost -= saving; 
    }

    return total += elementTotalCost;
  }, 0);

  return cart;
};

cartsController.add = function(req, res){
  let { productId } = req.body;
  let { id }        = req.user;

  // Verify that the product exist
  Products
    .findOne({ where : { id : productId }, include : { model : Offers, as : 'offers' } })
    .then( product => {
      // If not, do nothing 
      if (!product){ return res.status(401).send(false); }

      Carts
        .findOrCreate({ where : { user : id }, defaults : { products : "" } })
        .then( newCart => {
          newCart = newCart[0];
          // Add the product id as string 
          let cartProducts = newCart.get("products") ? newCart.get("products").split(",") : [];
          cartProducts.push(productId);
          
          product = product.toJSON();
          if(product.offers[0]){
            for(let i = 0; i< product.offers[0].gifting; i++){
              cartProducts.push(productId);
            }
          }

          // Save the cart products
          newCart
            .update({products : cartProducts+""})
            .then( () => {
              console.log("ADDDDDDD", cartProducts);
              return res.status(200).send(true);
            });
        });
      });
};

cartsController.removeProduct = function(req, res){
  let { productId } = req.body;
  let { id }  = req.user;

  // Find the user's Cart
  Carts
    .findOrCreate({ where : { id }, defaults : { products : "" } })
    .then( newCart => {
        newCart = newCart[0];

        // Get the last product ID position
        let pos = str.lastIndexOf(productId+"");

        // Convert the string to array
        let cartProducts = newCart.get("products").split(",");

        // Remove the last instance on the array
        cartProducts.splice(pos, 1);

        newCart
          // Save the array as string
          .set("products", cartProducts + "")
          .update()
          .then( () => {
            return res.status(200).send(true);
          });
      });
};

cartsController.clean = function(req, res){
  let { id }  = req.user;

  Carts
    .findOrCreate({ where : { user : id }})
    .then( newCart => {
      newCart = newCart[0];
      newCart
        .update({ products : "" })
        .then( () => {
          return res.status(200).send(true);
        });
    });
};

cartsController.get = function(req, res){
  // Get user ID
  let { id }  = req.user;

  // Use the user ID to get its cart
  Carts
    .findOrCreate({ where : { user : id }, defaults : { products : "" } })
    .then( newCart => {
      newCart = newCart[0];

      let cart = newCart.toJSON();

      // If the cart is empty, do nothing
      if (!cart.products) { return res.status(200).send("Empty"); }

      // Get all products without duplicated elements
      let productTypes = cart.products.split(",").filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
      });

      // get all product types that the user haves on its cart with its possible discounts
      Products
        .findAll({ where : { id : productTypes }, include : [{ 
            model : Offers,
            as : 'offers' 
          },{ 
            model : Discounts, 
            as : 'discounts' 
          }] 
        })
        .then( products => {
          cart.description = "";

          // To show the user how much is he saving
          cart.saving = 0;

          // Process data
          res.status(200).send(parseCart(cart, products));
        });
    });
};

module.exports = cartsController;
