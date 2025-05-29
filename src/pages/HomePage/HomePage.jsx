import React from "react";
import Header from "../../components/header/header";
import imageTemporal from "../../assets/imageTemporal.png";
import Buttons from "../../components/Buttons/Buttons";
import Footer from "../../components/Footer/Footer";
import Cards from "../../components/Cards/Cards";

export default function HomePage() {
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
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome HomePage</h1>
            <p className="mb-5">
              Find your next Experience and get inspired by locals
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row items-center">
    <img
      src={imageTemporal}
      className="max-w-sm rounded-lg shadow-2xl"
      alt="Viaje temporal"
    />
    <div className="lg:ml-8 flex flex-col items-start">
      <h1 className="text-5xl font-bold">Your Journey Starts Here!</h1>
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
      <button className="btn btn-primary mt-2">Get Started</button>
    </div>
  </div>
</div>
      <Cards />
      <div className="flex justify-center gap-4 my-8">
        <Buttons color="btn-secondary">{"< Prev"}</Buttons>
        <Buttons color="btn-secondary">{"Next >"}</Buttons>
      </div>
      <Footer />
    </>
  );
}
