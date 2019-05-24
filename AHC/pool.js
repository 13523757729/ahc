/*-----创建连接MYSQL模块-----*/

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

//导出对象
module.exports=pool;