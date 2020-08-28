// 引用模块
var express = require('express');
var mongoose = require('mongoose');   
var bodyParser = require('body-parser')
var path = require('path');
var ejs = require('ejs');
var app = express();
var model = require('./Models/users');

var port = process.env.PORT || 3000;
var router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); 

//app.use('/', router);

mongoose.connect('mongodb://localhost:27017/blog')     //连接本地数据库blog 
mongoose.connection.once("open",function(){
    console.log("successed!!")
})

var db = mongoose.connection;

// 连接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
    
});

//const usermodel = mongoose.model("users",model)

model.create({
    username:"togagag",
    password:"jkjfdfdkjddgagegj"
},function(error,doc){
    if(!error){
    console.log("successed!!!!");
    console.log(doc);
}
})

// 连接失败
db.on('error', function(){
    console.log('MongoDB Connection Error');
});

app.set('views', path.join(__dirname,'views'));  // 设置视图文件目录

app.set('view engine' , 'html'); //修改模板文件的后缀名为html
app.engine('.html' , ejs.__express); 

app.use( express.static(path.join(__dirname, 'public')) );  // 配置静态资源目录
app.listen(port);  
// 路由规则
console.log('server started at port 3000');
