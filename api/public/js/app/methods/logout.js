Template.methods.logout = function(){

  $("#js-logout").click(function(){
    $.ajax({
      type: 'GET',
      url : '/logout'
    });
  });
};

$(Template.methods.logout);
