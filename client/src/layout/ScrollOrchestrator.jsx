import React from "react";
import SectionWrapper from "./SectionWrapper";
import Landingpage from "../components/LandingPage/Landingpage";
import About from "../components/About/About";

// You can add other components here
// import Projects from "../components/Projects/Projects";
// import Contact from "../components/Contact/Contact";

const ScrollOrchestrator = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      <div className="relative z-0">
        <SectionWrapper>
          <Landingpage />
        </SectionWrapper>
        <SectionWrapper>
          <About />
        </SectionWrapper>
        {/* 
        <SectionWrapper>
          <Projects />
        </SectionWrapper>
        <SectionWrapper>
          <Contact />
        </SectionWrapper> 
        */}
      </div>
    </div>
  );
};

export default ScrollOrchestrator;