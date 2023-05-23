import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="LoginContainer">
      <div className="LoginHeader">
        <FontAwesomeIcon icon={faHandshake} />
        <span style={{ marginLeft: "30px" }}>Join Us!</span>
      </div>

      <div id="signupFormContainer">
        <input className="loginInput" placeholder="Name" type="text" />
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

        <input className="loginInput isButton" value="Sign Up" type="button" />
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
