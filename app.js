require('dotenv').config();
const fs = require("fs");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
console.log(process.env.OPEN_WEATHER_MAP_API_KEY);


app.get("/", function(req, res){
  res.sendFile(__dirname + ("/index.html"))
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  // const appkey = "111f59133c12341f75bf2b761d6ed57c";
  apiKey
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" +  apiKey + "&units=" + unit +"";
  https.get(url, function(response){
    console.log(response.statusCode);

    // response.on("data", function(data){
    //   const weatherData = JSON.parse(data);
    //   const temp = weatherData.main.temp;
    //   const description = weatherData.weather[0].description;
    //   const icon = weatherData.weather[0].icon;
    //   const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    //   res.write("<p>The weather is currently " + description + "<p>");
    //   res.write("<h1>The temprature in "+ query +" is " + temp + " degree celcius</h1>");
    //   res.write("<img src=" + imageURL +">");
    //   res.send();
    // });
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      if (weatherData && weatherData.main && weatherData.main.temp && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description && weatherData.weather[0].icon) {
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather is currently " + description + "<p>");
        res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celsius</h1>");
        res.write("<img src=" + imageURL +">");
        res.send();
      } else {
        res.send("Error retrieving weather data");
      }
    });
  });
});



app.listen(8000, function(){
  console.log("Server is running at port 8000.")
});
