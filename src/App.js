import "./App.css";
import TopUp from "./components/TopUp/TopUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import EditProfile from "./components/Akun/EditProfile";
import Akun from "./components/Akun/Akun";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/akun" element={<Akun />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/topup" element={<TopUp />} />
      </Routes>
    </Router>
  );
}

export default App;
