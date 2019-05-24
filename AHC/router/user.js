/*-----创建用户路由器-----*/

//引入模块
const express=require("express");
//创建路由器
var router=express.Router();
//引入同一级下的MYSQL模块
const pool=require("../pool.js");

/*-----------------*/
//检索用户
// router.get('/search',(req,res)=>{
// 	var obj=req.query;
// 	var uids=obj.uid;
// 	//验证uid是否为空
// 	if(!uids){
// 		res.send({code:401,msg:'uid required'});
// 		return;
// 	}
// 	var sql = 'SELECT * FROM AHC_users WHERE uid=?';
// 	//查询编号对应的数据
// 	pool.query(sql,[uids],(err,result)=>{
// 		if(err) throw err;
// 		if(result.length>0){
// 			res.send(result);
// 		}else{
// 			res.send({code:301,msg:'can not find'});
// 		}
// 	})
// });

//用户登录
router.post("/login",(req,res)=>{
	var $phone=req.body.phone;
	var $upwd=req.body.upwd;
	if(!$phone){
		res.send("手机号为空");
		return;
	}
	if(!$upwd){
		res.send("密码为空");
		return;
	}
	var sql = "SELECT * FROM AHC_users"
	sql+= " WHERE phone=? AND upwd=?";
	pool.query(sql,[$phone,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("登录成功");
			console.log(result);
		}else{
			res.send("登录失败");
		}
	})
});

//用户注册
router.post('/register',(req,res)=>{
	var obj2=req.body;
	for(var key in obj2){
		if(!obj2[key]){
		res.send({code:401,msg:key+' required'});
		return;
	}
}
var sql ='INSERT INTO AHC_users SET ?';
	pool.query(sql,[obj2],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows==1){
			res.send("注册成功");
		}else{
			res.send("注册失败");
		}
	})
});
/*----------------*/
//导出路由对象
module.exports=router;