<?php
Header('Cache-Control: no-cache'); //IE Fix
/*Sevenscript <http://sevenscript.net> - Copyright (c) 2010 <info@sevenscript.net>*/
require_once('config.php');
$action = $_GET['action'];
$rowid = $_GET['rowid'];
if($action=="delete"){
	$sql = "DELETE FROM $table WHERE _rowid='$rowid' LIMIT 1";
	mysql_query ( $sql );
}
if($action=="new"){
//Insert a new row into the database

mysql_query("INSERT INTO $table VALUES()");
$new_row = mysql_insert_id();

		if(!$fields){
			$result = @mysql_query("SHOW COLUMNS FROM $table");
			if (mysql_num_rows($result) > 0) {
			   while ($row = mysql_fetch_assoc($result)) {
				   $fields[$row['Field']] = $row['Field'];
				   $field_list .= $row['Field'] . ",";
			   }
			   $field_list = substr($field_list,0,-1);
			}
		}
?>
<div class="tableBorder">
<table class="ajaxTable" cellpadding="0" cellspacing="0" border="0" id="ajaxtb">
	<thead>
		<tr>
		<?php
			foreach($fields as $key => $val){
			if($key == $get_order_by){ $imgsrc = "images/$direction.gif"; $sort = $direction; } else { $imgsrc = "images/arrows_updown.gif"; $sort = "DESC"; }
				echo "<th width=\"$width[$val]\">$val</th>";
			}
		?>
		<th>&nbsp;</th></tr>
	</thead>
<tbody>
	<?php
		$sql = "SELECT count(*) AS num FROM $table $search_sql $order_by LIMIT $pageLimit";
		$result = mysql_query ( $sql );
		$rowCount = mysql_result($result,0,"num");

		foreach($fields as $key => $val){
			$select_fields .= $key . ",";
		}
		$select_fields = substr($select_fields,0,-1);

		$sql = "SELECT _rowid as rowid,$select_fields FROM $table $search_sql $order_by WHERE _rowid=$new_row LIMIT 1";
		
	
		$row = mysql_query ( $sql );
		
		while ( $result = mysql_fetch_array ( $row ) ) {
			echo "<tr class=\"tdOdd\" onmouseout=\"showDelete('$x');\" onmouseover=\"showDelete('$x');\">"; 
			
			$fieldval=1;
			while($fieldval <= sizeof($fields)){
			$fieldtype[$fieldval] = @mysql_field_type($row,$fieldval);
			$fieldval++;
			}
			
			$fieldpos=1;
			foreach($fields as $key => $val){
			$filteredKey = htmlspecialchars(addslashes($result[$key]));
				echo "<td class=\"edit_cell\" style=\"$style[$key]\" id=\"$result[$key]\" onmouseover=\"$(this).addClass('tdHover');\" onmouseout=\"$(this).removeClass('tdHover');\" onclick=\"editCell(this.parentNode.rowIndex,this.cellIndex,'$result[rowid]','$key',this.innerHTML,'','$fieldtype[$fieldpos]','$result[updatestring]');\">" . $result[$key] . "</td>";
				$fieldpos++;
			}
			?>
			<td style="width: 28px; height: 28px;" onclick="delRow(this,'<?php echo $result['rowid']; ?>');"><div id="del_<?php echo $x; ?>" style="display: none;"><img src="images/delete_icon.gif" /></div></td></tr>
			<?php
			$x++;
		}
		
	?>
</tbody>
<tfoot>
	<tr><td colspan="30"><input type="button" value="Done" onclick="loadTable();" /><input type="button" value="Cancel" onclick="cancelInsert('<?php echo $new_row; ?>');" /></td></tr>
</tfoot>
</table>



<?php
}
?>