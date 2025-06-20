import React, { useEffect, useState } from "react";
import { getAllExperiences, getCategories, getCountries } from "../../service/apiService";
import Cards from "../../components/Cards/Cards";
import Buttons from "../../components/Buttons/Buttons";
import imageTemporal from "../../assets/imageTemporal.png";

export default function HomePage() {
  const [experiences, setExperiences] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countriesForFilter, setCountriesForFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const experiencesData = await getAllExperiences();
        setExperiences(experiencesData);

        const categoriesResponse = await getCategories();
        setCategoriesData(categoriesResponse);

        const countriesResponse = await getCountries();
        const sortedCountries = countriesResponse.map((country) => country.name).sort();
        setCountriesForFilter(sortedCountries);
      } catch (error) {
      }
    };
    fetchAllData();
  }, []);

  const uniqueCategoriesForFilter = [
    "",
    ...new Set(categoriesData.map((cat) => cat.name)),
  ].sort();

  const filteredExperiences = experiences.filter((exp) => {
    const expCountry = exp.location;
    const expCategoryName = exp.category;

    const matchesCategory =
      selectedCategory === "" || expCategoryName === selectedCategory;
    const matchesCountry =
      selectedCountry === "" || expCountry === selectedCountry;
    return matchesCategory && matchesCountry;
  });

 
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredExperiences.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredExperiences.length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); 
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/624183176/es/foto/arroz-campo-terraplenado-en-mu-cang-chai-vietnam.jpg?s=1024x1024&w=is&k=20&c=avWIfgrGKtPaskn1YY3sGjMTw2H8OjP0GQlRzaPeHPY=)",
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
            alt="image placeholder"
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
        <p className="text-xl text-neutral mb-6">
          Local Inspiration Awaits, here our latest experiences
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="form-control w-full md:w-auto">
            <label htmlFor="categoryFilter" className="label sr-only">
              <span className="label-text">Filter by Category</span>
            </label>
            <select
              id="categoryFilter"
              className="select select-bordered w-full max-w-xs"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {uniqueCategoriesForFilter.map(
                (cat) =>
                  cat && (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )
              )}
            </select>
          </div>

          <div className="form-control w-full md:w-auto">
            <label htmlFor="countryFilter" className="label sr-only">
              <span className="label-text">Filter by Country</span>
            </label>
            <select
              id="countryFilter"
              className="select select-bordered w-full max-w-xs"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">All Countries</option>
              {countriesForFilter.map(
                (country) =>
                  country && (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  )
              )}
            </select>
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
          disabled={currentPage === Math.ceil(filteredExperiences.length / cardsPerPage)}
        >
          {"Next >"}
        </Buttons>
      </div>
    </>
  );
}