module.exports = function(app){
  
  //respone to GET request
  app.get("/", function(req, res){
    res.render('weather');
  });
}