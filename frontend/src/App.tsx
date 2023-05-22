import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./routes/Main";
import Login from "./routes/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
