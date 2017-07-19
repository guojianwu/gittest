var express=require('express');
var app=express();
var router=require('./routers/router.js');
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine','ejs')
app.use(express.static('./public'))
app.get('/',router.Index)
app.get('/login',router.showlogin)
app.post('/postlogoin',router.postlogoin)
app.get('/regist',router.showregist)
app.post('/postregist',router.postregist)
app.get('/outlogin',router.outlogin)
app.get('/usercenter',router.usercenter)
app.get('/fabiaowenzhnag',router.fabiaowenzhnag)
app.post('/postfabiaowenzhang',router.postfabiaowenzhang)
app.post('/posttouxiang',router.posttouxiang)
app.get('/getwenzhanglist',router.getwenzhanglist)
app.post('/dianzanwenzhang',router.dianzanwenzhang)
app.get('/getwenzhangbytype',router.getwenzhangbytype)
app.get('/wenzhangxuanqing',router.wenzhangxuanqing)
app.get('/wenzhangxuanqingbyid',router.wenzhangxuanqingbyid);
app.post('/pinglunbyid',router.pinglunbyid);
app.get('/getuserwenzhangbyusername',router.getuserwenzhangbyusername);
app.get('/deletewenzhangbyuid',router.deletewenzhangbyuid);


app.listen(3000)