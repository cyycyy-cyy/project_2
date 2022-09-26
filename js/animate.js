/* 动画实现原理     核心原理:通过定时器setInterval0不断移动盒子位置。

1.获得盒子当前位置
2.让盒子在当前位置加上1个移动距离
3.利用定时器不断重复这个操作
4.加一个结束定时器的条件
5.注意此元素需要[添加定位]！！才能使用element.style.left */


/* 缓慢动画原理

1.让盒子每次移动的距离慢慢变小，速度就会慢慢落下来。
2.核心算法: (目标值-现在的位置)/10 做为每次移动的距离步长
3.停止的条件是: 让当前盒子位置等于目标位置就停止定时器 */

/* 回调函数：函数可以作为一个参数。
将这个函数作为参数传到另一个函数里，当那个函数执行完后，再执行传进去的这个参数。 */


//obj对象，target目标位置
function animate(obj, target, callback) {

    // console.log(callback); callback = function() {}调用的时候 callback()

    //先清除以前的定时器，只保留当前的一个定时器执行(解决点击多次出现多个定时器作用)
    clearInterval(obj.timer);

    obj.timer = setInterval(function() {

        //步长值写到定时器的里面
        // var step = Math.ceil((target-obj.offsetLeft)/10);

        //把我们步长值改为整数不要出现小数的问题。（解决最后终点位置有小数的问题）
        //向上取整，负数向下取整。
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (obj.offsetLeft == target) {

            //停止动画本质是停止定时器
            clearInterval(obj.timer);

            //回调函数写到定时器结束里面
            /* if (callback) {

                //调用函数
                callback();
            } */
            callback && callback(); //与上等同。两个都是真就执行
        }

        //把每次加1这个步长值改为一个慢慢变小的值 步长公式: (目标值-现在的位置) / 10
        //左右走
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);

    //匀速动画：盒子是当前的位置+固定的值10
    //缓慢动画：盒子是当前位置+变化的值（目标值-现在的位置）/10


    //js里调用animate动画的详细代码
    /* var span = document.querySelector('span');
    var btn500 = document.querySelector('.btn500');
    var btn800 = document.querySelector('.btn800');
    btn500.addEventListener('click', function() {
        animate(span, 500, function() {
            alert('你好吗');
            span.style.backgroundColor = 'red';
        });
    })
    btn800.addEventListener('click', function() {
        animate(span, 800, function() {});
    }) */

}