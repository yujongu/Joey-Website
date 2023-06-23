import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KakaoResultObjectType } from "../types";
import "./search_result_item.css";
import { faMugHot, faUtensils } from "@fortawesome/free-solid-svg-icons";
const PlaceSearchResultItem = ({
  place_name,
  category_name,
  category_group_name,
  id,
  address_name,
  road_address_name,
  xCoor,
  yCoor,
}: KakaoResultObjectType) => {
  const getCategoryName = () => {
    let arr = category_name.split(">");
    let cName = arr[arr.length - 1].trim();
    if (cName.split(",").length > 1) {
      let temp = cName.split(",");
      return temp[temp.length - 1];
    }
    return cName;
  };
  return (
    <div className="searchResultItem_Container isButton disableTextSelect">
      <div className="searchResultItem_LeftHalf">
        <div className="searchResultItem_Title">{place_name}</div>
        <div>{road_address_name}</div>
      </div>
      <div className="searchResultItem_Category">
        <div>{getCategoryName()}</div>
      </div>
    </div>
  );
};
export default PlaceSearchResultItem;
