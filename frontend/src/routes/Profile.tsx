import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import { RouteName } from "../constants/RouteName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Namecard from "../components/namecard";
function Profile() {
  const navigate = useNavigate();
  const userService = new UserService();

  const navigateToLogin = () => {
    navigate(RouteName.LOGIN.addr, { replace: true });
  };

  const navigateToMain = () => {
    navigate(RouteName.MAIN.addr, { replace: true });
  };

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const getMe = async () => {
      let token = localStorage.getItem("jwtToken");
      if (!token) {
        token = "";
      }

      const res = await userService.getMe(token);
      if (res) {
        if (res.status === 401) {
          //Invalid Token
          localStorage.removeItem("jwtToken");
          //Alert User
          alert("Please Login Again");
          //Return to Login Page
          navigateToLogin();
        } else {
          res.json().then((data) => {
            console.log("D", data);
            setUserInfo(data.name);
          });
        }
      }
    };

    getMe();
  }, []);

  return (
    <div className="profileContainer">
      <div className="profileTopNavbar">
        <FontAwesomeIcon
          icon={faHouse}
          size="2xl"
          className="isButton"
          onClick={navigateToMain}
        />
      </div>
      <Namecard name={userInfo} />
      <div className="profileMainContainer">
        <div className="profile_InfoContainer">
          <div>Fun Phrase</div>
          <input type="text" />
        </div>
        <div className="profile_InfoContainer">
          <div>Location</div>
          <input type="text" />
        </div>
        <div className="profile_InfoContainer">
          <div>Temperature Unit</div>
          <div className="profile_InfoTempContainer">
            <div style={{ display: "flex", flex: 1 }}>
              <label htmlFor="celcius_input">Celcius</label>
              <input
                id="celcius_input"
                type="radio"
                value="Celcius"
                name="TempUnit"
              />
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <label htmlFor="fahrenheit_input">Fahrenheit</label>
              <input
                id="fahrenheit_input"
                type="radio"
                value="Fahrenheit"
                name="TempUnit"
              />
            </div>
          </div>
        </div>
        <div>Add socials</div>
      </div>
    </div>
  );
}
export default Profile;
