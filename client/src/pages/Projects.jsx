// src/pages/Projects.jsx
import React from "react";
import ProjectHero from "../components/Project/ProjectHero";
import FeaturedProjects from "../components/Project/FeaturedProjects";
import ProjectGrid from "../components/Home/ProjectGrid";
import BuildSection from "../components/Home/BuildSection";
import SectionReveal from "../components/common/SectionReveal";
import PageMeta from "../components/common/PageMeta";

const Projects = () => {
  return (
    <div className="text-white bg-[#050505]">
      <PageMeta
        title="Projects"
        description="Browse all projects by Richard Enoch — brand identity, UI/UX, graphic design, and web design."
        url="/projects"
      />
      <SectionReveal delay={0}>
        <ProjectHero />
      </SectionReveal>

      {/* The featured work is pulled up under the hero so the top of the first
          card is already on screen before a scroll — the section that carries
          the argument should not be something you have to go looking for. The
          auto-sliding image strip that used to sit here now lives on the rate
          card page, where a loop of work behind the pricing is doing a job. */}
      <SectionReveal delay={0.12}>
        <div className="relative z-10 -mt-16 sm:-mt-24 lg:-mt-32">
          <FeaturedProjects />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <ProjectGrid />
      </SectionReveal>

      <SectionReveal delay={0.25}>
        <BuildSection />
      </SectionReveal>
    </div>
  );
};

export default Projects;
