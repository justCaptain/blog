

// $('#searchClass').on('input',function(){
// 	if(this.value.length <5 ){
// 		$('.text-danger').css('display','block');
// 	}else{
// 		$.ajax({
// 			type:'get' ,
// 			url : '/admin/api/getclass' ,
// 			data:{
// 				classid: this.value
// 			} , 
// 			success:function(result){

// 				if(result.code == 0){
// 					$('#searchresult').remove();
// 					$('.text-danger').css('display','none');
// 					$('#headtable').after('<tr style="color:red" id="searchresult">\
// 				  		<td> * </td>\
// 				  		<td>'+result.classname +'</td>\
// 				  		<td>'+result.teachername+'</td>\
// 				  		<td>'+result.monitorname+ '</td>\
// 				  		<td>\
// 	  			<a href="/update?classid='+result.classid+' "> <button type="button" class="btn btn-success btn-sm">修改</button> </a>\
// 	  			<button type="button" class="btn btn-warning btn-sm deleteclass" data-toggle="modal" data-target="#myModal">删除</button>\
// 	  		</td>\
// 				  	</tr>');
// 				}else{
// 					$('.text-danger').css('display','block');
// 				}
// 			}
// 		});
// 	}
	
// });


$('.deleteclass').on('click',function(){
	$('#modalclassname').text($(this).parent().prevAll('.classname').text());
});

$('#modalconfirm').on('click',function(){
	$(this).text('正在提交...');
	$.ajax({
		type:'post' ,
		url: '/admin/api/deleteclass' ,
		data: {
			classid: $('#modalclassid').text(),
			classname: $('#modalclassname').text()
		},
		success: function(result){
			if(result.code == 0){
				$('.modal-body').text('删除成功');
			}else{
				$('.modal-body').text('删除失败');
			}
			setTimeout(function(){
				window.location.reload();
			},4000);
		}
	});
});