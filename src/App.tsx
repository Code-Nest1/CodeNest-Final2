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

// --- Blog Pages ---
import BlogListing from "./components/sections/Blog/index";      
import BlogPost from "./components/sections/Blog/BlogPost";      

// --- Sections ---
import Industries from "./components/sections/Industries";
import About from "./components/sections/AboutUs/index"; 

// --- Helper for v6/v7 Scroll Routing ---
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

  // Logic to hide the Global Contact Form on specific detail pages
  const hideContactForm = pathname.includes('/portfolio/') || pathname.includes('/blog/');

  return (
    <>
      {/* === TEST BANNER: REMOVE THIS AFTER VERIFICATION === */}
      <div style={{ backgroundColor: '#28a745', color: 'white', textAlign: 'center', padding: '10px', fontWeight: 'bold', position: 'sticky', top: 0, zIndex: 9999 }}>
        🚀 UPDATE SUCCESSFUL: LIVE FROM GITHUB!
      </div>
      {/* =================================================== */}

      <Header />

      {/* === PAGE CONTENT === */}
      <main>
        <Routes>
          {/* === MAIN HOME PAGE === */}
          <Route path="/" element={<Home />} />
          <Route path="/go/:section" element={<HomeScrollWrapper />} />

          {/* === SEPARATE PAGES === */}
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />
          
          {/* === PORTFOLIO ROUTES === */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />

          {/* === BLOG ROUTES === */}
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

        </Routes>
      </main>

      {/* === GLOBAL CONTACT FORM === */}
      {!hideContactForm && (
        <div id="contact-us">
          <ContactForm />
        </div>
      )}

      {/* === FOOTER === */}
      <Footer />
    </>
  );
};

export default App;