// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";

// --- Components ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/sections/ContactForm"; 

// --- Pages ---
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ServicesPage from "./pages/Services";

// --- Portfolio Pages ---
import Portfolio from "./pages/portfolio/Portfolio";
import ProjectDetail from "./pages/portfolio/ProjectDetail"; 

// --- Sections ---
import Industries from "./components/sections/Industries";
import About from "./components/sections/AboutUs/index"; 

// --- Helper for v6 Scroll Routing ---
// This extracts the "section" param and passes it to Home
const HomeScrollWrapper = () => {
  const { section } = useParams();
  return <Home scrollTo={section} />;
};

const App: React.FC = () => {
  const { pathname } = useLocation();

  // ✅ Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />

      {/* === PAGE CONTENT === */}
      <main>
        <Routes>
          {/* === MAIN HOME PAGE === */}
          <Route path="/" element={<Home />} />

          {/* Home with Scroll Target (e.g., /go/services) */}
          <Route path="/go/:section" element={<HomeScrollWrapper />} />

          {/* === SEPARATE PAGES === */}
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />
          
          {/* ✅ PORTFOLIO ROUTES */}
          {/* 1. Main List of Projects */}
          <Route path="/portfolio" element={<Portfolio />} />
          
          {/* 2. Dynamic Project Details */}
          {/* This matches /portfolio/exclusive-car-finance, /portfolio/saas, etc. */}
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>

      {/* === GLOBAL CONTACT FORM === */}
      {/* 
         Note: If you don't want this form on the Project Detail page 
         (since it has its own footer), you can wrap this in a check like: 
         {!pathname.includes('/portfolio/') && <div id="contact-us"><ContactForm /></div>}
         Otherwise, leave it here for global visibility.
      */}
      <div id="contact-us">
        <ContactForm />
      </div>

      {/* === FOOTER === */}
      <Footer />
    </>
  );
};

export default App;