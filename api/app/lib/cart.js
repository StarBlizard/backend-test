const path          = require('path');
const CartGifts     = require(path.join(process.env.PWD, '/db/models/cartgifts'));
const CartDiscounts = require(path.join(process.env.PWD, '/db/models/cartdiscounts'));
const getFrequenty  = require('./getFrequenty');

module.exports.applyGift = function(cart, product, cartProducts){
  let gift = product.gifts[0]; 

  // A product added here can have a discount or gift too! 
  for(let i = 0; i<gift.number; i++){ cartProducts.push(gift.gifting); }
  CartGifts
    .findOrCreate({ 
      where : { 
        cart : cart.id, 
        product : product.id,
        giftID : gift.id 
      }, 
      defaults : { number : 0 } 
    })
    .then( cartGift => {
      cartGift = cartGift[0];
      cartGift.update({ number : cartGift.get("number")+1 });
    });
};

module.exports.applyDiscount = function(cart, product, cartProducts){
  let discount         = product.discounts[0];
  let productFrequenty = getFrequenty(discount.buying, cartProducts);

  // If the user haven't the enough number of products to apply the discount, do nothing
  if (productFrequenty < discount.howMany) { return false; }

  CartDiscounts
    .findOrCreate({ where : {
      cart : cart.id,
      product : discount.discounted,
      discountID : discount.id
    }});

  // Total price of all products that will be discounted
  let productTotalPrice = productFrequenty*product.price;
  let discountedPrice   = (productTotalPrice/100)*discount.discounting; 

  cart.set("total", cart.get("total")-discountedPrice);
};
