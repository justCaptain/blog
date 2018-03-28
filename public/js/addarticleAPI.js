
$('#formSubmit').on('click',function(){
	if($('#InputClassName').val() == ''||$('#InputClassId').val()==''||$('#InputTeacherId').val()==''||$('#InputMonitorId').val()==''){
		$('.text-danger').css('display','block');
	}else{
		$('.text-danger').css('display','block');
		$.ajax({
			url: '/admin/api/addclass',
			type: 'post' ,
			data: {
				classname: $('#InputClassName').val(),
				classid: $('#InputClassId').val(),
				teacherid: $('#InputTeacherId').val(),
				monitorid: $('#InputMonitorId').val()
			},
			success: function(result){
				if(result.code == 0){
					$('.panel-danger').css('display','block');
					$('.main').css('display','none');
					// setTimeout(function(){
					// 	window.location.reload();
					// },3000);
				}else{
					$('.panel-danger').css('display','block');
					$('.panel-danger').children('.panel-body').text('添加班级失败: '+ result.message +' , 5 秒后进行跳转 ...')
					$('.main').css('display','none');
					// setTimeout(function(){
					// 	window.location.reload();
					// },5000);
				}
			}
		})
	}
});

$('#InputTeacherId').on('input',function(){
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

$('#InputMonitorId').on('input',function(){
	if(this.value.length < 12){
		$('#monitorInputMessage').children('.alert-success').css('display','none');
		$('#monitorInputMessage').children('.alert-danger').css('display','block');
	}else{
		$.ajax({
			url: '/admin/api/getMonitor',
			type: 'get' ,
			data:{
				teacherid: this.value
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