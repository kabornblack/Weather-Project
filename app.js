require('dotenv').config();
const fs = require("fs");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;

app.get("/", function(req, res){
  res.sendFile(__dirname + ("/index.html"))
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const currentHour = new Date().getHours();
  const currentMin = new Date().getMinutes();
  const currentTime = `${currentHour}:${currentMin}`;
  apiKey
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" +  apiKey + "&units=" + unit +"";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      if (weatherData && weatherData.main && weatherData.main.temp && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description && weatherData.weather[0].icon) {
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>Time: " +  currentTime + "</h1>");
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


// app.post("/", function(req, res) {
//   const query = req.body.cityName;
//   const apiKey = "your_openweathermap_api_key"; // Replace with your OpenWeatherMap API key
//   const unit = "metric";
//   const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
//   const timeUrl = "https://worldtimeapi.org/api/timezone/Europe/Tallinn";
//
//   // Get weather data
//   https.get(weatherUrl, function(response) {
//     console.log(response.statusCode);
//
//     response.on("data", function(data) {
//       const weatherData = JSON.parse(data);
//       if (weatherData && weatherData.main && weatherData.main.temp && weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description && weatherData.weather[0].icon) {
//         const temp = weatherData.main.temp;
//         const description = weatherData.weather[0].description;
//         const icon = weatherData.weather[0].icon;
//         const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
//
//         // Get time and IP address
//         // https.get(timeUrl, function(timeResponse) {
//         //   console.log(timeResponse.statusCode);
//         //
//         //   timeResponse.on("data", function(timeData) {
//         //     const timeDataParsed = JSON.parse(timeData);
//         //     const dateTime = timeDataParsed.utc_datetime;
//         //     const ipAddress = timeDataParsed.client_ip;
//
//             res.write("<p>The weather is currently " + description + "<p>");
//             res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius</h1>");
//             res.write("<img src=" + imageURL + ">");
//             // res.write("<p>Current date and time in Tallinn: " + dateTime + "</p>");
//             // res.write("<p>Your IP address: " + ipAddress + "</p>");
//             res.send();
//         //   });
//         // });
//       } else {
//         res.send("Error retrieving weather data");
//       }
//     });
//   });
// });


app.listen(8000, function(){
  console.log("Server is running at port 8000.")
});
