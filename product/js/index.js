$(function(){
  $.ajax({
    url:"http://localhost:3000/index",
    type:"get",
    dataType:"json",
    success: function(product) {
      
      var p1=product[0];
      var html=`
      <div class="mb-3 mt-2">
        <a href="${p1.href}"><img src="${p1.pic}" class="w-100"/></a>
      </div>`;
      var pb=document.querySelector("#main>div:first-child>p:first-child");
      pb.innerHTML+=html;

      // 第二模块
      var p2=product[1];
      var html=`<div class="mb-3 mt-2"><a href="${p2.href}"><img src="${p2.pic}"  class="w-100"/></a></div>`;
      var pc=document.querySelector("#main>div:nth-child(2)>p:nth-child(1)");
      pc.innerHTML+=html

      // 第三模块
      var html="";
      for(var p of product.slice(2,5)){
        console.log(p);
        html+=`<div class="col-lg-4 col-md-6 col-sm-12">
        <a href="${p.href}">
            <img src="${p.pic}" class="w-75 my_position_img"/></a></div>`;
      }
      console.log(html);
      html1=`<div class="row text-center m-0 mt-2">${html}</div>`;
      var pd=document.querySelector("#main>div:first-child>p:nth-child(2)");
      pd.innerHTML+=html1;
      //  第四模块
      var p4=product[5];
      var html=`<div class="mt-2"><a href="${p4.href}"><img src="${p4.pic}" class="w-100"/></a></div>`;


      pc.nextElementSibling.innerHTML+=html;
    }
  })
})