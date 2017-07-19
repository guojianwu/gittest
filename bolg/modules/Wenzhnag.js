/**
 * Created by Administrator on 2017/7/7.
 */
var mongoose = require('mongoose');
var db=require('./db.js');
var wenzhangSchema = mongoose.Schema({
    leixing:String,
    zuozhe:String,
    title: String,
    content: String,
    datetime:Date,
    zan: {type:Number,default:0},
    comm:[{whopinglun:String,pinglun:String,pingluntime:Date}]

});
var wenzhang = mongoose.model('wenzhang', wenzhangSchema);
module.exports=wenzhang;
