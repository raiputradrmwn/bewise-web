import React from "react";
import Navbar from "../contents/Navbar";
import Hero from "../contents/Hero";
import HowItWorks from "../contents/HowItWorks";
import FAQ from "../contents/FAQ";
import Footer from "../contents/Footer";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks/>
      <FAQ/>
      <Footer/>
    </div>
  );
}
