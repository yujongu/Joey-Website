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
    </div>
  );
}
export default Profile;
