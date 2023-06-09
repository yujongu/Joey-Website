import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AppName, RouteName } from "./constants/RouteName";

import Main from "./routes/Main";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Profile from "./routes/Profile";
import DatePlanner from "./routes/DatePlanner";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={RouteName.MAIN.addr} element={<Main />} />
        <Route path={RouteName.LOGIN.addr} element={<Login />} />
        <Route path={RouteName.SIGNUP.addr} element={<Signup />} />
        <Route path={RouteName.PROFILE.addr} element={<Profile />} />
        <Route path={AppName.DATEPLANNER.addr} element={<DatePlanner />} />
      </Routes>
    </div>
  );
}

export default App;
