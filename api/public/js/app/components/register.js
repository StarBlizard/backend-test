Template.components.register = function(){
  let register = {};

  register.$email     = $("#js-register-email");
  register.$phone     = $("#js-register-phone");
  register.$username  = $("#js-register-username");
  register.$password  = $("#js-register-password");
  register.$password2 = $("#js-register-password2");

  register.$button    = $("#js-register-button");

  return register;
};
