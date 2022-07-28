import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./components/profile";
import AllUser from "./components/AllUsers";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/allUser" element={<AllUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
