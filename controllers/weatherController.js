var request = require("request");

module.exports = function(app){
  
  var data = {
    city : "Copenhagen",
    temp: "",
    humidity: "",
    wind: "",
    status: ""
  }

  var apiRequest = {
    url: "https://api.openweathermap.org/data/2.5/weather",
    qs: {
      q: "Copenhagen",
      units: "metric",
      appid: "166d00e26d3ff2c6149e89feccc5c59a"
    }  
  };

  //respone to GET request
  app.get("/", function(req, res){
    if(req.query.city==undefined){
      apiRequest.qs.q = "Copenhagen";
    }else{
      apiRequest.qs.q = req.query.city;
    }

    request.get(apiRequest, function(error, response, body){
      if(!error && response.statusCode == 200){
        var JSONbody = JSON.parse(body);
        data.city = JSONbody.name;
        data.temp = JSONbody.main.temp;
        data.humidity = JSONbody.main.humidity;
        data.wind = JSONbody.wind.speed + " m/s " + degreesToDanishCompassHeadings(JSONbody.wind.deg);
        data.status = "";
      }else{
        data.status = "has-error";
      }
      res.render('weather', {data: data});
    });
  });

app.get("/json", function(req, res){
  apiRequest.qs.q = req.query.city;
  request.get(apiRequest, function(error, response, body){
    if(!error && response.statusCode == 200){
      var JSONbody = JSON.parse(body);
      data.city = JSONbody.name;
      data.temp = JSONbody.main.temp;
      data.humidity = JSONbody.main.humidity;
      data.wind = JSONbody.wind.speed + " m/s " + degreesToDanishCompassHeadings(JSONbody.wind.deg);
      data.status = "";
    }else{
      data.status = "has-error";
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});
});
}


var degreesToDanishCompassHeadings = function(degrees){
  if(degrees >= 337.5 || degrees < 22.5){
    return "Nord";
  }else if(degrees >= 22.5 && degrees < 45+22.5){
    return "Nordøst";
  }else if(degrees >= 45+22.5 && degrees < 2*45+22.5){
    return "Øst";
  }else if(degrees >= 2*45+22.5 && degrees < 3*45+22.5){
    return "Sydøst";
  }else if(degrees >= 3*45+22.5 && degrees < 4*45+22.5){
    return "Syd";
  }else if(degrees >= 4*45+22.5 && degrees < 5*45+22.5){
    return "Sydvest";
  }else if(degrees >= 5*45+22.5 && degrees < 6*45+22.5){
    return "Vest";
  }else if(degrees >= 6*45+22.5 && degrees < 7*45+22.5){
    return "NordVest";
  }
};