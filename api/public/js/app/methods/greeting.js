Template.methods.greeting = function(){
  let $message = Template.components.greeting();

    $.ajax({
      type : 'POST',
      url  : '/greeting',

      success(res){
        let $greeting = $("<h1>").text(`Hello ${res.data.user.username}`);
        let $info = $("<h2>").text(`Your site id is ${res.data.site}`);

        console.log(res.data);

        $message.append($greeting, $info);
      }
    });

};

$(Template.methods.greeting);
