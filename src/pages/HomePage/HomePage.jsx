
import imageTemporal from "../../assets/imageTemporal.png";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";
import Buttons from "../../components/Buttons/Buttons";
import React from "react";

import cardImage1 from "../../assets/imageTemporal.png";
import cardImage2 from "../../assets/imageTemporal.png";
import HeaderLogged from "../../components/headerLogged/HeaderLogged";
import Maps from "../../components/Map/Map"; 

const allCardData = [
  {
    id: 1,
    title: "Forest Brews & Village Flavours",
    category: "Route with a local perspective",
    location: "Java, Indonesia",
    img: cardImage1,
  },
  {
    id: 2,
    title: "Painting with locals",
    category: "Art",
    location: "Lima, Peru",
    img: cardImage2,
  },
  {
    id: 3,
    title: "Cooking in the desert",
    category: "Authentic Gastronomy.",
    location: "Patagonia, Chile",
    img: cardImage1,
  },
  {
    id: 4,
    title: "Playing the arp as a Geisha",
    category: "Music with Soul",
    location: "Kioto, Japan",
    img: cardImage2,
  },
  {
    id: 5,
    title: "Nguyen Family Journey",
    category: "Personal Stories",
    location: "HoiAn, Vietnam",
    img: cardImage1,
  },
  {
    id: 6,
    title: "Italian Volunteering ",
    category: "Local Projects with Impact",
    location: "Rome, Italy",
    img: cardImage2,
  },
];

export default function HomePage() {
  return (
    <>
      <HeaderLogged />
      
      <Maps />

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto py-8 px-4">
        {allCardData.map((card) => (
          <Cards
            key={card.id}
            title={card.title}
            category={card.category}
            location={card.location}
            img={card.img}
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