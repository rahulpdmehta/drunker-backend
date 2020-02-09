console.log(__dirname);
var url = "http://mylogger.in/log";
function log(message) {
  console.log(message);
}

module.exports.loggerFunction = log;
module.exports.loggerUrl = url;
