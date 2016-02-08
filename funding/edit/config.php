<?php
//Copyright 2010 Sevenscript <http://sevenscript.net>
  
		//MySQL
		$hostname = "localhost";
        //$hostname = "50.62.209.43";
		$username = "geofforazem";
		$password = "NWD044gbo!";
		$database = "eastern-foundry";
		$table = "funding";
		
		//Fields to display "MySQL Field Name"=>"Column Title". Leave blank to display ALL database fields.
		//e.g. "name"=>"Full Name","telephone"=>"Telephone Number"
		$fields = array("fund_name"=>"NAME", "company_name"=>"COMPANY", "scope"=>"SCOPE", "pass_through"=>"PASS THROUGH", "ceiling"=>"CEILING", "speed"=>"SPEED", "originating_agency"=>"AGENCY", "non_agency_usable"=>"USABLE", "user_experience"=>"UX", "contact_name"=>"CONTACT", "contact_phone"=>"PHONE", "contact_email"=>"EMAIL"); 
		//Field column width. Leave blank to divide table width equally.
		//e.g. "name"=>"200px","postcode"=>"100px"
		$width = array();
		//Field column style. If you want a column in bold, or in a different font color, use your own CSS here.
		//e.g "name"=>"font-weight: bold; font-color: red; font-size: 140%;"
		$style = array();
		//Results per page
		$pageLimit = 15;
		//Which field Ajax search should perform on. Leave blank to search ALL fields
		$searchField = "";
		//Which field to initially sort on. Leave blank to not sort on any field.
		$sortField = "";
		//Ascending or Descending initial sort order.
		$sortOrder = "ASC";
		
		$connection = @mysql_connect ( $hostname, $username, $password );
		if (! $connection) {
			die ( "Fatal Error: Could not connect to database server." );
		}
		if (! @mysql_select_db ( $database )) {
			die ( "Fatal Error: Could not select database." );
		}
?>