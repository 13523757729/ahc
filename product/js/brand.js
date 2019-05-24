(function(){
    //获取All元素和All内部的div
    var All=document.getElementById("All");
    var divs=document.querySelectorAll("#All div");
    // 获取文档显示区域的大小，赋值给每一个page的height当中去
    var hei=document.body.clientHeight;
    // 将每一个div给予高度
    for(var div of divs){
        div.style.height=hei+"px";
    }
    // 定义滑轮开始时间和结束时间
    var startTime=0,endTime=0,now=0;
    //滚动事件处理函数
    document.onmousewheel=function(event){
        //滑轮滑动的开始时间
        startTime=new Date().getTime();
        //向上滑动x为正，向下滑动x为负
        //鼠标滑动的距离
        var x=event.wheelDelta;
        //endTime时间结束后，需要等2秒后滑轮才有效果，不然时间结束后，立刻开始滑轮，结束时间-开始时间会大于-2秒
        if(endTime-startTime<-100){
            //如果All的top值小于几个div高度总和则向下翻一页
            if(x<0&&All.offsetTop>-(hei*2)){//由于页面向上翻，top负值
                // 向下滑动
                now-=hei;
                All.style.top=now+'px';
            }
            if(x>0&&All.offsetTop<0){
                now+=hei;
                All.style.top=now+'px';
            }
        }
        // 鼠标滑轮结束时的时间
        endTime=new Date().getTime();
    }
    document.onkeyup=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        startTime=new Date().getTime();
        if(endTime-startTime<-500){
            if(e.keyCode==38){
                if(All.offsetTop<0){
                    now+=hei;
                    All.style.top=now+'px';
                }else if(All.offsetTop==0){
                    now-=hei*2;
                    All.style.top=now+'px';
                }
            }
            if(e.keyCode==40){
                if(All.offsetTop>-(hei*2)){
                    now-=hei;
                    All.style.top=now+'px';
                }else if(All.offsetTop==-(hei*2)){
                    now=0;
                    All.style.top=now+'px';
                }
            }
        }
        endTime=new Date().getTime();
    }
    setTimeout(function(){
        var h1=document.querySelector("#All>div>p:first-child");
        h1.style.display="none";
    },4000);
})();
