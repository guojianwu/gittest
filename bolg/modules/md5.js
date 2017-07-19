/**
 * Created by Administrator on 2017/7/7.
 */

var crypto = require('crypto');
module.exports=function(str){
    var md5 = crypto.createHash('md5');
    var password = md5.update(str).digest('base64');
    return password;
}

