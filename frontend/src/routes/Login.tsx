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
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");

  const navigateToSignup = () => {
    navigate(RouteName.SIGNUP.addr, { replace: true });
  };

  const navigateToMain = () => {
    navigate(RouteName.MAIN.addr, { replace: true });
  };

  const login = async () => {
    if (userId.length === 0 || userPw.length === 0) {
      alert("User Info is empty");
    } else {
      await userService
        .getUser({
          userId: userId,
          password: userPw,
        })
        .then((response) =>
          response.json().then((data) => {
            if (data.message === "Correct") {
              localStorage.setItem("jwtToken", data.data.token);
              navigateToMain();
            } else {
              if (data.message === "User Not Found") {
                alert("Invalid User Id");
              } else {
                alert("Invalid account info");
              }
            }
          })
        );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "loginUserId":
        setUserId(e.target.value);
        break;

      case "loginUserPw":
        setUserPw(e.target.value);
        break;
    }
  };

  return (
    <div className="LoginContainer">
      <div className="LoginHeader">
        <FontAwesomeIcon icon={faHandshake} />
        <span style={{ marginLeft: "30px" }}>Welcome!</span>
      </div>

      <div id="loginFormContainer">
        <input
          name="loginUserId"
          className="loginInput"
          placeholder="User ID"
          type="text"
          onChange={handleInputChange}
          value={userId}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <input
            name="loginUserPw"
            className="loginInput"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={handleInputChange}
            value={userPw}
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
