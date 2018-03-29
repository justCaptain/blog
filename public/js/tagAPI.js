
$('#addSubmit').on('click',function(){
    if($('#addInput').val() == ''){
        $(this).siblings('.text-danger').css('display','block');
    }else{
        $(this).text('正在提交 ...');
        $.ajax({
            url: '/api/addtag',
            type: 'post',
            data: {
                tagname: $('#addInput').val()
            },
            success:function(result){
                if(result.code == 0){
                    $('.panel-success').children('.panel-body').text('成功 : '+ result.message +' , 5 秒后进行跳转 ...');
                    $('.panel-success').css('display','block');
                    $('.main').css('display','none');
                    // setTimeout(function(){
                    //     window.location.reload();
                    // },5000);
                }else{
                    $('.panel-danger').children('.panel-body').text('错误 : '+ result.message +' , 5 秒后进行跳转 ...');
                    $('.panel-danger').css('display','block');
                    $('.main').css('display','none');
                    // setTimeout(function(){
                    //     window.location.reload();
                    // },5000);
                }
            }
        });
    }
});


$('#deleteSubmit').on('click',function(){
    if($('#deleteInput').val() == ''){
        $(this).siblings('.text-danger').css('display','block');
    }else{
        $(this).text('正在提交 ...');
        $.ajax({
            url: '/api/deletetag',
            type: 'post',
            data: {
                tagname: $('#deleteInput').val()
            },
            success:function(result){
                if(result.code == 0){
                    $('.panel-success').children('.panel-body').text('成功 : '+ result.message +' , 5 秒后进行跳转 ...');
                    $('.panel-success').css('display','block');
                    $('.main').css('display','none');
                    // setTimeout(function(){
                    //     window.location.reload();
                    // },5000);
                }else{
                    $('.panel-danger').children('.panel-body').text('错误 : '+ result.message +' , 5 秒后进行跳转 ...');
                    $('.panel-danger').css('display','block');
                    $('.main').css('display','none');
                    // setTimeout(function(){
                    //     window.location.reload();
                    // },5000);
                }
            }
        });
    }
});