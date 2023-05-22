import { useEffect, useState } from "react";
import "./Main.css";
import BlockSquareBig from "../components/block-square-big";
import { dateToString } from "../helperFunctions/prettyDate";
import { WeatherService } from "../services/weatherService";
import { getWeatherIcon } from "../helperFunctions/matchWeatherIcon";
import SidebarItem from "../components/sidebar_item";
import {
  faArrowLeft,
  faBars,
  faCat,
  faCode,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Main() {
  const weatherService = new WeatherService();
  const sidebarInitWidth = 50;
  const sidebarExpandedWidth = 180;
  const [today, setToday] = useState<Date>(new Date());
  const [sidebarWidth, setSidebarWidth] = useState(sidebarInitWidth);

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
    <div className="WebContainer">
      <div
        style={{
          backgroundColor: "var(--background)",
          padding: "10px 0px",
        }}
      >
        <div
          className="Main_sidebar"
          style={{
            width: `${sidebarWidth}px`,
            transition: "all 400ms cubic-bezier(0.635, -0.175, 0.650, 0.190)",
          }}
        >
          {sidebarWidth !== sidebarInitWidth ? (
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2xl"
              onClick={() => setSidebarWidth(sidebarInitWidth)}
              style={{
                margin: "10px",
                alignSelf: "flex-end",
              }}
              className="isButton"
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              size="2xl"
              onClick={() => setSidebarWidth(sidebarExpandedWidth)}
              style={{
                margin: "10px",
                alignSelf: "flex-end",
              }}
              className="isButton"
            />
          )}

          <SidebarItem icon={faUser} label="Login" />
          <SidebarItem icon={faCat} label="Cats" />
          <SidebarItem icon={faMessage} label="Message" />
          <SidebarItem icon={faCode} label="whoami" />
        </div>
      </div>

      <div className="Main">
        <div id="topTitleBar">
          <div id="topTitleBar_TextContainer">
            <p>어서오세요, ㅁㅁㅁ님!</p>
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
    </div>
  );
}

export default Main;
