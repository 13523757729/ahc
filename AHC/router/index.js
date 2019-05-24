/*-----创建商品路由器-----*/
//引入模块
const express=require('express');
//引入同一级下的MYSQL模块
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
router.get("/",(req,res)=>{
	var sql=`select * from AHC_index_product`;
	pool.query(sql,(err,result)=>{
	if(err) throw err;
		res.send(result);
	})
});
module.exports=router;