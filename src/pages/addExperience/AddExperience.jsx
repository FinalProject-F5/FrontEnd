import React from "react";
import FormAddExperience from "../../components/Forms/FormAddExperience/FormAddExperience";
import HeaderLogged from "../../components/headerLogged/HeaderLogged";
import Footer from "../../components/Footer/Footer";

export default function AddExperience() {
  return (
    <>
      <HeaderLogged />
      <div>
        <FormAddExperience />
      </div>
      <Footer />
    </>
  );
}
