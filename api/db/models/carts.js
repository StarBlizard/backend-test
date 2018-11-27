'use strict';

const Sequelize      = require('sequelize');
const path           = require('path');
const _              = require('underscore');
const { connection } = require(path.join(process.env.PWD, '/services/database'));
const Products       = require('./products');
const Gifts          = require('./gifts');
const Discounts      = require('./discounts');
const CartGifts      = require('./cartgifts');
const getFrequenty   = require(path.join(process.env.PWD, '/app/lib/getFrequenty'));

const Carts = connection.define('carts', {
  user: Sequelize.INTEGER,
  products: Sequelize.STRING,
  total: Sequelize.INTEGER
}, { timestamps : false });

Carts.hasMany(CartGifts, { as : "gifts"    , foreignKey : "cart" })

Carts.prototype.applyGifts = async function(product, cartProducts){
  product.gifts.forEach( async gift => {
    let giftSpecs = { 
      cart    : this.get("id"), 
      product : product.id,
      giftID  : gift.id 
    };

    let cartGift = _.find(this.get("gifts"), cartGift => { return _.isMatch(cartGift.toJSON(), giftSpecs); });

    if(!cartGift){
      cartGift = await CartGifts.findOrCreate({ 
        where    : giftSpecs, 
        defaults : { number : 0 } 
      });

      cartGift = cartGift[0];
    }

    let productFrequenty = getFrequenty(gift.buying, cartProducts);
    let missingGifts     = ((productFrequenty/(gift.number+1)) - cartGift.get("number"))/(1/(gift.number+1));

    if(missingGifts > 0){
      for(let i = 0; i<missingGifts; i++){ 
        cartProducts.push(gift.gifting); 
      }
    } else if (missingGifts < 0) {
       for(let i = missingGifts; i<0; i++){ 
         let pos = cartProducts.lastIndexOf(gift.gifting+"");
         cartProducts.splice(pos, 1);
      }
    }

    let giftedProducts = cartGift.get("number")+missingGifts;
    let reducedPrice   = giftedProducts*product.price;

    cartGift.update({ number : giftedProducts });
    
    this.set("products", cartProducts+"");
    this.set("total"   , this.get("total") - reducedPrice);
  });

  return this;
};

Carts.prototype.applyDiscount = async function(product, cartProducts){
  product.discounts.forEach( async discount => {
    let total             = this.get("total");
    let productFrequenty  = getFrequenty(discount.buying, cartProducts);
    let productTotalPrice = productFrequenty*product.price;

    // If the user haven't the enough number of products to apply the discount, do nothing
    if (productFrequenty < discount.howMany) { 
      return this.set("total", total+productTotalPrice); 
    }

    // Total price of all products that will be discounted
    productTotalPrice -= (productTotalPrice/100)*discount.discounting; 

    return this.set("total", this.get("total")+productTotalPrice);
  });
};

Carts.prototype.calculateTotal = function(product, cartProducts){
  let productFrequenty  = getFrequenty(product.id, cartProducts);
  let productTotalPrice = productFrequenty*product.price;

  this.set("total", productTotalPrice);
};

// This method should be be called from a Cart Model 
// that includes its cartGifts models
Carts.prototype.updateOffers = function(){
  // Add the product id as string 
  let cartProducts = this.get("products") ? this.get("products").split(",") : [];
  
  return Products.findAll({ 
    where : { id : cartProducts }, 
    include : [{ 
      model : Gifts, // Include possible gifts 
      as : 'gifts' 
    },{ 
      model : Discounts,
      as : 'discounts' // Include possible discounts
    }]
  }).then( products => {

    this.set("total", 0);

    products.forEach( product => {
      product = product.toJSON();

      this.calculateTotal(product, cartProducts);
      this.applyDiscount(product, cartProducts);
      this.applyGifts(product, cartProducts);
    }); 

    return this.save(); // Need to call products here to manage its asynchronicity
  });
};

module.exports = Carts;
