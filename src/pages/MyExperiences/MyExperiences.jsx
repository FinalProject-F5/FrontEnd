import imageTemporal from "../../assets/imageTemporal.png";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";
import Buttons from "../../components/Buttons/Buttons";
import React, { useEffect, useState } from "react";
import HeaderLogged from "../../components/headerLogged/HeaderLogged";
import { Experiences } from "../../service/apiService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const experiencesService = new Experiences();

export default function MyExperiences() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [myExperiences, setMyExperiences] = useState([]);

  // Redirige a login si no hay usuario autenticado
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Trae solo las experiencias creadas por el usuario autenticado
  useEffect(() => {
    const fetchMyExperiences = async () => {
      try {
        const allExperiences = await experiencesService.getAllExperiences();
        // Filtra solo las experiencias del usuario autenticado
        const mine = allExperiences.filter(
          (exp) => exp.userId === user?.id // Ajusta el campo según tu backend
        );
        setMyExperiences(mine);
      } catch (error) {
        // Maneja el error si quieres
      }
    };
    if (user) {
      fetchMyExperiences();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderLogged />

      <div className="hero bg-base-200 py-16">
        <p>
          A definir: si tenemos Pagina Perfil del usario (en la fase 4), ahi se agrega la seccion de "Mis experiencias, si NO hacemos el perfil del usuario hacemos una pagina solo para mis experiencias
        </p>
      </div>

      <div className="text-left py-8 max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-primary mb-4">
          My Created Experiences
        </h2>
        <p className="text-xl text-neutral">
          Because sharing is caring
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto py-8 px-4">
        {myExperiences.map((exp) => (
          <Cards
            key={exp.id}
            title={exp.title}
            category={exp.category}
            location={exp.location}
            img={exp.img || imageTemporal}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4 my-8">
        <Buttons color="btn-secondary">{"< Prev"}</Buttons>
        <Buttons color="btn-secondary">{"Next >"}</Buttons>
      </div>
      <Footer />
    </>
  );
}