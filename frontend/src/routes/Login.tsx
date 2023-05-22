import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { faEye, faHandshake } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
function Login() {
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
            type="password"
          />

          <label style={{ color: "white" }} className="disableTextSelect">
            <input type="checkbox" id="showPw" name="showPassword" />
            Show Password
          </label>
        </div>

        <input className="loginInput isButton" value="Login" type="button" />
      </div>

      <div style={{ color: "var(--warning)" }}>Forgot Password?</div>
      <div style={{ color: "var(--primary)", marginTop: "80px" }}>
        Create your account!
      </div>
    </div>
  );
}

export default Login;
