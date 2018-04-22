
$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input').serialize();

      $.ajax({
        type: 'POST',
        url: '/todos',
        data: $('form input').serialize(),
        datatype: 'json',
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var data = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/' + data,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });


});
