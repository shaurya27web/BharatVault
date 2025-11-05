import React from "react";
import Education from "./Education";
import Pricing from "./Pricing";
import Stats from "./Stats";
import Awards from "./Awards";
import Hero from "./Hero";
import Navbar from "../Navbar";
import OpenAccount from "../OpenAccount";
import Footer from "../Footer";

function HomePage() {
  return (
    <>
      <Hero></Hero>
      <Awards></Awards>
      <Stats></Stats>
      <Pricing></Pricing>
      <Education></Education>
      <OpenAccount></OpenAccount>
    </>
  );
}

export default HomePage;
