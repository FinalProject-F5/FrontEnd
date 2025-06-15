import Header from "../../components/header/header";
import imageTemporal from "../../assets/imageTemporal.png";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";
import React, { useEffect, useState } from "react";
import { Experiences } from "../../service/apiService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const experiencesService = new Experiences();

export default function LandingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);

  // Redirige a homepage si el usuario ya está autenticado
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate("/homepage");
    }
  }, [user, loading, navigate]);

  // Trae experiencias reales del backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await experiencesService.getAllExperiences();
        setExperiences(data);
      } catch (error) {
        // Puedes mostrar un mensaje de error si quieres
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content justify-start w-full">
          <div className="max-w-md text-left">
            <h1 className="mb-5 text-5xl font-bold">
              Find your next Experience and get inspired by locals
            </h1>
          </div>
        </div>
      </div>

      <div className="hero bg-base-200 py-16">
        <div className="hero-content flex-col lg:flex-row items-center">
          <img
            src={imageTemporal}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Viaje temporal"
          />
          <div className="lg:ml-8 flex flex-col items-start">
            <h1 className="text-5xl font-bold text-secondary">
              Your Journey Starts Here!
            </h1>
            <p className="py-6">
              We are a platform dedicated to unlocking unique and authentic
              travel experiences, curated and led entirely by the people who
              call these destinations home. Our mission goes beyond typical
              sightseeing; we believe in fostering a positive impact on small,
              often overlooked communities by connecting travelers directly with
              local guides and their passions. Forget the well-trodden tourist
              paths – we invite you to step off the classic route and immerse
              yourself in genuine encounters, discovering the true heart and
              soul of a place through the eyes of those who know it best.
            </p>
          </div>
        </div>
      </div>

      <div className="text-left py-8 max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-primary mb-4">
          Beyond the Usual
        </h2>
        <p className="text-xl text-neutral">
          Local Inspiration Awaits, here our latest experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto py-8 px-4 [filter:sepia(40%)]">
        {experiences.map((exp) => (
          <Cards
            key={exp.id}
            title={exp.title}
            category={exp.category}
            location={exp.location}
            img={exp.img || imageTemporal}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}