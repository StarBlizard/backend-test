"use strict";

let App = {

  $el : $('[js-main]'),

  initialize : function(){
    this.render();
  },

  render : function(){
    this.loginForm    = new LoginForm({ el : '[js-login-form]' });
    this.registerForm = new RegisterForm({ el : '[js-register-form]' });

    this.loginForm.initialize();
    this.registerForm.initialize();
  }  
};

$(App.initialize.bind(App));
