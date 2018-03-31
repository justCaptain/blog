$('#formSubmit').on('click',function(){
	if($('#InputTitle').val()=='' || $('#InputSummary').val()==''|| $('#InputContent').val()==''){
		$('.text-danger').css('display','block');
	}else{
		$('.text-danger').css('display','none');
		var tags = [];
		$('.tagslist').children('input').each(function(element) {
			if($(this).is(':checked')){
				tags.push($(this).attr('name'));
			}
		});
		$.ajax({
			url:'/api/admin/update' ,
			type: "post" ,
			traditional: true,
			data:{
				title: $('#InputTitle').val(),
				summary: $('#InputSummary').val(),
				tags : tags,
				content: $('#InputContent').val()
			},
			success:function(reusult){
				$('.main').css('display','none');
				if(reusult.code == 0){
					$('.panel-success').css('display','block');
					setTimeout(function(){
						window.location.reload();
					},3000);
				}else{
					$('.panel-danger').find('.panel-body').text(' 失败: ' + reusult.message +', 5秒后进行跳转 ... ');
					$('.panel-danger').css('display','block');
					setTimeout(function(){
						window.location.reload();
					},5000);
				}
			}

		});
	}
	
});