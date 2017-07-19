/**
 * Created by Administrator on 2017/7/7.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.once('open', function() {
    console.log('数据库连接成功');
});