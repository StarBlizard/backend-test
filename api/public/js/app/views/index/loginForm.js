let LoginForm = function(options){
  this.$el = $(options.el);

  this.initialize = function(){
  }; 

  this.render = function(){
    $.ajax({
      url : '/login',
      method : 'POST',
      data : {
        email : this.$email.val(),
        password : this.$password.val()
      },
      success : function(){
        window.location.href += 'home';
      }
    });
  }
};
