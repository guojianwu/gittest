/**
 * Created by Administrator on 2017/7/7.
 */
var mongoose = require('mongoose');
var db=require('./db.js');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    touxiang:String
});
var User = mongoose.model('user', userSchema);
module.exports=User;
