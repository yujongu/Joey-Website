import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { RouteName } from "../constants/RouteName";
import { UserService } from "../services/userService";

function Login() {
  const navigate = useNavigate();
  const userService = new UserService();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigateToSignup = () => {
    navigate(RouteName.SIGNUP.addr);
  };

  const navigateToMain = () => {
    navigate(RouteName.MAIN.addr);
  };

  const login = async () => {
    await userService
      .getUser({
        userId: "joey",
        password: "password",
      })
      .then((response) =>
        response.json().then((data) => {
          console.log(data);
          if (data.message === "Correct") {
            localStorage.setItem("jwtToken", data.data.token);
            navigateToMain();
          } else {
            alert("Invalid account info");
          }
        })
      );
  };

  return (
    <div className="LoginContainer">
      <div className="LoginHeader">
        <FontAwesomeIcon icon={faHandshake} />
        <span style={{ marginLeft: "30px" }}>Welcome!</span>
      </div>

      <div id="loginFormContainer">
        <input className="loginInput" placeholder="User ID" type="text" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <input
            className="loginInput"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
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
          value="Login"
          type="button"
          onClick={login}
        />
      </div>

      <div className="isButton" style={{ color: "var(--warning)" }}>
        Forgot Password?
      </div>
      <div
        className="isButton"
        style={{ color: "var(--primary)", marginTop: "80px" }}
        onClick={navigateToSignup}
      >
        Create your account!
      </div>
    </div>
  );
}

export default Login;
