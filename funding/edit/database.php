<?php
/*Sevenscript <http://sevenscript.net> - Copyright (c) 2010 <info@sevenscript.net>*/
require_once('config.php');
		
$update_text = $_GET['text'];
$sqlrowid = $_GET['sqlrowid'];
$field = $_GET['field'];
$updatestring = $_GET['updatestring'];
if($updatestring){
			$result = @mysql_query("SHOW COLUMNS FROM $table");
			if (mysql_num_rows($result) > 0) {
			   while ($row = mysql_fetch_assoc($result)) {
				   $field_list .= $row['Field'] . ",";
			   }
			   $field_list = substr($field_list,0,-1);
			}
			
			$sql = "UPDATE $table SET $field= '$update_text' WHERE CONCAT_WS('',$field_list) = '$updatestring' LIMIT 1";
		if(mysql_query ( $sql )){
			echo $update_text;
		}
}

$sql = "UPDATE $table SET $field= '$update_text' WHERE _rowid = '$sqlrowid'";
		if(mysql_query ( $sql )){
			echo $update_text;
		}

?>