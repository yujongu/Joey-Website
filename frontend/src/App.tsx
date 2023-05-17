import React, { useEffect, useState } from "react";
import "./App.css";
import BlockSquareBig from "./components/block-square-big";
import { dateToString } from "./helperFunctions/prettyDate";
import { WeatherService } from "./services/weatherService";
import { getWeatherIcon } from "./helperFunctions/matchWeatherIcon";
function App() {
  const weatherService = new WeatherService();

  const [today, setToday] = useState<Date>(new Date());

  interface WeatherObjectType {
    location: string;
    locationKr: string;
    locationEn: string;
    weatherName: string;
    weatherDescription: string;
    weatherIcon: string;
    temperature: number;
    feelsLike: number;
    tempUnit: string;
  }

  const [weatherInfo, setWeatherInfo] = useState<WeatherObjectType>({
    location: "",
    locationKr: "",
    locationEn: "",
    weatherName: "",
    weatherDescription: "",
    weatherIcon: "01d",
    temperature: 0,
    feelsLike: 0,
    tempUnit: "K",
  });

  useEffect(() => {
    const getWeather = async () => {
      const res = await weatherService.getWeather();
      if (res) {
        setWeatherInfo(res);
      }
    };

    getWeather();
  }, []);

  useEffect(() => {
    setInterval(() => setToday(new Date()), 1000);
  }, []);

  return (
    <div className="App">
      <div id="topTitleBar">
        <div id="topTitleBar_TextContainer">
          <p>Welcome!!, ㅁㅁㅁ님!</p>
          <p>{dateToString(today, 2)}</p>
          <p>{dateToString(today, 1)}</p>
          <p>
            {weatherInfo.locationKr
              ? weatherInfo.locationKr
              : weatherInfo.locationEn}
          </p>
          <p>
            {weatherInfo.temperature}
            {weatherInfo.tempUnit}
          </p>
          <p>{weatherInfo.weatherDescription.toUpperCase()}</p>
        </div>
        <img
          src={getWeatherIcon(weatherInfo.weatherIcon)}
          alt="clear"
          className="WeatherIcons"
        />
      </div>
      <BlockSquareBig title="This is food" />
      <BlockSquareBig title="This is food" />
      <BlockSquareBig title="This is food" />
      <BlockSquareBig title="This is food" />
    </div>
  );
}

export default App;
