import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import MyExperiences from "../../pages/MyExperiences/MyExperiences";
import AddExperience from "../../pages/AddExperience/AddExperience";
import ExperienceDetails from "../../pages/ExperienceDetails/ExperienceDetails";
import EditExperiences from "../../pages/EditExperiences/EditExperiences";
import { AuthProvider } from "../../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import PrivateLayout from "../../components/Layout/PrivateLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/HomePage"
              element={
                <PrivateLayout>
                  <HomePage />
                </PrivateLayout>
              }
            />
            <Route
              path="/MyExperiences"
              element={
                <PrivateLayout>
                  <MyExperiences />
                </PrivateLayout>
              }
            />
            <Route
              path="/AddExperience"
              element={
                <PrivateLayout>
                  <AddExperience />
                </PrivateLayout>
              }
            />
            <Route
              path="/EditExperiences/:id"
              element={
                <PrivateLayout>
                  <EditExperiences />
                </PrivateLayout>
              }
            />
            <Route
              path="/ExperienceDetails/:id"
              element={
                <PrivateLayout>
                  <ExperienceDetails />
                </PrivateLayout>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
