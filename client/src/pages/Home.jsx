// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Home/Hero";
import TwoDoors from "../components/Home/TwoDoors";
import PickACard from "../components/Home/PickACard";
import AboutMe from "../components/Home/AboutMe";
import Services from "../components/Home/Services";
import Partners from "../components/Home/Partners";
import DesignProcess from "../components/Home/DesignProcess";
import Testimonials from "../components/Home/Testimonials";
import FaqSection from "../components/Home/FaqSection";
import BuildSection from "../components/Home/BuildSection";
import WorkExp from "../components/Home/WorkExp";
import PageMeta from "../components/common/PageMeta";

const Home = () => {
  return (
    <div className="text-white bg-[#050505]">
      <PageMeta
        title="Home"
        description="Portfolio of Richard Enoch — brand identity and product designer. Six years in design, three in product, across fintech, publishing, interiors, professional bodies and construction technology."
        url="/"
      />
      <Hero />
      {/* The fork sits directly under the hero. A recruiter should not have to
          scroll past a service menu to find out there is a résumé. */}
      <TwoDoors />
      <PickACard />
      <AboutMe />
      <Partners />
      <Services />
      <WorkExp />
      <DesignProcess />
      {/* Testimonials are held back until real ones exist. See
          components/Home/Testimonials.jsx. */}
      <Testimonials />
      <FaqSection />
      <BuildSection />
    </div>
  );
};

export default Home;
