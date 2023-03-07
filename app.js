const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=985f071e32d53a6bb66aad5c354b15f3&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      console.log(temp);
      console.log(description);

    });
  });
  res.send("Server is up and running");
});




app.listen(3000, function(){
  console.log("Server is running at port 3000.")
});
