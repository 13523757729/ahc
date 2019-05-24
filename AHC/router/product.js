/*-----创建商品路由器-----*/
//引入模块
const express=require('express');
//引入同一级下的MYSQL模块
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
console.log(router)
router.get("/product",(req,res)=>{ 
  // var ss=req.query.title;
  // console.log(ss);
	var sql = "SELECT * FROM AHC_laptop";
	pool.query(sql,(err,result)=>{
	if(err) throw err;
    res.send(result);
    console.log(result);
	})
});
module.exports=router;