$(function(){
  var lid=location.search.slice(1).split("=")[1];
  $.ajax({
    url:"http://127.0.0.1:3000/details",
    type:"get",
    data:{lid},
    dataType:"json",
    success: function(output) {
      var {product,pics,texts}=output;
      console.log(pics);
      $("#details>h1:first").html(product.title);
     for(var pic of pics){
       var html=`<img id="details_top" src="${pic.detail_top}" class="w-100"/>`;
      $("#details_top").html(html);
      // $("#details_top").attr("src",pic.detail_top);
      var html1=`<img src="${pic.detail_bottom}" class="w-100"/>`;
      $("#details_bottom").html(html1);
     }
      var html=``;
      var html1=``;
      for(var text of texts){
      html+=`
      <h6 class="font-weight-bold text-secondary">${product.title}</h6>
      <hr/>
      <div class="p-2 text-secondary my_box">
          ${text.attention}
      </div>`;
      html1+=`<h6 class="font-weight-bold text-secondary">${product.title}</h6>
      <hr/>
      <div class="p-2 text-secondary my_box">
          ${text.ingredient}
      </div>`;
      }
    $("#attention").html(html);
    $("#ingredient").html(html1)
    }
  })
})