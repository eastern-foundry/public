$('#tour-form-submit').click(function () {

  $('.spinner-processing').show();
  $('.spinner-processing').attr('disabled', 'disabled');

  var error = false;
  var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $('#tour-email').val();
  if (email == "" || email == " ") {
    $('#tour-email').css('background-color', '#f2dede');
    error = true;
  } else if (!checkEmail.test(email)) {
    $('#tour-email').css('background-color', '#f2dede');
    error = true;
  } else {
    $('#tour-email').css('background-color', '#ffffff');
  }
  
  var name = $('#tour-name').val();
  if (name == "" || name == " ") {
    $('#tour-name').css('background-color', '#f2dede');    
    error = true;
  } else {
    $('#tour-name').css('background-color', '#ffffff');
  }
  
  var name = $('#tour-number').val();
  if (name == "" || name == " ") {
    $('#tour-number').css('background-color', '#f2dede'); 
    error = true;
  } else {
    $('#tour-number').css('background-color', '#ffffff');
  }
  
  if (error == false) {
    var data_string = $('#tour-form').serialize();
    $.ajax({
      type: "POST",
      url: "../forms/request-a-tour/request-a-tour.php",
      data: data_string,
      timeout: 6000,
      error: function (request, error) {
        if (error == "timeout") {
          $('#tour-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#tour-error').slideUp('slow');
          }, 10000);
        } else {
          $('#tour-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#get-notified-error').slideUp('slow');
          }, 10000);
        }
      },
      success: function () {
        $('#tour-success').slideDown('slow');
        $('.spinner-processing').hide();
        $('.spinner-processing').removeAttr('disabled');
        $('spinner-processing').removeClass(':active');
        setTimeout(function () {
          $('#tour-success').slideUp('slow');
        }, 10000);
        $('#tour-email').val('');
        $('#tour-name').val('');
        $('#tour-number').val('');
        $('#tour-message').val('');
      }
    });
  } else {
    $('.spinner-processing').hide();
    $('.spinner-processing').removeAttr('disabled');
    $('spinner-processing').removeClass(':active');
    $('#tour-error').hide();
    $('#tour-success').hide();
  }

  return false;
});