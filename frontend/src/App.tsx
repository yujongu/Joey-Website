import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import { RouteName } from "./constants/RouteName";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RouteName.MAIN.addr} element={<Main />} />
        <Route path={RouteName.LOGIN.addr} element={<Login />} />
        <Route path={RouteName.SIGNUP.addr} element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
