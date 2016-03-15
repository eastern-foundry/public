<?php

$emailTo = 'swamy@eastern-foundry.com';
$siteTitle = 'eastern-foundry.com';

error_reporting(E_ALL ^ E_NOTICE); // hide all basic notices from PHP

$fundName = trim($_POST['fund-name']);
$scope = trim($_POST['scope']);
$ceiling = trim($_POST['ceiling']);
$speed = trim($_POST['speed']);
$originatingAgency = trim($_POST['originating-agency']);
$passThrough = trim($_POST['pass-through']);
$nonAgencyUsable = trim($_POST['non-agency-usable']);
$userExperience = trim($_POST['user-experience']);
$companyName = trim($_POST['company-name']);
$contactName = trim($_POST['contact-name']);
$contactPhone = trim($_POST['contact-phone']);
$contactEmail = trim($_POST['contact-email']);

// upon no failure add to db, send email!
if(!isset($hasError)) {

  //$servername = "localhost";
  $servername = "50.62.209.43";
  $username = "geofforazem";
  $password = "NWD044gbo!";
  $dbname = "eastern-foundry";
  
  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
  } 

  $sql = "INSERT INTO funding (`fund_name`, `scope`, `ceiling`, `speed`, `originating_agency`, `pass_through`, `non_agency_usable`, `user_experience`, 
          `company_name`, `contact_name`, `contact_phone`, `contact_email`) 
          VALUES ('$fundName', '$scope', '$ceiling', '$speed', '$originatingAgency', '$passThrough', '$nonAgencyUsable', '$userExperience', 
          '$companyName', '$contactName', '$contactPhone', '$contactEmail')";
  
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    error_log("Error: " . $sql . "<br>" . $conn->error);
  }

  $conn->close();
  
  $headers = 'From: ' .' <'.$email.'>' . "\r\n" . 'Reply-To: ' . $email;
  $headers = "MIME-Version: 1.0\r\n"; 
  $headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
      
  $subject = 'New Funding Mechanism';
  $body = "<html lang=\"en\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Eastern Foundry</title><link href=\"http://getbootstrap.com/dist/css/bootstrap.min.css\" rel=\"stylesheet\"><link href=\"http://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css\" rel=\"stylesheet\"></head><body><div class=\"container\"><div class=\"jumbotron\"><h1>New Funding Mechanism</h1><hr/><p class=\"lead\"><strong>Fund Name: </strong>$fundName</p><p class=\"lead\"><strong>Company Name: </strong>$companyName</p><p class=\"lead\"><strong>Contact Name: </strong>$contactName</p><p class=\"lead\"><strong>Contact Phone: </strong>$contactPhone</p><p class=\"lead\"><strong>Contact Email: </strong>$contactEmail</p><p class=\"lead\"><strong>Scope: </strong>$scope</p><p><strong>Ceiling: </strong>$ceiling</p><p class=\"lead\"><strong>Speed: </strong>$speed days</p><p class=\"lead\"><strong>Originating Agency: </strong>$originatingAgency</p><p class=\"lead\"><strong>Pass Through: </strong>$passThrough %</p><p class=\"lead\"><strong>Non Agency Usable: </strong>$nonAgencyUsable</p><p class=\"lead\"><strong>User Experience: </strong>$userExperience stars</p></div><footer class=\"footer text-center\"><p>Eastern Foundry 2015</p></footer></div></body></html>";
  mail($emailTo, $subject, $body, $headers);

}
?>