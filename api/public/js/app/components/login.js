Template.components.login = function(){
  let login = {};

  login.$email    = $("#js-login-email");
  login.$password = $("#js-login-password");

  login.$button   = $("#js-login-button");

  return login;
};
