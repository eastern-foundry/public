$('#partner-form-submit').click(function () {

  $('.spinner-processing').show();
  $('.spinner-processing').attr('disabled', 'disabled');

  var error = false;
  var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $('#partner-email').val();
  if (email == "" || email == " ") {
    $('#partner-email').css('background-color', '#f2dede');
    error = true;
  } else if (!checkEmail.test(email)) {
    $('#partner-email').css('background-color', '#f2dede');
    error = true;
  } else {
    $('#partner-email').css('background-color', '#ffffff');
  }
  
  var name = $('#partner-name').val();
  if (name == "" || name == " ") {
    $('#partner-name').css('background-color', '#f2dede');    
    error = true;
  } else {
    $('#partner-name').css('background-color', '#ffffff');
  }
  
  var name = $('#partner-number').val();
  if (name == "" || name == " ") {
    $('#partner-number').css('background-color', '#f2dede'); 
    error = true;
  } else {
    $('#partner-number').css('background-color', '#ffffff');
  }
  
  if (error == false) {
    var data_string = $('#partner-form').serialize();
    $.ajax({
      type: "POST",
      url: "../forms/become-a-partner/become-a-partner.php",
      data: data_string,
      timeout: 6000,
      error: function (request, error) {
        if (error == "timeout") {
          $('#partner-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#partner-error').slideUp('slow');
          }, 10000);
        } else {
          $('#partner-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#get-notified-error').slideUp('slow');
          }, 10000);
        }
      },
      success: function () {
        $('#partner-success').slideDown('slow');
        $('.spinner-processing').hide();
        $('.spinner-processing').removeAttr('disabled');
        $('spinner-processing').removeClass(':active');
        setTimeout(function () {
          $('#partner-success').slideUp('slow');
        }, 10000);
        $('#partner-email').val('');
        $('#partner-name').val('');
        $('#partner-number').val('');
        $('#partner-message').val('');
      }
    });
  } else {
    $('.spinner-processing').hide();
    $('.spinner-processing').removeAttr('disabled');
    $('spinner-processing').removeClass(':active');
    $('#partner-error').hide();
    $('#partner-success').hide();
  }

  return false;
});