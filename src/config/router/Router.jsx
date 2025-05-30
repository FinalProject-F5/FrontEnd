import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import AddExperiences from "../../pages/AddExperiences/AddExperiences";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddExperiences" element={<AddExperiences />} />
      </Routes>
    </BrowserRouter>
  );
}
