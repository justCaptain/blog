$('#formSubmit').on('click',function(){
	if($('#teacherInput').val()=='' || $('#monitorInput').val()==''){
		$('.text-danger').css('display','block');
	}else{
		$.ajax({
			url:'/admin/api/updateclass' ,
			type: "post" ,
			data:{
				 classname: $('.page-header').children('span').text(),
				 classid: $('.page-header').children('small').text(),
				 teacherid: $('#teacherid').val(),
				 monitorid: $('#monitorid').val(),
			},
			success:function(reusult){
				if(reusult.code == 0){
					$('.main').css('display','none');
					$('.panel-success').css('display','block');
					setTimeout(function(){
						window.location.reload();
					},3000);
				}else{
					$('.main').css('display','none');
					$('.panel-danger').find('.panel-body').text(' 提交失败: ' + reusult.message +', 5秒后进行跳转 ... ');
					$('.panel-danger').css('display','block');
					setTimeout(function(){
						window.location.reload();
					},5000);
				}
			}

		});
	}
	
});

$('#teacherInput').on('input',function(){
	if(this.value.length < 8){
		$('#teacherInputMessage').children('.alert-success').css('display','none');
		$('#teacherInputMessage').children('.alert-danger').css('display','block');
	}else{
		$.ajax({
			url: '/admin/api/getTeacher',
			type: 'get' ,
			data:{
				teacherid: this.value
			},
			success:function(result){
				if(result.code == 0){
					$('#teacherInputMessage').children('.alert-success').text('ID: '+ result.id +'  用户名: '+ result.message);
					$('#teacherInputMessage').children('.alert-success').css('display','block');
					$('#teacherInputMessage').children('.alert-danger').css('display','none');
				}else{
					$('#teacherInputMessage').children('.alert-success').css('display','none');
					$('#teacherInputMessage').children('.alert-danger').css('display','block');
				}
			}
		})
	}
});

$('#monitorInput').on('input',function(){
	if(this.value.length < 12){
		$('#monitorInputMessage').children('.alert-success').css('display','none');
		$('#monitorInputMessage').children('.alert-danger').css('display','block');
	}else{
		$.ajax({
			url: '/admin/api/getMonitor',
			type: 'get' ,
			data:{
				monitorid: this.value
			},
			success:function(result){
				if(result.code == 0){
					$('#monitorInputMessage').children('.alert-success').text('ID: '+ result.id +'  用户名: '+ result.message);
					$('#monitorInputMessage').children('.alert-success').css('display','block');
					$('#monitorInputMessage').children('.alert-danger').css('display','none');
				}else{
					$('#monitorInputMessage').children('.alert-success').css('display','none');
					$('#monitorInputMessage').children('.alert-danger').css('display','block');
				}
			}
		})
	}
});