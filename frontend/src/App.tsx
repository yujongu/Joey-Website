import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BlockSquareBig from "./components/block-square-big";
import clear from "../src/images/Weather Glassmorphism Icon/clear.png";
function App() {
  return (
    <div className="App">
      <div id="topTitleBar">
        <span>Weather stuff </span>
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
