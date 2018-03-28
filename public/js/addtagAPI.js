
$('#formSubmit').on('click',function(){
    if($('#InputTagName').val() == ''){
        $('.text-danger').css('display','block');
    }else{
        $('#formSubmit').text('正在提交 ...');
        $.ajax({
            url: '/api/addtag',
            type: 'post',
            data: {
                tagname: $('#InputTagName').val()
            },
            success:function(result){
                if(result.code == 0){
                    $('.panel-success').css('display','block');
                    $('.main').css('display','none');
                    setTimeout(function(){
                        window.location.reload();
                    },3000);
                }else{
                    $('.panel-danger').children('.panel-body').text('添加班级失败: '+ result.message +' , 5 秒后进行跳转 ...');
                    $('.panel-danger').css('display','block');
                    $('.main').css('display','none');
                    setTimeout(function(){
                        window.location.reload();
                    },5000);
                }
            }
        });
    }
});