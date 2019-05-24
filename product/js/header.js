$(function(){
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(header){
            $(header).replaceAll("header")
            $(`<link rel="stylesheet" href="../css/header.css">/`).appendTo("head")

        }
    })
})