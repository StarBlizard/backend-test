let Navbar = function(options){
  this.$el = $(options.el);

  this.initialize = function(){
    this.$email    = this.$el.find('[js-login-email]');
    this.$password = this.$el.find('[js-login-password]');
    this.$button   = this.$el.find('[js-login-button]');

    this.$button.click(this.login.bind(this));
  }; 

  this.login = function(){
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
