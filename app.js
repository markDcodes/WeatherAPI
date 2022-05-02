//Description: Back-end code to pull weather data for specific city from OpenWeather API

const express = require("express");
const app = express();
const https = require("https"); //included with Node
const bodyParser = require("body-parser"); //for accessing post request data (user entered text)

app.use(bodyParser.urlencoded({extended: true}));

//Our Root Route Server Get
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html" );

  //res.send("Server is up and running")
});

//post is executed when button pressed
app.post("/", function(req, res) {
  //console.log(req.body.cityName);
  //breakout query so we can have user modify later
  const query = req.body.cityName;
  const apiKey = "f924157a972b81c60b4219678427b318";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + units;
  //external GET request
  https.get(url, function(response){ //named "response" b/c this is external server repsonse not our server
    //console.log(response);

    //access response data, parse to JSON then dig thru for data we want
    response.on("data", function(data){
      const weatherData = JSON.parse(data); //format data to JSON
      const temp = weatherData.main.temp; //temperature
      const weatherDescription = weatherData.weather[0].description; //weather description, access from JSON viewer path instead of writing it out
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //responses from OUR server "res"
      res.write("<h1>The temperature in " + query + " is " + temp + "degrees Farenheit</h1>");
      res.write("<h3>The weather is currently " + weatherDescription + "</h3>");
      res.write("<img src =" + imageURL + ">"); //send weather icon image
      res.send(); //can only call res.send ONCE!
    })

  })

})



app.listen(3000, function() {
  console.log("Server is running on port 3000");
})
