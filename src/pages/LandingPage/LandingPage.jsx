import Header from "../../components/Header/Header";
import imageTemporal from "../../assets/imageTemporal.png";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";
import Buttons from "../../components/Buttons/Buttons";
import React, { useEffect, useState } from "react";
import { Experiences } from "../../service/apiService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const experiencesService = new Experiences();

export default function LandingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

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
        // Ordenar las experiencias por fecha (o algún criterio relevante) y limitar a las últimas 6
        const sortedExperiences = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setExperiences(sortedExperiences.slice(0, 6));
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Calcular las tarjetas visibles para la página actual
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = experiences.slice(indexOfFirstCard, indexOfLastCard);

  // Funciones para manejar los botones de paginación
  const handleNextPage = () => {
    if (currentPage < Math.ceil(experiences.length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        {currentCards.map((exp) => (
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

      <div className="flex justify-center gap-4 my-8"></div>
      <div className="flex justify-center gap-4 my-8">
        <div className="hero bg-base-200 py-8 px-4 rounded-lg shadow-lg text-center max-w-4xl mx-auto">
          <div className="hero-content flex-col">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Want to explore more experiences?
            </h2>
            <p className="text-lg text-neutral mb-6">
              Sign up now and unlock access to all the amazing experiences
              curated by locals.
              <br />
              Already have an account? Log in!
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
