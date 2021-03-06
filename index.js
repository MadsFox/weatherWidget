var express = require('express');
var weatherController = require("./controllers/weatherController");

var app = express();

var port = 3000;

//set up template engines 
app.set('view engine', 'ejs');

//fire controllers
weatherController(app);

//listen to port
app.listen(port, function(){
  console.log('ready on port: ' + port);
});
