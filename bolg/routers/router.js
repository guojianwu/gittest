/**
 * Created by Administrator on 2017/7/7.
 */
var User=require('../modules/User.js');
var Wenzhang=require('../modules/Wenzhnag.js');
var formidable = require('formidable');
var md5=require('../modules/md5.js');
var fs=require('fs');
var path=require('path');

exports.Index=function(req,res){
    res.render('index',{
        sessionLogin:req.session.login?req.session.login : false,
        sessionUsername:req.session.login?req.session.username : ''
    })
}

exports.showlogin=function(req,res){
    res.render('login')
}
exports.postlogoin=function(req,res){
    if (req.url == '/postlogoin' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields) {
           // console.log(fields)
            User.find({username:fields.username},function(err,result){
               // console.log(result)
                if(err){
                    res.send({code:'-3',msg:'登陆失败'});
                    return;
                }
                if(result.length ==0){
                    res.send({code:'-2',msg:'用户名不存在,请注册'});
                    return;
                }
                var md5password=md5(fields.password);
                if( md5password != result[0].password){
                    res.send({code:'-1',msg:'输入的密码错误'});
                    return;
                }
                req.session.login=true;
                req.session.username=fields.username;
                res.send({code:'1',msg:'登陆成功'});

            })
        });

        return;
    }
}

exports.outlogin=function(req,res){
    req.session.login=false;
    req.session.username='';
    res.redirect('/');
}

exports.showregist=function(req,res){
    res.render('regist')
}
exports.postregist=function(req,res){
    if (req.url == '/postregist' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields) {
            //console.log(fields)
            User.find({username:fields.username},function(err,result){
                if(err){
                    res.send({code:'-3',msg:'注册失败'});
                    return;
                }
                if(result.length!=0){
                    res.send({code:'-2',msg:'用户名已存在'});
                    return;
                }
                if(fields.password != fields.repassword){
                    res.send({code:'-1',msg:'两次密码输入不一致'});
                    return;
                }
                var md5password=md5(fields.repassword);
                User.create({username:fields.username,password:md5password,touxiang:'moren.jpg'},function(err,result){
                    if(err){
                        res.send({code:'-3',msg:'注册失败'});
                        return;
                    }



                    var readable = fs.createReadStream( 'E:/study/bolg/public/touxiang/moren.jpg' );
                    // 创建写入流
                    var writable = fs.createWriteStream( 'E:/study/bolg/public/touxiang/'+fields.username+'.jpg' );
                    // 通过管道来传输流
                    readable.pipe( writable );
                    //var oldPath='E:/study/bolg/public/temptouxiang/moren.jpg';
                    //var newPath='E:/study/bolg/public/touxiang/'+fields.username+'.jpg'
                    //fs.rename(oldPath, newPath, function(err){
                    //    if(err){
                    //        console.log('sb');
                    //        return;
                    //    }
                    //    //res.send(newPath)
                    //})

                    res.send({code:'1',msg:'注册成功'});
                })

                //console.log(result)

            })
        });

        return;
    }

}

exports.usercenter=function(req,res){
    if(!req.session.login){
        res.redirect('/');
        return;
    }
    res.render('usercenter',{
        sessionLogin:req.session.login?req.session.login : false,
         sessionUsername:req.session.login?req.session.username : ''
    })
}
exports.fabiaowenzhnag=function(req,res){
    if(!req.session.login){
        res.redirect('/');
        return;
    }
    res.render('fabiaowenzhnag',{
        sessionLogin:req.session.login?req.session.login : false,
        sessionUsername:req.session.login?req.session.username : ''
    });
}

exports.postfabiaowenzhang=function(req,res){
    if (req.url == '/postfabiaowenzhang' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields) {
          //  console.log(fields)
            Wenzhang.create({
                leixing:fields.leixing,
                title:fields.title,
                content:fields.content,
                zuozhe:fields.zuozhe,
                datetime:new Date()
            },function(err,resule){
                if(err){
                    res.send({code:'-3',msg:"文章发表失败"});
                    return;
                }
                res.send({code:'1',msg:"文章发表成功"});
            })


        });

        return;
    }
}

exports.posttouxiang=function(req,res){
    if (req.url == '/posttouxiang' && req.method.toLowerCase() == 'post') {
        // parse a file upload

        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname+"/../public/touxiang";
        form.parse(req, function(err, fields, files) {
            var extname=files.file. name
            var filepath=path.extname(extname);
            var oldPath=files.file.path;
            var newPath="E:/study/bolg/public/touxiang/"+req.session.username+'.jpg'
            fs.rename(oldPath, newPath, function(err){
                if(err){
                    console.log('sb');
                    return;
                }
                res.send(newPath)
            })

        });

        return;
    }
}

exports.getwenzhanglist=function(req,res){
    Wenzhang.find({},null,{sort:{ datetime:-1,pingluntime:-1}},function(err,result){
        res.send(result)
    })
}

exports.dianzanwenzhang=function(req,res){
    if (req.url == '/dianzanwenzhang' && req.method.toLowerCase() == 'post') {
        // parse a file upload

        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
         // console.log(fields)
                Wenzhang.find({_id:fields.id},function(err,result){
                   // console.log(result[0].zan)
                    var zan=result[0].zan+fields.jia;
                    Wenzhang.update({_id:fields.id},{$set:{zan:zan}},function(err,result){
                        //console.log(result)
                        if(err){
                            res.send({code:'-1',msg:'点赞失败'});
                        }
                        res.send({code:'1',msg:'点赞成功'});
                    })
                })
        });

        return;
    }
}

exports.getwenzhangbytype=function(req,res,next){
    var type=req.query.type
    //console.log(type)
    Wenzhang.find({leixing:type},function(err,result){
        if(err){
            res.json('-1');
            return;
        }
        res.json(result);
    })
}

exports.wenzhangxuanqing=function(req,res){
    res.render('wenzhangxuanqing',{
        sessionLogin:req.session.login?req.session.login : false,
        sessionUsername:req.session.login?req.session.username : ''
    });
}


exports.wenzhangxuanqingbyid=function(req,res){
    var id=req.query.id;
    Wenzhang.find({_id:id},function(err,result){
        if(err){
            res.send('-1');
            return;
        }
        res.send(result);
    })
    //console.log(id);
}

exports.pinglunbyid=function(req,res){
    if (req.url == '/pinglunbyid' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields) {
            //console.log(fields)
            if(err){
                res.send({code:'-1',msg:'评论失败'})
                return;
            }
            Wenzhang.find({_id:fields.id},function(err,result) {
                //console.log(result)
                if(err){
                    res.send({code:'-1',msg:'评论失败'})
                    return;
                }
                result[0].comm.push({whopinglun:fields.whopinglun,pinglun:fields.pinglun,pingluntime:new Date()});
                result[0].save(function(result2){
                    res.send({code:'1',msg:'评论成功'});
                    //console.log('plcg')
                })

                //unshift
            })
        });

        return;
    }
}

exports.getuserwenzhangbyusername=function(req,res){
    var username=req.query.username;
    if(username==''){
        return;
    }
   // console.log(username)
    Wenzhang.find({zuozhe:username},null,{sort:{datetime:-1}},function(err,result){
        if(err){
            res.send({code:'-1',msg:'数据查询失败'});
            return;
        }
        res.send(result);
    })
}

exports.deletewenzhangbyuid=function(req,res){
    var id =req.query.id;
    console.log(id);
    Wenzhang.deleteOne({_id:id},function(err,result){
        if(err){
            res.send({code:"-1",msg:'删除失败'});
            return;
        }
        res.send({code:"1",msg:'删除成功'});
    })
}