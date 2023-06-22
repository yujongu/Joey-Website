require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.route("/hi").get((req, res) => {
  res.send(`hello world hahahahahahaha weather`);
});

router.route("/currentWeather/:loc/:tempUnit").get(async (req, res) => {
  let location = req.params.loc;
  let locationLatLngURL = `https://api.openweathermap.org/geo/1.0/direct`;
  let locationResp = await axios.get(locationLatLngURL, {
    params: {
      q: location,
      appid: process.env.OPENWEATHERAPIKEY,
      limit: 1,
    },
  });
  if (locationResp.data.length) {
    let data = locationResp.data;
    let locationNameKo = data[0].local_names.ko;
    let locationNameEn = data[0].local_names.en;
    let lat = data[0].lat;
    let lon = data[0].lon;
    let tempUnit = req.params.tempUnit === "Celcius" ? "metric" : "imperial";
    console.log(req.params.tempUnit);
    let tempSymbol = "K";
    if (tempUnit === "metric") {
      tempSymbol = "°C";
    } else if (tempUnit === "imperial") {
      tempSymbol = "°F";
    }

    let weatherURL = `https://api.openweathermap.org/data/2.5/weather`;
    let weatherResponse = await axios.get(weatherURL, {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.OPENWEATHERAPIKEY,
        units: tempUnit,
        lang: "kr",
      },
    });
    let result = {
      location: location,
      locationKr: locationNameKo,
      locationEn: locationNameEn,
      weatherName: weatherResponse.data.weather[0].main,
      weatherDescription: weatherResponse.data.weather[0].description,
      weatherIcon: weatherResponse.data.weather[0].icon,
      temperature: weatherResponse.data.main.temp,
      feelsLike: weatherResponse.data.main.feels_like,
      tempUnit: tempSymbol,
    };
    res.status(axios.HttpStatusCode.Ok);
    res.json(result);
  } else {
    res.status(axios.HttpStatusCode.NotFound);
    res.send("Nothing found!");
  }
});

module.exports = router;
