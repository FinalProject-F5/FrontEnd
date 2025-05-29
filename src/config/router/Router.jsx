import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/homePage/HomePage";
import LandingPage from "../../pages/landingPage/LandingPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
     
      </Routes>
    </BrowserRouter>
  );
}
