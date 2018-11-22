Template.methods.register = function(){
  let components = Template.components.register();

  components.$button.click(function(){
    let email     = components.$email.val();
    let phone     = components.$phone.val();
    let username  = components.$username.val();
    let password  = components.$password.val();
    let password2 = components.$password2.val();

    if(password !== password2){
      console.log("The passwords don't match");
      return false;
    };

    $.ajax({
      url    : '/register',
      method : 'POST',
      data   : {
        email,
        phone,
        username,
        password
      },
      success(data){
        console.log(data);
      }
    })
  });
};

$(Template.methods.register);
