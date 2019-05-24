$(function(){
  function loadPage(pno=0){
    $.ajax({
      url:"http://127.0.0.1:3000/product1?pno="+pno,
      type:"get",
      data:pno,
      daraType:"json",
      success: function(output) {
        var {data,pageCount,pno}=output;
        var html="";
        for(var p of data){
          var {lid,title,card}=p;
          html+=`<div class="col-lg-4 col-sm-6 mb-4">
          <div class="img_content">
              <img src="${card}" class="w-100"/>
              <div class="mask text-center">
                  <a href="list.html?lid=${lid}" class="btn h5 ">查看详情</a>
              </div>
          </div>
          <p class="text-center mt-2 mb-0 text-secondary">${title}</p>
      </div>`;
        }
        $("#plist").html(html);

        // 分页
        var html=`<li class="page-item">
        <a class="page-link mr-2 text-secondary" href="#">上一页</a>
    </li>`;
    console.log(pno);
        for(var i=0;i<pageCount;i++){
          html+=`<li class="page-item ${i==pno?'active':''}">
          <a class="page-link mr-2 border-0 text-secondary" href="#">${i+1}</a>
      </li>`;
        }
        console.log(i);
        html+=`<li class="page-item">
        <a class="page-link mr-2 text-secondary" href="#">下一页</a>
    </li>`;
        var $ul=$("#plist+div>ul");
        $ul.html(html)
        if(pno==0)
        $ul.children(":first-child")
        .addClass("disabled");
        console.log(pageCount);
        if(pno==pageCount-1)
        $ul.children(":last-child")
        .addClass("disabled");
      }
    })
  }
  // 页面首次加载时，自己调用一次loadPage()
  loadPage();
  // 将on(click)从$.ajax中剪切到外部和$.ajax平级
  $("#plist+div>ul").on("click","li>a",function(e){
    e.preventDefault();
    var $a=$(this);
    if($a.parent().is(":not(.active,.disabled)")){
      var $lis=$("#plist+div>ul>li:gt(0):not(:last)");
      console.log($lis);
      var i=$("#plist+div>ul>li.active>a")
      .html()-1;
      console.log(i);
      if($a.parent().is(":first-child")){
        loadPage(i-1);
        console.log(i);
      }else if($a.parent().is(":last-child")){
        loadPage(i+1);
      }else{
        loadPage($a.html()-1);
      }
    }
  })
 })