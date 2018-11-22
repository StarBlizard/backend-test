Template.methods.login = function(){
  let components = Template.components.login();

  components.$button.click(function(){
    let email    = components.$email.val();
    let password = components.$password.val();

    if(!email || !password){
      console.log("Missing data");
      return false;
    }

    $.ajax({
      url    : '/login',
      method : 'POST',
      data   : {
        email,
        password
      },
      success : function(data, xhr, status){
        console.log(data, status);
      },
      statusCode : {
        200 : function(){
          window.location = "/home";
        },
        401 : function(error){
          console.log(error);
        }
      }
    });
  });

};

$(Template.methods.login);
