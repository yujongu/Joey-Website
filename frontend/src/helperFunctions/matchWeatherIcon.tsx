import clearD from "../images/Weather Glassmorphism Icon/clear.png";
import clearN from "../images/Weather Glassmorphism Icon/clear-1.png";
import fewCloudD from "../images/Weather Glassmorphism Icon/sunny-1.png";
import fewCloudN from "../images/Weather Glassmorphism Icon/night.png";
import scatteredCloudD from "../images/Weather Glassmorphism Icon/sunny.png";
import scatteredCloudN from "../images/Weather Glassmorphism Icon/night cloudy.png";
import brokenCloud from "../images/Weather Glassmorphism Icon/cloudy.png";
import showerRain from "../images/Weather Glassmorphism Icon/rain.png";
import rainD from "../images/Weather Glassmorphism Icon/cloudy and rainny.png";
import rainN from "../images/Weather Glassmorphism Icon/night rain.png";
import thunderStormWithRain from "../images/Weather Glassmorphism Icon/heavyrain and storm.png";
import thunderStorm from "../images/Weather Glassmorphism Icon/thunder.png";
interface IconMap {
  iconCode: string;
  icon: string;
}

export function getWeatherIcon(code: string): string {
  const IconList: IconMap[] = [
    { iconCode: "01d", icon: clearD },
    { iconCode: "01n", icon: clearN },
    { iconCode: "02d", icon: fewCloudD },
    { iconCode: "02n", icon: fewCloudN },
    { iconCode: "03d", icon: scatteredCloudD },
    { iconCode: "03n", icon: scatteredCloudN },
    { iconCode: "04d", icon: brokenCloud },
    { iconCode: "04n", icon: brokenCloud },
    { iconCode: "09d", icon: showerRain },
    { iconCode: "09n", icon: showerRain },
    { iconCode: "10d", icon: rainD },
    { iconCode: "10n", icon: rainN },
    { iconCode: "11d", icon: thunderStorm },
    { iconCode: "11n", icon: thunderStorm },
    { iconCode: "13d", icon: clearN }, //snow
    { iconCode: "13n", icon: clearN },
    { iconCode: "50d", icon: clearN }, //mist
    { iconCode: "50n", icon: clearN },
  ];

  for (let i = 0; i < IconList.length; i++) {
    if (IconList[i].iconCode === code) {
      return IconList[i].icon;
    }
  }
  return IconList[0].icon;
}
