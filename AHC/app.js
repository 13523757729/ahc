/*-----创建网页接口-----*/

//引入模块
const express=require('express');
//引入第三方中间件
const bodyParser=require('body-parser');
const cors=require("cors");
//引入模块
const mysql=require('mysql');
//创建连接池
var pool=mysql.createPool({
	host:'127.0.0.1',
	post:'3306',
	user:'root',
	password:'',
	database:'AHC'
});
//创建web服务器
var app=express();
//启用cors跨域，只允许http://127.0.0.1:8080的请求访问该服务端
app.use(cors({
  "origin":"http://127.0.0.1:5500"
})); 
//监听端口
var server=app.listen(3000);

//托管静态资源到public下
app.use(express.static('public'));
//设置中间件
app.use(bodyParser.urlencoded({
	extended:false
}));
// 首页查询
app.get("/index",(req,res)=>{
	var sql=`select * from AHC_index_product`;
	pool.query(sql,(err,result)=>{
	if(err) throw err;
		res.send(result);
	})
});
//用户登录
app.post("/login",(req,res)=>{
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
app.post('/register',(req,res)=>{
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
// 商品列表
app.get("/product1",(req,res)=>{
		var output={
			count:0,
			pageSize:12,
			pageCount:0,
			pno:req.query.pno,
			data:[]
		};
    // pageSize 页大小
    // 为参数设置默认值
    if(!output.pno){
      output.pno=0;
    }
    if(!output.pageSize){
      output.pageSize=12;
    }
  //1.1:创建变量保存发送给客户端数据
  // var obj={code:1};
  // 创建变量保存进度
  // var progress=0;
	// 2.创建一条SQL语句
	var ss="select lid from AHC_laptop";
	pool.query(ss,(err,result)=>{
		if(err) throw err;
		output.count=result.length;
		output.pageCount=
			Math.ceil(output.count/output.pageSize);
			console.log(output.pageCount);
			var sql="select lid,title,card";
			sql+=" from AHC_laptop";
			sql+=" limit ?,?"
			pool.query(sql,[output.pageSize*output.pno,output.pageSize],(err,result)=>{
				if(err) throw err;
				output.data=result;
				res.send(output)
			});
	})
})
// 详情页
app.get("/details",(req,res)=>{
  var lid=req.query.lid;
  var output={
		product:{},
		pics:{},
		texts:{}
  }
  if(lid!==undefined){
    var sql1=`select * from AHC_laptop where lid=?`;
    pool.query(sql1,[lid],(err,result)=>{
      if(err) console.log(err);
      output.product=result[0];
      console.log(output);
      var family_id=output.product["family_id"];
      var sql2=`select detail_top,detail_bottom from AHC_laptop_details where laptop_id=?`;
      pool.query(sql2,[family_id],(err,result)=>{
        if(err) console.log(err);
        output.pics=result;
        console.log(output);
        var sql3=`select attention,ingredient,laptop_id from AHC_laptop_details where laptop_id=?`
        pool.query(sql3,[lid],(err,result)=>{
					if(err) console.log(err);
          output.texts=result;
          console.log(output);
          res.send(output);
        })
      })
    })
  }else{
    res.send(output);
  }
})