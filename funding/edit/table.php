<?php
Header('Cache-Control: no-cache'); //IE Fix
//Sevenscript <http://sevenscript.net> - Copyright (c) 2009 Stuart Rutter <contact@sevenscript.net>
require_once('config.php');
if(isset($_GET['table'])){
//$table = $_GET['table'];
}
		
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
		
		$get_search = mysql_real_escape_string($_GET['search']);
		$get_start = mysql_real_escape_string($_GET['start']);
		$get_direction = mysql_real_escape_string($_GET['direction']);
		$get_order_by = mysql_real_escape_string($_GET['order_by']);
		

		if($get_search){ 
			if(!$searchField){
				$search_sql = " WHERE ";
				foreach($fields as $key=>$val){
				$search_sql .= "$key LIKE '%$get_search%' OR ";
				}
				$search_sql = substr($search_sql,0,-4);
			} else {			
				$search_sql = " WHERE $searchField LIKE '%$get_search%' ";
			}
			
		}

		if($get_start){ $start = $get_start; } else { $start = "0"; }
		if($get_direction){ $direction = $get_direction; }
		if($direction=="ASC"){$direction="DESC";} else { $direction="ASC";}
		if($get_order_by){ $order_by = " ORDER BY $get_order_by " . $direction; } else { $order_by = " "; }
		
		if($sortField && !$get_order_by){
		$get_order_by = $sortField;
		$direction = $sortOrder;
		$order_by = " ORDER BY $get_order_by " . $direction;
		}
		
?>

  <!--
  <div class="newRowBtn pull-right">
    <button onclick="insertRow();"><i class="ion ion-plus-circled"></i></button>
  </div>
  -->

  <div class="table-responsive">
    <table class="table table-bordered table-striped" cellpadding="0" cellspacing="0" border="0" id="ajaxtb">
      <thead>
        <tr>
          <?php
			foreach($fields as $key => $val){
			if($key == $get_order_by){ $imgsrc = "images/$direction.gif"; $sort = $direction; } else { $imgsrc = "images/arrows_updown.gif"; $sort = "DESC"; }
				echo "<th width=\"$width[$val]\"><a href=\"#\" onclick=\"javascript:sortTable('$key','$sort');\">$val<img id=\"$key\" src=\"$imgsrc\" /></a></th>";
			}
		?>
            <th><i class="ion ion-close-circled"></i></th>
        </tr>
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

		//Check if there is a primary key on the table
		$sql = "SELECT _rowid FROM $table";
		$row= mysql_query ($sql);
		if(!$row){ 
		$sql = "SELECT CONCAT_WS('',$field_list) as updatestring,$select_fields FROM $table $search_sql $order_by LIMIT $start, $pageLimit";
		} else {
		$sql = "SELECT _rowid as rowid,$select_fields FROM $table $search_sql $order_by LIMIT $start, $pageLimit";
		}
	
		$row = mysql_query ( $sql );
		
		while ( $result = mysql_fetch_array ( $row ) ) {
			if ( $x&1 ){ echo "<tr class=\"tdOdd\" onmouseover=\"showDelete('$x');\" onmouseout=\"showDelete('$x');\">"; } else { echo "<tr class=\"tdEven\" onmouseout=\"showDelete('$x');\" onmouseover=\"showDelete('$x');\">"; }
			
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
          <td style="width: 28px; height: 28px;" onclick="delRow(this,'<?php echo $result['rowid']; ?>');">
            <div id="del_<?php echo $x; ?>" style="display: none;"><i class="ion ion-close-circled"></i></div>
          </td>
          </tr>
          <?php
			$x++;
		}
		
		$numberOfPages = ceil($rowCount / $pageLimit);
	?>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="30">
            <p class="pull-right">
              <?php echo $rowCount . " Results - " . $numberOfPages . " Pages"; ?>
            </p>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>

  <nav class="text-center">
    <ul class="pagination">
      <?php
$current_page = ceil($start / $pageLimit) + 1;
$x=1;
$start=0;

if($current_page<=9){
	while($x<=$numberOfPages){
		if($x<=10){
			if($current_page == $x){$class="paginationSelected";} else { $class="paginationNotSelected";}
			echo "<li><a href=\"javascript: void(0)\" class=\"$class\" onclick=\"javascript:gotoStart($start);\">$x</a></li> ";
		}
		if($x>10 && $x == $numberOfPages){
			echo "<li><a href=\"javascript: void(0)\" class=\"$class\" onclick=\"javascript:gotoStart($start);\"> ... </a></li><li><a href=\"javascript: void(0)\" class=\"$class\" onclick=\"javascript:gotoStart($start);\">$x</a></li> ";
		}
	$start = $start + $pageLimit;
	$x++;
	}
}

$x=1;
if($current_page>=10){
	$pageCounter = $current_page - 5;
	while($x<=10){
		$pageNumber = $pageCounter * $pageLimit - $pageLimit;
		if($pageCounter<=$numberOfPages){
			if($current_page == $pageCounter){$class="paginationSelected";} else { $class="paginationNotSelected";}
			echo "<li><a href=\"javascript: void(0);\" class=\"$class\" onclick=\"javascript:gotoStart($pageNumber);\">$pageCounter</a></li> ";
		}
	$pageCounter++;
	$x++;
	}
}

?>
    </ul>
  </nav>



  <!--
<div class="tableBorder">
<table class="ajaxTable" cellpadding="0" cellspacing="0" border="0" id="ajaxtb">
	<thead>
		<tr>
<th></th>
		</tr>
	</thead>
<tbody>
<tr><td class="tdOdd"><div class="table_msg">Not Connected. Please use the login form.</div></td></tr>
</tbody>
</table>
</div>
-->