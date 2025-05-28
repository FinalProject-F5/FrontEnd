import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import AddExperience from "../../pages/AddExperience/AddExperience";
import EditExperience from "../../pages/EditExperience/EditExperience";
import ExperiencesDetails from "../../pages/ExperiencesDetails/ExperiencesDetails";
import ExperienceList from "../../pages/ExperienceList/ExperienceList";
import MyExperiences from "../../pages/MyExperiences/MyExperiences";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addExperiences" element={<AddExperience />} />
        <Route path="/editExperiences" element={<EditExperience />} />
        <Route path="/experiencesDetails" element={<ExperiencesDetails />} />
        <Route path="/experienceList" element={<ExperienceList />} />,
        <Route path="/myExperiences" element={<MyExperiences />} />
      </Routes>
    </BrowserRouter>
  );
}
