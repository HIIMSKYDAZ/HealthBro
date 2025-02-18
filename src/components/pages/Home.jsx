import "../../App.css";
import HeroSectionfrom from "../HeroSection";
import React from "react";
import Cards from "../Cards";
import Reviews from "../Reviews";

function Home() {
  return (
    <>
      <HeroSectionfrom />
      <Cards />
      <Reviews />
    </>
  );
}

export default Home;
