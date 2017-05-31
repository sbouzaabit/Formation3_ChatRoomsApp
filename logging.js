/**
 * Created by Said B on 05/05/2017.
 */
//log
var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname+ '/access.log', {flags: 'a'})
var moragan = require("morgan")("combined", {stream: accessLogStream});

module.exports = moragan;
