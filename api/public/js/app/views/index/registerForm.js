let RegisterForm = function(options){
  this.$el = $(options.el);

  this.initialize = function(){
    this.$email       = this.$el.find('[js-register-email]');
    this.$password    = this.$el.find('[js-register-password]');
    this.$repPassword = this.$el.find('[js-register-rep-password]');
    this.$button      = this.$el.find('[js-register-button]');

    this.$button.click(this.login.bind(this));
  }; 

  this.login = function(){
    let email    = this.$email.val();
    let password = this.$password.val();
    let repPassword = this.$repPassword.val()

    if(password !== repPassword){ 
      alert("Las contraseñas no coinciden");
    }

    $.ajax({
      url : '/register',
      method : 'POST',
      data : { email, password },
      success : function(){
        window.location.href += 'home';
      }
    });
  }
};
