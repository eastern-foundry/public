$('#member-form-submit').click(function () {

  $('.spinner-processing').show();
  $('.spinner-processing').attr('disabled', 'disabled');

  var error = false;
  var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var email = $('#member-email').val();
  if (email == "" || email == " ") {
    $('#member-email').css('background-color', '#f2dede');
    error = true;
  } else if (!checkEmail.test(email)) {
    $('#member-email').css('background-color', '#f2dede');
    error = true;
  } else {
    $('#member-email').css('background-color', '#ffffff');
  }
  
  var name = $('#member-name').val();
  if (name == "" || name == " ") {
    $('#member-name').css('background-color', '#f2dede');    
    error = true;
  } else {
    $('#member-name').css('background-color', '#ffffff');
  }
  
  var name = $('#member-number').val();
  if (name == "" || name == " ") {
    $('#member-number').css('background-color', '#f2dede'); 
    error = true;
  } else {
    $('#member-number').css('background-color', '#ffffff');
  }
  
  if (error == false) {
    var data_string = $('#member-form').serialize();
    $.ajax({
      type: "POST",
      url: "../forms/become-a-member/become-a-member.php",
      data: data_string,
      timeout: 6000,
      error: function (request, error) {
        if (error == "timeout") {
          $('#member-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#member-error').slideUp('slow');
          }, 10000);
        } else {
          $('#member-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#get-notified-error').slideUp('slow');
          }, 10000);
        }
      },
      success: function () {
        $('#member-success').slideDown('slow');
        $('.spinner-processing').hide();
        $('.spinner-processing').removeAttr('disabled');
        $('spinner-processing').removeClass(':active');
        setTimeout(function () {
          $('#member-success').slideUp('slow');
        }, 10000);
        $('#member-email').val('');
        $('#member-name').val('');
        $('#member-number').val('');
        $('#member-message').val('');
      }
    });
  } else {
    $('.spinner-processing').hide();
    $('.spinner-processing').removeAttr('disabled');
    $('spinner-processing').removeClass(':active');
    $('#member-error').hide();
    $('#member-success').hide();
  }

  return false;
});