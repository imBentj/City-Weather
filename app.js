const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extende: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  // console.log(req.body.cityName);

  const query = req.body.cityName;
  const apiKey = "appid=0ee19502a190febac9f8451d28ac418e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units=" + unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      // console.log(data);
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write("<h1>The temp in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()


      // console.log(temp);
      // console.log(weatherDescription);
    });
  });

  // console.log("Post request received.");
})




// res.send("Server is up and running.");



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
