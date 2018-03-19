var express = require('express');
var app = express();

var port = 3000;

//respone to GET request
app.get("/", function(req, res){
  res.send("hello world");
});

//listen to port
app.listen(port, function(){
  console.log('ready on port: ' + port);
});
