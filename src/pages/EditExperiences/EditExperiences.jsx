import React from "react";
import FormEditExperience from "../../components/Forms/FormEditExperience/FormEditExperience";
import HeaderLogged from "../../components/HeaderLogged/HeaderLogged";
import Footer from "../../components/Footer/Footer";

export default function EditExperiences() {
  return (
    <>
      <HeaderLogged />
      <div>
        <FormEditExperience />
      </div>
      <Footer />
    </>
  );
}