window.addEventListener('load', function() {
    // 按钮点击之后，会禁用disabled 为true
    // 同时按钮里面的内容会变化， 注意button 里面的内容通过innerHTML修改
    // 里面秒数是有变化的，因此需要用到定时器
    //定义一个变量，在定时器里面，不断递减
    //如果变量为0说明到了时间，我们需要停止定时器，并且复原按钮初始状态

    var btn = document.querySelector('button');
    var time = 5; //定义剩下的秒数
    btn.addEventListener('click', function() {
        btn.disabled = true;
        var timer = setInterval(function() {
            if (time == 0) {
                //清除定时器、复原按钮、恢复剩余秒数
                btn.disabled = false;
                btn.innerHTML = '发送';
                clearInterval(timer);
                time = 5;
            } else {
                btn.innerHTML = '还剩下' + time + '秒';
                time--;
            }
        }, 1000);
    })

    //首先判断的事件是表单失去焦点 onblur
    //如果输入正确则提示正确的信息，绿色小图标
    //如果输入错误则提示错误的信息，红色小图标

    //1.获取元素
    var ipt = document.querySelector('.ipt');
    var message = document.querySelector('.message');
    //2.注册事件，失去焦点事件
    ipt.onblur = function() {
        //根据表单里值的长度 ipt.value.length 判断输入是否正确
        if (this.value.length < 11) {
            //错误时
            message.className = 'message wrong';
            message.innerHTML = '您输入的位数不对，密码不能少于11位数';
        } else {
            //正确时
            message.className = 'message right';
            message.innerHTML = '您输入正确';
        }
    }

})