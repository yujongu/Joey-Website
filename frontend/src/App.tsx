import React from "react";
import "./App.css";
import BlockSquareBig from "./components/block-square-big";
import clear from "../src/images/Weather Glassmorphism Icon/clear.png";
import { dateToString } from "./helperFunctions/prettyDate";
function App() {
  const today = new Date();
  console.log(today);
  return (
    <div className="App">
      <div id="topTitleBar">
        <div id="topTitleBar_TextContainer">
          <p>어서오세요, ㅁㅁㅁ님!</p>
          <p>{dateToString(today, 2)}</p>
          <p>{dateToString(today, 1)}</p>
          <p>서울시</p>
          <p>31°C</p>
        </div>
        <img src={clear} alt="clear" className="WeatherIcons" />
      </div>
      <BlockSquareBig title="This is food" />
      <BlockSquareBig title="This is food" />
      <BlockSquareBig title="This is food" />
      <BlockSquareBig title="This is food" />
    </div>
  );
}

export default App;
