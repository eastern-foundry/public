$('#funding-form-submit').click(function () {

  $('.spinner-processing').show();
  $('.spinner-processing').attr('disabled', 'disabled');

  var error = false;

  if ($('#fund-name').val() == "" || $('#fund-name').val() == " ") { $('#fund-name').css('background-color', '#f2dede'); error = true;
  } else { $('#fund-name').css('background-color', '#ffffff'); }
  
  if ($('#company-name').val() == "" || $('#company-name').val() == " ") { $('#company-name').css('background-color', '#f2dede'); error = true;
  } else { $('#company-name').css('background-color', '#ffffff'); }

  if ($('#contact-name').val() == "" || $('#contact-name').val() == " ") { $('#contact-name').css('background-color', '#f2dede'); error = true;
  } else { $('#contact-name').css('background-color', '#ffffff'); }

  if ($('#scope').val() == "" || $('#scope').val() == " ") { $('#scope').css('background-color', '#f2dede'); error = true;
  } else { $('#scope').css('background-color', '#ffffff'); }

  if ($('#ceiling').val() == "" || $('#ceiling').val() == " ") { $('#ceiling').css('background-color', '#f2dede'); error = true;
  } else { $('#ceiling').css('background-color', '#ffffff'); }

  if ($('#speed').val() == "" || $('#speed').val() == " ") { $('#speed').css('background-color', '#f2dede'); error = true;
  } else { $('#speed').css('background-color', '#ffffff'); }

  if ($('#originating-agency').val() == "" || $('#originating-agency').val() == " ") { $('#originating-agency').css('background-color', '#f2dede'); error = true;
  } else { $('#originating-agency').css('background-color', '#ffffff'); }

  if ($('#company-name').val() == "" || $('#company-name').val() == " ") { $('#company-name').css('background-color', '#f2dede'); error = true;
  } else { $('#company-name').css('background-color', '#ffffff'); }

  if ($('#contact-name').val() == "" || $('#contact-name').val() == " ") { $('#contact-name').css('background-color', '#f2dede'); error = true;
  } else { $('#contact-name').css('background-color', '#ffffff'); }

  if ($('#contact-phone').val() == "" || $('#contact-phone').val() == " ") { $('#contact-phone').css('background-color', '#f2dede'); error = true;
  } else { $('#contact-phone').css('background-color', '#ffffff'); }

  if ($('#contact-email').val() == "" || $('#contact-email').val() == " ") { $('#contact-email').css('background-color', '#f2dede'); error = true;
  } else { $('#contact-email').css('background-color', '#ffffff'); }

  
  
  if (error == false) {
    var data_string = $('#funding-form').serialize();
    $.ajax({
      type: "POST",
      url: "add.php",
      data: data_string,
      timeout: 6000,
      error: function (request, error) {
        if (error == "timeout") {
          $('#form-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#form-error').slideUp('slow');
          }, 10000);
        } else {
          $('#form-error').slideDown('slow');
          $('.spinner-processing').hide();
          $('.spinner-processing').removeAttr('disabled');
          $('spinner-processing').removeClass(':active');
          setTimeout(function () {
            $('#form-error').slideUp('slow');
          }, 10000);
        }
      },
      success: function () {
        $('#form-success').slideDown('slow');
        $('.spinner-processing').hide();
        $('.spinner-processing').removeAttr('disabled');
        $('spinner-processing').removeClass(':active');
        setTimeout(function () {
          $('#form-success').slideUp('slow');
        }, 10000);
        $('#fund-name').val('');
        $('#scope').val('');
        $('#ceiling').val('');
        $('#speed').val('');
        $('#originating-agency').val('');
        $('#company-name').val('');
        $('#contact-name').val('');
        $('#contact-phone').val('');
        $('#contact-email').val('');        
      }
    });
  } else {
    $('.spinner-processing').hide();
    $('.spinner-processing').removeAttr('disabled');
    $('spinner-processing').removeClass(':active');
    $('#form-error').hide();
    $('#form-success').hide();
  }

  return false;
});