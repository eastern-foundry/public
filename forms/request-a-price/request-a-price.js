$('#price-form-submit').click(function () {

  $('.spinner-processing').show();
  $('.spinner-processing').attr('disabled', 'disabled');

  var error = false;
  var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $('#price-email').val();
  if (email == "" || email == " ") {
    $('#price-email').css('background-color', '#f2dede');
    error = true;
  } else if (!checkEmail.test(email)) {
    $('#price-email').css('background-color', '#f2dede');
    error = true;
  } else {
    $('#price-email').css('background-color', '#ffffff');
  }
  
  var name = $('#price-name').val();
  if (name == "" || name == " ") {
    $('#price-name').css('background-color', '#f2dede');    
    error = true;
  } else {
    $('#price-name').css('background-color', '#ffffff');
  }
  
  var name = $('#price-number').val();
  if (name == "" || name == " ") {
    $('#price-number').css('background-color', '#f2dede'); 
    error = true;
  } else {
    $('#price-number').css('background-color', '#ffffff');
  }
  
  if (error == false) {
    var data_string = $('#price-form').serialize();
    $.ajax({
      type: "POST",
      url: "../forms/request-a-price/request-a-price.php",
      data: data_string,
      timeout: 6000,
      error: function (request, error) {
        if (error == "timeout") {
          $('#price-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#price-error').slideUp('slow');
          }, 10000);
        } else {
          $('#price-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#get-notified-error').slideUp('slow');
          }, 10000);
        }
      },
      success: function () {
        $('#price-success').slideDown('slow');
        $('.spinner-processing').hide();
        $('.spinner-processing').removeAttr('disabled');
        $('spinner-processing').removeClass(':active');
        setTimeout(function () {
          $('#price-success').slideUp('slow');
        }, 10000);
        $('#price-email').val('');
        $('#price-name').val('');
        $('#price-number').val('');
        $('#price-message').val('');
      }
    });
  } else {
    $('.spinner-processing').hide();
    $('.spinner-processing').removeAttr('disabled');
    $('spinner-processing').removeClass(':active');
    $('#price-error').hide();
    $('#price-success').hide();
  }

  return false;
});