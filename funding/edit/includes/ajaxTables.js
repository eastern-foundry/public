/*Sevenscript <http://sevenscript.net> - Copyright (c) 2010 <info@sevenscript.net>*/

//Declare Some Global Variables
var cancelString;
var editTblRow;
var editTblCell;
var editSQLRowID;
var editKey;
var editCancel;

function showDelete(id) {
$("#del_" + id).toggle();
}

function loadTable(){
	$("#ajaxTable").load("table.php");
}

function insertRow(){
$("#ajaxTable").load("dbFunc.php?action=new");
}

function selectTable(optvalue){
		editTblRow = null;
		editTblCell = null;
		$("#active_table").val(optvalue);
	$("#ajaxTable").load("table.php?table=" + optvalue);
}

function loadingTimer(){
	$("#ajax_loading_div")
	.bind("ajaxSend", function(){
	$(this).show();
	})
	.bind("ajaxComplete", function(){
	$(this).hide();
	});
}

function delRow(thisRow,rowID){
	var delConfirm = confirm("Delete this row?");
	if (delConfirm){
	$.get("dbFunc.php", { action: 'delete', rowid: rowID },
	function(data){
	$(thisRow).parent().fadeOut(500, function() {$(thisRow).remove(); });
	}); }
}

function cancelInsert(rowID){
	$.get("dbFunc.php", { action: 'delete', rowid: rowID },
	function(data){
	loadTable();
	}); 
}

function toggleDelRow(rowid){
	$("#"+rowid).toggle();
}

function searchTable(searchTerm){
loadingTimer();
	$("#ajaxTable").load("table.php?search=" + encodeURI(searchTerm) + "&table=" + $('#active_table').val());
}

function gotoStart(start){
loadingTimer();
var search_text = '';
if($("#searchText").val()!='Search'){search_text=$("#searchText").val()}
	$("#ajaxTable").load("table.php?start=" + start + "&search=" + search_text + "&table=" + $('#active_table').val());
}

function sortTable(order_by,direction){
loadingTimer();
var search_text = '';
if($("#searchText").val()!='Search'){search_text=$("#searchText").val()}
	$("#ajaxTable").load("table.php?start=0&search=" + search_text + "&order_by=" + order_by + "&direction=" + direction + "&table=" + $('#active_table').val());
	$("#" + order_by).attr("src","img' + '../images/arrow_down.gif");
}


this.label2value = function(){	
	var inactive = "inactive";
	var active = "active";
	var focused = "focused";
	
	$("label").each(function(){		
		obj = document.getElementById($(this).attr("for"));
	if($(this).attr("for")=="searchText"){
		if(($(obj).attr("type") == "text") || (obj.tagName.toLowerCase() == "textarea")){			
			$(obj).addClass(inactive);			
			var text = $(this).text();
			$(this).css("display","none");			
			$(obj).val(text);
			$(obj).focus(function(){	
				$(this).addClass(focused);
				$(this).removeClass(inactive);
				$(this).removeClass(active);								  
				if($(this).val() == text) $(this).val("");
			});	
			$(obj).blur(function(){	
				$(this).removeClass(focused);													 
				if($(this).val() == "") {
					$(this).val(text);
					$(this).addClass(inactive);
				} else {
					$(this).addClass(active);		
				};				
			});				
		};	
	};
	});		
};

var t = document.getElementsByTagName("tr");
for(var i=0;i<t.length;i++) {
  var ocn = t[i].className;
  t[i].onmouseover = function() { t[i].className = "hovered" };
  t[i].onmouseout = function() { t[i].className = ocn };
}


function editCell(rowid,cellid,sqlrowid,key,id,type,fieldtype,updatestring) {

if(type=='cancel'){
	$($('#ajaxtb')[0].rows[editTblRow].cells[editTblCell]).hide().html(cancelString).fadeIn('slow');	
	$($('#ajaxtb')[0].rows[editTblRow].cells[editTblCell]).removeClass('tdHover');
	showDelete(editTblRow-1);
	editCancel=true;
} else if(type=='save'){
$.ajax({
    url: 'database.php',
    type: 'GET',
	data: "text=" + $('#edit_box').val() + "&sqlrowid=" + editSQLRowID + "&field=" + editKey + "&table=" + $('#active_table').val() + "&updatestring=" + escape(updatestring),
    success: function(response){
	if(updatestring){$("#ajaxTable").load("table.php");} else {
       $($('#ajaxtb')[0].rows[editTblRow].cells[editTblCell]).html(response);
	}
		editTblRow = null;
		editTblCell = null;
    }
});
$($('#ajaxtb')[0].rows[editTblRow].cells[editTblCell]).removeClass('tdHover');
showDelete(editTblRow-1);
} else {

if(editTblRow==null && editTblCell==null){
if(fieldtype!='blob'){
$($('#ajaxtb')[0].rows[rowid].cells[cellid]).html('<input type="text" id="edit_box" class=\"edit_input\" value=\"' + id + '\" /> <div class=\"cell_opts\"><a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','save','','" + updatestring + "');" + '\" class=\"btn btn-xs btn-color-line\">Save</a> - <a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','cancel');" + '\" class=\"btn btn-xs btn-black-line\">Cancel</a></div>'); 
} else {
$($('#ajaxtb')[0].rows[rowid].cells[cellid]).html('<textarea id="edit_box" class=\"edit_input\" value=\"' + id + '\" >' + id + '</textarea> <div class=\"cell_opts\"><a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','save','','" + updatestring + "');" + '\" class=\"btn btn-xs btn-color-line\">Save</a> - <a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','cancel');" + '\" class=\"btn btn-xs btn-black-line\">Cancel</a></div>');
}

editTblRow = rowid;
editTblCell = cellid;
editSQLRowID = sqlrowid;
editKey = key;
cancelString = id;

} else {

if(editTblRow==rowid && editTblCell==cellid){
	//We are currently editing this cell. Do nothing if clicked.
	if(editCancel==true){
		editTblRow = null;
		editTblCell = null;
	}
	editCancel=false;
	return false;
} else {
//Load a new edit box on a new cell

$($('#ajaxtb')[0].rows[editTblRow].cells[editTblCell]).hide().html(cancelString).fadeIn('slow');

if(fieldtype!='blob'){
$($('#ajaxtb')[0].rows[rowid].cells[cellid]).html('<input type="text" id="edit_box" class=\"edit_input\" value=\"' + id + '\" /> <div class=\"cell_opts\"><a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','save','','" + updatestring + "');" + '\" class=\"btn btn-xs btn-color-line\">Save</a> - <a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','cancel');" + '\" class=\"btn btn-xs btn-black-line\">Cancel</a></div>');
} else {
$($('#ajaxtb')[0].rows[rowid].cells[cellid]).html('<textarea id="edit_box" class=\"edit_input\" value=\"' + id + '\" >' + id + '</textarea> <div class=\"cell_opts\"><a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','save','','" + updatestring + "');" + '\" class=\"btn btn-xs btn-color-line\">Save</a> - <a href=\"javascript:return false;\" onclick=\"' + "editCell('','','','','','cancel');" + '\" class=\"btn btn-xs btn-black-line\">Cancel</a></div>');
}	   

		editTblRow = rowid;
		editTblCell = cellid;
		editSQLRowID = sqlrowid;
		editKey = key;
		cancelString = id;

}
}
}
}