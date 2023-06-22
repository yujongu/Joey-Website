import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useEffect, useReducer, useState } from "react";
import { UserService } from "../services/userService";
import { RouteName } from "../constants/RouteName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Namecard from "../components/namecard";
import { UserProfileObjectType } from "../types";
import { profileInfoReducer } from "../helperFunctions/profileInfoReducer";
function Profile() {
  const navigate = useNavigate();
  const userService = new UserService();

  const navigateToLogin = () => {
    navigate(RouteName.LOGIN.addr, { replace: true });
  };

  const navigateToMain = () => {
    navigate(RouteName.MAIN.addr, { replace: true });
  };

  const [userInfo, setUserInfo] = useState<UserProfileObjectType>({
    name: "",
    phrase: "",
    location: "",
    tempUnit: "",
    LinkedIn: "",
    Instagram: "",
    Facebook: "",
    YouTube: "",
  });

  const [newUserInfo, dispatch] = useReducer(profileInfoReducer, userInfo);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const getMe = async () => {
      let token = localStorage.getItem("jwtToken");

      if (token) {
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
              setUserInfo({
                name: data.name,
                phrase: data.phrase,
                location: data.wLocation,
                tempUnit: data.tempUnit,
                LinkedIn: data.socialsLinkedIn ? data.socialsLinkedIn : "",
                Instagram: data.socialsInstagram ? data.socialsInstagram : "",
                Facebook: data.socialsFacebook ? data.socialsFacebook : "",
                YouTube: data.socialsYouTube ? data.socialsYoutube : "",
              });
              dispatch({
                type: "LOAD_INITIAL_STATE",
                payload: {
                  name: data.name,
                  phrase: data.phrase,
                  location: data.wLocation,
                  tempUnit: data.tempUnit,
                  LinkedIn: data.socialsLinkedIn,
                  Instagram: data.socialsInstagram,
                  Facebook: data.socialsFacebook,
                  YouTube: data.socialsYouTube,
                },
              });
            });
          }
        }
      }
    };

    getMe();
  }, []);

  const handleProfileInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "phrase":
        dispatch({
          type: "ON_PHRASE_CHANGE",
          payload: { phrase: e.target.value },
        });
        break;

      case "location":
        dispatch({
          type: "ON_LOCATION_CHANGE",
          payload: { location: e.target.value },
        });
        break;
      case "TempUnit":
        dispatch({
          type: "ON_TEMPUNIT_CHANGE",
          payload: { tempUnit: e.target.value },
        });
        break;
      case "LinkedIn":
        dispatch({
          type: "ON_LINKEDIN_CHANGE",
          payload: { LinkedIn: e.target.value },
        });
        break;

      case "Instagram":
        dispatch({
          type: "ON_INSTAGRAM_CHANGE",
          payload: { Instagram: e.target.value },
        });
        break;

      case "Facebook":
        dispatch({
          type: "ON_FACEBOOK_CHANGE",
          payload: { Facebook: e.target.value },
        });
        break;

      case "YouTube":
        dispatch({
          type: "ON_YOUTUBE_CHANGE",
          payload: { YouTube: e.target.value },
        });
        break;
      default:
        break;
    }
  };

  const updateProfile = () => {
    console.log("HI");
    //compare newUserInfo with userInfo to check if anything changed.
    let isDiff = false;
    if (userInfo.phrase !== newUserInfo.phrase.trim()) {
      isDiff = true;
    }
    if (userInfo.location !== newUserInfo.location.trim()) {
      isDiff = true;
    }
    if (userInfo.tempUnit !== newUserInfo.tempUnit) {
      isDiff = true;
    }
    if (userInfo.LinkedIn !== newUserInfo.LinkedIn.trim()) {
      isDiff = true;
    }
    if (userInfo.Instagram !== newUserInfo.Instagram.trim()) {
      isDiff = true;
    }
    if (userInfo.Facebook !== newUserInfo.Facebook.trim()) {
      isDiff = true;
    }
    if (userInfo.YouTube !== newUserInfo.YouTube.trim()) {
      isDiff = true;
    }
    if (isDiff) {
      const updateProfile = async () => {
        let token = localStorage.getItem("jwtToken");
        if (token) {
          const res = await userService.updateProfile(
            token,
            newUserInfo.phrase.trim(),
            newUserInfo.location.trim(),
            newUserInfo.tempUnit.trim(),
            newUserInfo.LinkedIn.trim(),
            newUserInfo.Instagram.trim(),
            newUserInfo.Facebook.trim(),
            newUserInfo.YouTube.trim()
          );
          if (res) {
            console.log("RESS", res);

            if (res.status === 401) {
              //Invalid Token
              localStorage.removeItem("jwtToken");
              //Alert User
              alert("Please Login Again");
              //Return to Login Page
              navigateToLogin();
            } else {
              res.json().then((data) => {
                console.log(data.message);
                if (
                  data.message.affectedRows === 1 &&
                  data.message.changedRows === 1
                ) {
                  alert("Change Made");
                  setUserInfo({
                    ...userInfo,
                    phrase: newUserInfo.phrase,
                    location: newUserInfo.location,
                    tempUnit: newUserInfo.tempUnit,
                    LinkedIn: newUserInfo.LinkedIn,
                    Instagram: newUserInfo.Instagram,
                    Facebook: newUserInfo.Facebook,
                    YouTube: newUserInfo.YouTube,
                  });
                  setEditMode(false);
                }
              });
            }
          }
        }
      };
      updateProfile();
    }
  };

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
      <Namecard name={userInfo.name} phrase={userInfo.phrase} />
      <div className="profileMainContainer">
        <div className="profile_InfoContainer">
          <div>Fun Phrase</div>
          <input
            type="text"
            name="phrase"
            value={newUserInfo.phrase}
            className={editMode ? "" : "isButton readonly"}
            autoComplete="off"
            onClick={() => setEditMode(true)}
            onChange={handleProfileInfoChange}
          />
        </div>
        <div className="profile_InfoContainer">
          <div>Location</div>
          <input
            type="text"
            name="location"
            value={newUserInfo.location}
            className={editMode ? "" : "isButton readonly"}
            autoComplete="off"
            onClick={() => setEditMode(true)}
            onChange={handleProfileInfoChange}
          />
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
                checked={newUserInfo.tempUnit === "Celcius" ? true : false}
                onClick={() => {
                  if (newUserInfo.tempUnit === "Fahrenheit") {
                    setEditMode(true);
                  }
                }}
                onChange={handleProfileInfoChange}
              />
            </div>
            <div style={{ display: "flex", flex: 1 }}>
              <label htmlFor="fahrenheit_input">Fahrenheit</label>
              <input
                id="fahrenheit_input"
                type="radio"
                value="Fahrenheit"
                name="TempUnit"
                checked={newUserInfo.tempUnit === "Fahrenheit" ? true : false}
                onClick={() => {
                  if (newUserInfo.tempUnit === "Celcius") {
                    setEditMode(true);
                  }
                }}
                onChange={handleProfileInfoChange}
              />
            </div>
          </div>
        </div>
        <div className="profile_InfoContainer">
          <div>LinkedIn</div>
          <div className="profile_InfoContainer_InputPlaceholder">
            <span>linkedin.com/in/</span>

            <input
              type="text"
              placeholder="abcdef-ab-12345678"
              name="LinkedIn"
              value={newUserInfo.LinkedIn}
              className={editMode ? "" : "isButton readonly"}
              autoComplete="off"
              onClick={() => setEditMode(true)}
              onChange={handleProfileInfoChange}
            />
          </div>
        </div>
        <div className="profile_InfoContainer">
          <div>Instagram</div>
          <input
            type="text"
            placeholder="@yujongu"
            name="Instagram"
            value={newUserInfo.Instagram}
            className={editMode ? "" : "isButton readonly"}
            autoComplete="off"
            onClick={() => setEditMode(true)}
            onChange={handleProfileInfoChange}
          />
        </div>
        <div className="profile_InfoContainer">
          <div>Facebook</div>
          <div className="profile_InfoContainer_InputPlaceholder">
            <span>facebook.com/</span>
            <input
              type="text"
              placeholder="abcdef.abc.123"
              name="Facebook"
              value={newUserInfo.Facebook}
              className={editMode ? "" : "isButton readonly"}
              autoComplete="off"
              onClick={() => setEditMode(true)}
              onChange={handleProfileInfoChange}
            />
          </div>
        </div>
        <div className="profile_InfoContainer">
          <div>YouTube</div>
          <div className="profile_InfoContainer_InputPlaceholder">
            <span>youtube.com/</span>
            <input
              type="text"
              placeholder="@joeyyu3244"
              name="YouTube"
              value={newUserInfo.YouTube}
              className={editMode ? "" : "isButton readonly"}
              autoComplete="off"
              onClick={() => setEditMode(true)}
              onChange={handleProfileInfoChange}
            />
          </div>
        </div>
        {editMode ? (
          <div className="profile_OnChangeButtonContainer">
            <input
              className="loginInput isButton"
              value="Save Change"
              type="button"
              onClick={updateProfile}
            />
            <input
              className="loginInput isButton"
              value="Revert Back"
              type="button"
              onClick={() => {
                dispatch({
                  type: "LOAD_INITIAL_STATE",
                  payload: {
                    name: userInfo.name,
                    phrase: userInfo.phrase,
                    location: userInfo.location,
                    tempUnit: userInfo.tempUnit,
                    LinkedIn: userInfo.LinkedIn,
                    Instagram: userInfo.Instagram,
                    Facebook: userInfo.Facebook,
                    YouTube: userInfo.YouTube,
                  },
                });
                setEditMode(false);
              }}
            />
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
export default Profile;
