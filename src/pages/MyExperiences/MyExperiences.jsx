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

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchMyExperiences = async () => {
      try {
        const allExperiences = await experiencesService.getAllExperiences();
        const mine = allExperiences.filter(
          (exp) => exp.userId === user?.id
        );
        setMyExperiences(mine);
      } catch (error) {
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

      <div
        className="hero min-h-[45vh]"
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/624183176/es/foto/arroz-campo-terraplenado-en-mu-cang-chai-vietnam.jpg?s=1024x1024&w=is&k=20&c=avWIfgrGKtPaskn1YY3sGjMTw2H8OjP0GQlRzaPeHPY=)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content justify-start w-full">
          <div className="max-w-md text-left">
            <h1 className="mb-5 text-5xl font-bold">
              My Experiences Created
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto py-8 px-4 [filter:sepia(40%)]" >
        {myExperiences.map((exp) => (
          <Cards
            key={exp.id}
            id={exp.id}
            title={exp.title}
            category={exp.category}
            location={exp.location}
            img={
              Array.isArray(exp.imageUrls) && exp.imageUrls.length > 0
                ? exp.imageUrls[0]
                : imageTemporal
            }
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