"use strict";

let App = {

  $el : $('[js-main]'),

  initialize : function(){
    this.render();
  },

  render : function(){
    this.navbar   = new Navbar({ el : '[js-login-form]' });
    this.products = new Products({ el : '[js-register-form]' });

    this.navbar.initialize();
    this.products.initialize();
  }  
};

$(App.initialize.bind(App));
