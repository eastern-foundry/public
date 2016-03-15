<?php
$emailTo = 'info@eastern-foundry.com';
$siteTitle = 'eastern-foundry.com';

error_reporting(E_ALL ^ E_NOTICE); // hide all basic notices from PHP

//If the form is submitted
if(isset($_POST['member-submitted'])) {

    $email = trim($_POST['member-email']);
    $name = trim($_POST['member-name']);
    $phone = trim($_POST['member-number']);
    $message = trim($_POST['member-message']);

	// upon no failure errors let's email now!
	if(!isset($hasError)) {
      $headers = 'From: ' .' <'.$email.'>' . "\r\n" . 'Reply-To: ' . $email;
      $headers = "MIME-Version: 1.0\r\n"; 
      $headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
      
      $subject = 'New Member Request';
      $body = "<html lang=\"en\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Eastern Foundry</title><link href=\"http://getbootstrap.com/dist/css/bootstrap.min.css\" rel=\"stylesheet\"><link href=\"http://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css\" rel=\"stylesheet\"></head><body><div class=\"container\"><div class=\"jumbotron\"><h1>Member Request</h1><hr/><p class=\"lead\"><strong>Name: </strong>$name</p><p class=\"lead\"><strong>Email: </strong>$email</p><p class=\"lead\"><strong>Phone: </strong>$phone</p><p><strong>Message: </strong>$message</p></div><footer class=\"footer text-center\"><p>Eastern Foundry 2015</p></footer></div></body></html>";
      mail($emailTo, $subject, $body, $headers);
	}
}
?>
