import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import MyExperiences from "../../pages/MyExperiences/MyExperiences";
import AddExperience from "../../pages/addExperience/AddExperience";
import ExperienceDetails from "../../pages/ExperienceDetails/ExperienceDetails";
import EditExperiences from "../../pages/EditExperiences/EditExperiences";
import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ExperienceDetails/:id" element={<ExperienceDetails />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/MyExperiences" element={<MyExperiences />} />
            <Route path="/AddExperience" element={<AddExperience />} />
            <Route path="/EditExperiences/:id" element={<EditExperiences />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
