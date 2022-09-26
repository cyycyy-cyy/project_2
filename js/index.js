window.addEventListener('load', function() {

    /* 导航栏下拉列表

    
    方法一：
    ①导航栏里面的li都要有鼠标经过效果，所以循环注册鼠标事件
    ②核心原理：当鼠标经过.nav li里面的第二个孩子ul显示，当鼠标离开则ul隐藏 */
    /* var nav = document.querySelector('.nav-td');
    var lis = nav.children;
    //2.循环注册事件
    for (var i = 0; i < lis.length; i++) {
        //鼠标悬停事件，显示
        lis[i].onmouseover = function() {
                this.children[1].style.display = 'block';
            }
            //鼠标移开事件，隐藏
        lis[i].onmouseout = function() {
            this.children[1].style.display = 'none';
        }
    } */

    /* 方法二：使用jquery */
    $(function() {
        //选择亲孩子，使用鼠标经过方法
        /* $(".nav-td>li").mouseover(function() {
            //$(this)是jquery当前元素   不要加引号
            //show()显示元素    hide()隐藏元素
            //$(this).children("ul").show();     无动画不如以下效果好看,下拉滑动
            $(this).children("ul").slideDown();
        });
        //选择亲孩子，使用鼠标离开方法
        $(".nav-td>li").mouseout(function() {
            //hide()隐藏元素
            //$(this).children("ul").hide();     无动画不如以下效果好看,上拉滑动
            $(this).children("ul").slideUp();
        }); */

        //等同于以下代码
        //1.事件切换。第一个参数：鼠标经过；第二个参数：鼠标离开。
        /* $(".nav-td>li").hover(function() {
            $(this).children("ul").slideDown();
        }, function() {
            $(this).children("ul").slideUp();
        }); */

        //等同于以下代码
        //1.事件切换。一个参数：鼠标经过和鼠标离开都会触发这个函数。
        $(".nav-td>li").hover(function() {
            //$(this).children("ul").slideToggle();
            /* 解决动画排队问题（快速经过导航栏很多次动画排队执行很多次的问题）
            stop()方法必须写到动画前面 */
            $(this).children("ul").stop().slideToggle();
        });
    })


    /* 版心右侧固定盒子 */


    //1.获取元素
    var sliderbar = document.querySelector('.slider-bar');
    var main = document.querySelector('.main');
    //mainTop就是在main盒子里被卷去的大小,一定要写在滚动的外面
    var mainTop = main.offsetTop;
    //当我们侧边栏固定定位后应该变化的值
    var sliderbarTop = sliderbar.offsetTop - mainTop;

    var shouji = document.querySelector('.shouji');
    var goback = document.querySelector('.goback');
    //shoujiTop就是在shouji盒子里被卷去的大小,一定要写在滚动的外面
    shoujiTop = shouji.offsetTop;

    // 2.页面滚动事件scrol1
    document.addEventListener('scroll', function() {
        //window.pageYOffset  页面被卷去的头部
        //console.log(window.pageYOffset);
        // 3.当我们页面被卷去的头部大于等于了172 此时侧边栏就要改为固定定位

        if (window.pageYOffset >= mainTop) {
            sliderbar.style.position = 'fixed';
            //侧边栏固定定位后,会跳的解决办法
            sliderbar.style.top = sliderbarTop + 'px';
        } else {
            sliderbar.style.position = 'absolute';
            //侧边栏固定定位后,拉上去恢复原来位置
            sliderbar.style.top = '300px';
        }
        //4.当页面滚动到shouji盒子，就显示goback返回顶部
        if (window.pageYOffset >= shoujiTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    });
    /* 当我们点击了返回顶部，就让窗口滚动到页面的最上方：
    1.描点链接。在顶部设置一个id，超链接上去。
    2. window.scroll(x,y)  可以返回到任何位置，里面不跟单位。;*/
    goback.addEventListener('click', function() {
        /*  快速滚到顶端
        window.scroll(0, 0);*/
        //调用缓慢动画函数。因为是窗口滚动，所以对象是window
        fn(window, 0);
    });
    //缓慢动画函数
    //页面滚动了多少可以通过window.pageYOffset得到

    function fn(obj, target, callback) {
        //先清除以前的定时器，只保留当前的一个定时器执行(解决点击多次出现多个定时器作用)
        clearInterval(obj.timer);

        obj.timer = setInterval(function() {
            //步长值写到定时器的里面
            // var step = Math.ceil((window.pageYOffset) / 10);

            var step = (target - window.pageYOffset) / 10;
            //把我们步长值改为整数不要出现小数的问题。（解决最后终点位置有小数的问题）
            //向上取整，负数向下取整。
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {

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
            //obj.style.left = obj.offsetLeft + step + 'px';
            //上下滚动
            window.scroll(0, window.pageYOffset + step);
        }, 15);
    }
    /* 固定电梯导航（缓慢滚到相应区域）
    方法一：描点链接。在顶部设置一个id，超链接上去。
    方法二：jquery缓慢滚动动画 */
    $(function() {
        //设置节流阀（解决点击另一个小li，滚一轮滑动添加那个类再到另一个小li身上）
        var flag = true;
        $(".slider-bar li").click(function() {
            flag = false;
            //得到点击的第几个小li，索引号
            //console.log($(this).index());
            //去往第几个小li内容的offset().top位置
            var current = $(".floor .w").eq($(this).index()).offset().top;
            //页面动画滚动效果
            $("body,html").stop().animate({
                scrollTop: current
            }, function() {
                flag = true;
            });
            //小li的排他思想
            $(this).addClass("current").siblings().removeClass("current");
        });

        //滚动到内容区域，对应右侧电梯点亮
        $(window).scroll(function() {
            if (flag) {
                $(".floor .w").each(function(index, domele) {
                    //被卷去的头部大于内容区域里面每个版块的offset().top值，就把对应小li点亮
                    if ($(document).scrollTop() >= $(domele).offset().top) {
                        //console.log(index);
                        $(".slider-bar li").eq(index).addClass("current").siblings().removeClass("current");
                    }
                })
            }
        })
    })



    /* 轮播图（焦点图）


    1.鼠标经过轮播图模块,左右按钮显示,鼠标离开隐藏左右按钮。
    2.点击右侧按钮一次,图片往左播放一张,以此类推,左侧按钮同理。
    3.图片播放的同时,下面小圆圈模块跟随一起变化。
    4.点击小圆圈,可以播放相应图片。
    5.鼠标不经过轮播图,轮播图也会自动播放图片。
    6.鼠标经过,轮播图模块，自动播放停止。 */

    var prew = document.querySelector('.prew');
    var next = document.querySelector('.next');
    var focus = document.querySelector('.focus');
    //图片的宽度
    var focusWidth = focus.offsetWidth;
    //1.鼠标经过轮播图模块,左右按钮显示,鼠标离开隐藏左右按钮。
    //mouseover鼠标经过自身盒子会触发，经过子盒子也会触发。
    //mouseenter鼠标只经过自身盒子会触发。mouseenter不会冒泡。
    focus.addEventListener('mouseenter', function() {
        prew.style.display = 'block';
        next.style.display = 'block';
        //关闭定时器，清除定时器变量
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        prew.style.display = 'none';
        next.style.display = 'none';
        //开启定时器
        timer = setInterval(function() {
            //手动调用 点击事件
            next.click();
        }, 2000);
    });

    /* 动态生成小圆圈
    核心思路:小圆圈的个数要跟图片张数一致 */

    //①所以首先先得到ul里面图片的张数(图片放入li里面，所以就是li的个数ul.children.length)
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.cricle');
    //②利用循环动态生成小圆圈(这个小圆圈要放入ol里面)
    for (var i = 0; i < ul.children.length; i++) {
        //③创建节点createElement('li')
        var li = this.document.createElement('li');
        //记录当前小圆圈的索引号，通过[自定义属性]来做
        li.setAttribute('index', i);
        //④插入节点ol. appendChild(li)
        ol.appendChild(li);

        //小圆圈的排他思想。我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            //干掉所有人（把所有的小li清除current类）
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己（把当前点击的小li设置current类）
            this.className = 'current';

            /* 4.点击小圆圈,可以播放相应图片，ul移动,调用动画animate函数。
            ul的滚动距离：小圆圈的索引号*图片的宽度。注意：是负值-！往左走！
            
            ①将js文件引入 (注意：因为index.js 依赖animate.js所以，animate.js 要写到index.js上面)
            ②使用动画函数的前提，该元素必须有定位！！
            ③注意是ul移动而不是小i
            ④滚动图片的核心算法:点击某个小圆圈，就让图片滚动小圆圈的索引号乘以图片宽度做为ul移动距离*/

            //当我们点击了某个小li就拿到当前小li的索引号(获取自定义属性)
            var index = this.getAttribute('index');
            //当我们点击了某个小li就把当前小li的索引号给num（解决点了某个圆圈，然后点右侧按钮跑到第二张图的问题）
            num = index;
            //当我们点击了某个小li就把当前小li的索引号给circle（解决点了某个圆圈，然后点右侧按钮小圆圈没有跟着跳的问题）
            circle = index;
            //图片的宽度
            //var focusWidth = focus.offsetWidth;
            animate(ul, -index * focusWidth);
        });
    }
    //⑤把ol里面的第一个小li设置类名为current,默认第一个。
    ol.children[0].className = 'current';

    /* 2.点击右侧按钮一次,图片往左播放一张,以此类推,左侧按钮同理。

    声明一个变量num，点击一次，自增1，让这个变量乘以图片宽度就是ul的滚动距离 
    无缝滚动原理：①把ul第一个li复制一份，放到ul的最后面
    ②当图片滚动到克隆的最后-张图片时，让u|快速的、不做动画的跳到最左侧: left改为0
    ③同时num赋值为0，可以从新开始滚动图片了
    */
    //深克隆第一张图片 放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    //circle控制小圆圈的播放
    var circle = 0;
    /* flag 节流阀（解决一直点击按钮，图片播放很快的问题）
    节流阀目的：当上一个动画函数执行完毕，再执行下一个动画函数，让事件无法连续触发
    核心思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数 */
    var flag = true;
    next.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            //如果走到了最后复制的第一张图片，此时ul要快速复原。left改为0
            //num == 5  或  num == ul.children.length-1
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //等动画结束后，打开节流阀
            });
            circle++;
            //如果circle==5说明我们走到了最后克隆的这张图片,复原为默认，第一个小圆圈有current类
            if (circle == ol.children.length) {
                circle = 0;
            }
            //调用函数
            circlechang();
        }
    });

    //左侧按钮做法
    prew.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            //如果在第一张图片，点了左侧按钮，此时ul要快速跑到最后一个小圆圈对应的图。
            //left改为最后那张图编号乘以一张图片的位置,把变量设为转完一圈最大可点击的数值，num--
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true; //等动画结束后，打开节流阀
            });
            circle--;
            //如果circle<0 说明在第一张图点了左侧按钮，最后一个（第五个)小圆圈设置current类（4）
            /* if (circle < 0) {
                circle = ol.children.length - 1;
            } */
            circle = circle < 0 ? ol.children.length - 1 : circle;
            //调用函数
            circlechang();
        }
    });

    function circlechang() {
        //干掉所有人（把所有的小li清除current类）
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下我自己（把当前图片对应的小li设置current类）
        ol.children[circle].className = 'current';
    }

    //自动播放轮播图(相当于点了右侧按钮)
    var timer = setInterval(function() {
        //手动调用 点击事件
        next.click();
    }, 2000);



    /* 家用电器、手机通讯版块tab栏切换 */



    //右上角导航栏排他思想方法二：
    /* $(function() {
        //1.隐式迭代。给所有的li绑定了点击事件
        $(".tab_list a").click(function() {
            //2.当前元素添加style_red类
            $(this).addClass("style_red");
            //3.其余的兄弟去掉这个style_red类
            //以下代码有错误
            $(this).parent().siblings().children().removeClass("style_red");;
        })
    }) */

    /*右上角导航栏排他思想方法一：
    获取全部的tab_list类 */
    var tab = document.querySelectorAll('.tab_list');
    for (var i = 0; i < tab.length; i++) {
        //循环调用下面这个函数，有几个tab_list类的内容就调用几次，互不影响
        addstylered(tab[i]);
    }

    function addstylered(ele) {
        var lis = ele.querySelectorAll("a");
        //lis得到的是伪数组里面的每一个元素lis[i]
        //1.点击a后添加某个类
        for (var i = 0; i < lis.length; i++) {
            lis[i].onclick = function() {
                for (var i = 0; i < lis.length; i++) {
                    // (1)然后让所有元素去掉style_red类，下面lis[i]不能换成this
                    lis[i].className = '';
                }
                //(2)先在当前的元素添加style_red类
                this.className = "style_red";
            }
        }
    }

    //切换内容方法一：
    var tab = document.querySelectorAll('.tab_list');
    var content = document.querySelectorAll('.tab_content');
    for (var i = 0; i < tab.length; i++) {
        //循环调用下面这个函数，有几个tab_list类和tab_content类就调用几次，互不影响
        cutcontent(tab[i], content[i]);
    }

    function cutcontent(ele, con) {
        var lis = ele.querySelectorAll('li');
        var items = con.querySelectorAll('.tab_list_item');
        for (var i = 0; i < lis.length; i++) {
            //(1)给.tab_list li添加自定义属性index
            lis[i].setAttribute('index', i);
            lis[i].onclick = function() {
                //2.内容变化，要写到点击事件里
                //获取自定义属性
                var index = this.getAttribute('index');
                console.log(index);
                // (2)干掉所有人。其余的内容盒子隐藏(排他思想)
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = 'none';
                }
                //(3)留下我自己。让对应索引号的盒子显示出来
                items[index].style.display = 'block';
            }
        }
    }

    //切换内容方法二：
    /* $(function() {
        //1.鼠标经过头顶的小li
        $(".tab_list li").click(function() {
            //2.得到当前小li的索引号  $(this).index()
            var index = $(this).index();
            //console.log(index);
            //3.让下面对应索引号的盒子显示出来
            $(".tab_content>div").eq(index).show();
            //4.让其余的盒子(其余的兄弟,不包自己)隐藏
            $(".tab_content>div").eq(index).siblings().hide();
            //链式编程。3、4同一个对象可合成一句
            // $(".tab_content>div").eq(index).show().siblings().hide();
        })
    }) */
})