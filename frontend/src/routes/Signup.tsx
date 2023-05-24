import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { UserService } from "../services/userService";
import {
  SIGNUP_INITIAL_STATE,
  signupReducer,
} from "../helperFunctions/signupReducer";
import { RouteName } from "../constants/RouteName";
function Signup() {
  const navigate = useNavigate();
  const userService = new UserService();

  const [signupInfo, dispatch] = useReducer(
    signupReducer,
    SIGNUP_INITIAL_STATE
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigateToLogin = () => {
    navigate(RouteName.LOGIN.addr, { replace: true });
  };
  const signup = async () => {
    await userService
      .addUser({
        name: signupInfo.name,
        userId: signupInfo.uid,
        password: signupInfo.password,
      })
      .then((response) =>
        response.json().then((data) => {
          if (data.message === "OK") {
            //Navigate to Login screen.
            alert("User created!");
            navigateToLogin();
          } else {
            alert("Invalid UID");
          }
        })
      );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "signupName":
        dispatch({ type: "ON_NAME_CHANGE", payload: { name: e.target.value } });
        break;
      case "signupUID":
        dispatch({ type: "ON_UID_CHANGE", payload: { uid: e.target.value } });
        break;
      case "signupPassword":
        dispatch({
          type: "ON_PASSWORD_CHANGE",
          payload: { password: e.target.value },
        });
        break;
      default:
        dispatch({ type: "", payload: { name: e.target.value } });
        break;
    }
  };

  return (
    <div className="LoginContainer">
      <div className="LoginHeader">
        <FontAwesomeIcon icon={faHandshake} />
        <span style={{ marginLeft: "30px" }}>Join Us!</span>
      </div>

      <div id="signupFormContainer">
        <input
          name="signupName"
          className="loginInput"
          placeholder="Name"
          type="text"
          onChange={handleInputChange}
          value={signupInfo.name}
        />
        <input
          name="signupUID"
          className="loginInput"
          placeholder="User ID"
          type="text"
          onChange={handleInputChange}
          value={signupInfo.uid}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <input
            name="signupPassword"
            className="loginInput"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            value={signupInfo.password}
          />

          <label
            style={{ color: "white" }}
            className="disableTextSelect isButton"
          >
            <input
              type="checkbox"
              id="showPw"
              name="showPassword"
              className="isButton"
              onClick={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>

        <input
          className="loginInput isButton"
          value="Sign Up"
          type="button"
          onClick={signup}
        />
      </div>

      <div
        className="isButton"
        style={{ color: "var(--primary)", marginTop: "80px" }}
        onClick={navigateToLogin}
      >
        Return to Login
      </div>
    </div>
  );
}
export default Signup;
