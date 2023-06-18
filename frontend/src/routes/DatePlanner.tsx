import { useEffect } from "react";
import "./DatePlanner.css";
declare global {
  interface Window {
    kakao: any;
  }
}
function DatePlanner() {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(35.814, 127.0907),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <div>
      <div>Date Planner</div>;
      <div id="map" style={{ width: "400px", height: "500px" }}></div>
    </div>
  );
}
export default DatePlanner;
