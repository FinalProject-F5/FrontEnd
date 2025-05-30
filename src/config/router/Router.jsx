import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import MyExperiences from "../../pages/MyExperiences/MyExperiences";
import AddExperience from "../../pages/addExperience/AddExperience";
import ExperienceDetails from "../../pages/experienceDetails/ExperienceDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/MyExperiences" element={<MyExperiences/>} />
        <Route path="/AddExperience" element={<AddExperience/>} />
        <Route path="/ExperienceDetails" element={<ExperienceDetails/>} />
     
      </Routes>
    </BrowserRouter>
  );
}
