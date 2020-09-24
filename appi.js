const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req,res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=0ee19502a190febac9f8451d28ac418e&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      // console.log(data);
      const weatherData = JSON.parse(data)
      console.log(weatherData);
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description

      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather is currently " + weatherDescription + "<p>");
      res.write("<h1>The temp in London is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()


      // console.log(temp);
      // console.log(weatherDescription);
    })
  })


  // res.send("Server is up and running.");
})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
})
