
$('#formSubmit').on('click',function(){
	if($('#InputTitle').val() == ''||$('#InputSummary').val()==''||$('#InputContent').val()==''){
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
			url: '/api/admin/addarticle',
			type: 'post' ,
			traditional: true,
			data: {
				title: $('#InputTitle').val(),
				summary: $('#InputSummary').val(),
				tags : tags,
				content: $('#InputContent').val()
			},
			success: function(result){
				if(result.code == 0){
					$('.panel-success').css('display','block');
					$('.main').css('display','none');
					setTimeout(function(){
						window.location.reload();
					},5000);
				}else{
					$('.panel-danger').css('display','block');
					$('.panel-danger').children('.panel-body').text('失败: '+ result.message +' , 5 秒后进行跳转 ...')
					$('.main').css('display','none');
					setTimeout(function(){
						window.location.reload();
					},5000);
				}
			}
		});
	}
});
