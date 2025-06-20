import React, { useEffect, useState } from "react";
import { getAllExperiences } from "../../service/apiService";
import Cards from "../../components/Cards/Cards";
import Buttons from "../../components/Buttons/Buttons";
import imageTemporal from "../../assets/imageTemporal.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MyExperiences() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [myExperiences, setMyExperiences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchMyExperiences = async () => {
      try {
        const allExperiences = await getAllExperiences();
        const mine = allExperiences.filter((exp) => exp.userId === user?.id);
        setMyExperiences(mine);
      } catch (error) {
        // console.error("Error fetching experiences:", error);
      }
    };
    if (user) {
      fetchMyExperiences();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = myExperiences.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(myExperiences.length / cardsPerPage)) {
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
      <div
        className="hero min-h-[45vh]"
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/1469869566/photo/cappadocia-turkey-during-sunrise-couple-on-vacation-in-the-hills-of-goreme-capadocia-turkey.jpg?s=1024x1024&w=is&k=20&c=LiHAqe-xjT0SQitOEBY2eKUnbs9XMvHAIxOodT2rVKs=)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content justify-start w-full">
          <div className="max-w-md text-left">
            <h1 className="mb-5 text-5xl font-bold">My Experiences Created</h1>
          </div>
        </div>
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

      <div className="flex justify-center gap-4 my-8">
        <Buttons
          color="btn-secondary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          {"< Prev"}
        </Buttons>
        <Buttons
          color="btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(myExperiences.length / cardsPerPage)}
        >
          {"Next >"}
        </Buttons>
      </div>
    </>
  );
}