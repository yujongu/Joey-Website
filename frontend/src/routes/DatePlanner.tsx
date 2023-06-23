import { useEffect, useState } from "react";
import "./DatePlanner.css";
import { KakaoResultObjectType } from "../types";
import PlaceSearchResultItem from "../components/search_result_item";
declare global {
  interface Window {
    kakao: any;
  }
}

function DatePlanner() {
  const [kakaoKeyword, setKakaoKeyword] = useState<string>("");
  const [bounds, setBounds] = useState<any>();
  const [results, setResults] = useState<KakaoResultObjectType[]>([]);

  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(37.563, 126.9779),
      level: 7,
    };

    let map = new window.kakao.maps.Map(container, options);
    setBounds(map.getBounds());
    window.kakao.maps.event.addListener(map, "bounds_changed", () => {
      var bounds = map.getBounds();
      setBounds(bounds);
      console.log(bounds);
    });
  }, []);

  const searchKeyword = (keyword: string) => {
    alert(keyword);
    setResults([]);
    var ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, placesSearchDb);
  };

  const placesSearchDb = (data: any, status: any, pagination: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      //검색 완료
      console.log(data);
      console.log(pagination);
      console.log(data.length);
      var sw = new window.kakao.maps.LatLng(bounds.qa, bounds.ha);
      var ne = new window.kakao.maps.LatLng(bounds.pa, bounds.oa);
      var lb = new window.kakao.maps.LatLngBounds(sw, ne);
      for (let i = 0; i < data.length; i++) {
        if (lb.contain(new window.kakao.maps.LatLng(data[i].y, data[i].x))) {
          setResults((current) => [
            ...current,
            {
              place_name: data[i].place_name,
              address_name: data[i].address_name,
              category_name: data[i].category_name,
              category_group_name: data[i].category_group_name,
              id: data[i].id,
              road_address_name: data[i].road_address_name,
              xCoor: data[i].x,
              yCoor: data[i].y,
            },
          ]);
        }
      }
      if (pagination.hasNextPage) {
        pagination.nextPage();
        console.log("Next Page");
      }
    }
  };

  return (
    <div>
      <div className="datePlannerRoadmapContainer">
        <div className="datePlannerRoadmapSearchContainer">
          <div className="datePlannerRoadmapSearchInputContainer">
            <form>
              <input
                type="text"
                placeholder="키워드"
                id="kakaoMapKeywordInput"
                value={kakaoKeyword}
                onChange={(ev) => setKakaoKeyword(ev.target.value)}
                autoComplete="off"
              />
              <button
                id="kakaoMapKeywordSubmitButton"
                onClick={(ev) => {
                  ev.preventDefault();
                  searchKeyword(kakaoKeyword);
                }}
              >
                검색
              </button>
            </form>
          </div>
          <div className="datePlannerSearchResultContainer">
            {results.map((item) => (
              <div>
                <PlaceSearchResultItem
                  place_name={item.place_name}
                  category_name={item.category_name}
                  category_group_name={item.category_group_name}
                  id={item.id}
                  address_name={item.address_name}
                  road_address_name={item.road_address_name}
                  xCoor={item.xCoor}
                  yCoor={item.yCoor}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="datePlannerRoadmapResultContainer">
          <div>This is a lineeee</div>
        </div>
      </div>
      <div className="kakaoMapContainer">
        <div id="map"></div>
      </div>
    </div>
  );
}
export default DatePlanner;
