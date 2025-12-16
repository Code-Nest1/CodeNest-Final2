import React from "react";
import styled from "styled-components";

// --- Section Imports ---
import Hero from "../../components/sections/Hero";
import Services from "../../components/sections/Services";
// import CaseStudies from "../../components/sections/CaseStudies";
import ContactForm from "../../components/sections/ContactForm";
import Challenges from "../Challenges";
import Industries from "../../components/sections/Industries";
import About from "../../components/sections/AboutUs/index";
import TrustedPartners from "../../components/sections/TrustedPartners"; 
import ClientFeedback from "../../components/sections/ClientFeedback";
import BlogSection from '../../components/sections/Blog'; // Imported here

const Page = styled.main`
  overflow-x: hidden;
  width: 100%;
`;

// Wrapper for sections that need constrained width (like Services/Contact)
const SectionWrap = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

interface HomeProps {
  scrollTo?: string;
}

export default function Home({ scrollTo }: HomeProps) {
  
  // Logic to handle smooth scrolling to specific IDs
  React.useEffect(() => {
    if (!scrollTo) return;
    const el = document.getElementById(scrollTo);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTo]);

  return (
    <Page>

      {/* HERO SECTION */}
      <div id="hero">
        <Hero />
      </div>

      {/* SERVICES SECTION */}
      <SectionWrap id="services">
        <Services />
      </SectionWrap>

      {/* CHALLENGES */}
      <div id="challenges">
        <Challenges />
      </div>

      {/* INDUSTRIES */}
      <div id="industries">
        <Industries />
      </div>

      {/* ABOUT US SECTION */}
      <div id="about">
        <About />
      </div>

      {/* TRUSTED PARTNERS SECTION */}
      <div id="partners">
        <TrustedPartners />
      </div>

      {/* CLIENT FEEDBACK */}
      <div id="feedback">
        <ClientFeedback />
      </div>

      {/* ✅ BLOG SECTION (Added Here) */}
      <div id="blog">
        <BlogSection />
      </div>
      
      {/* CASE STUDIES
      <SectionWrap id="case-studies">
        <CaseStudies />
      </SectionWrap> */}

      {/* CONTACT FORM */}
      {/* <SectionWrap id="contact">
        <ContactForm />
      </SectionWrap> */}

    </Page>
  );
}