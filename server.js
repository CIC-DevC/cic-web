var express = require('express');
var history = require('connect-history-api-fallback');
app = express();
app.use(history());
app.use(express.static(__dirname + "/dist"));
var port = process.env.PORT || 6868;
app.listen(port);
console.log("server started at " + port);
console.log("server started");