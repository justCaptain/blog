
$('.deleteblog').on('click',function(){
	$('#modalblogid').text($(this).attr('name'));
});

$('#modalconfirm').on('click',function(){
	$(this).text('正在提交...');
	$.ajax({
		type:'post' ,
		url: '/api/admin/deleteblog' ,
		data: {
			blogid: $('#modalblogid').text()
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