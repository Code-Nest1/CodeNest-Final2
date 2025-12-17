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

// --- Blog Pages (New) ---
// Assuming you placed these in src/blog/ or src/pages/blog/
// Adjust path if your folder structure is different
import BlogListing from "./components/sections/Blog/index";      // The list of all blogs
import BlogPost from "./components/sections/Blog/BlogPost";      // The single blog detail page

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
  // (e.g., Blog Post already has a CTA inside it, so we hide the footer form)
  const hideContactForm = pathname.includes('/portfolio/') || pathname.includes('/blog/');

  return (
    <>
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

          {/* === BLOG ROUTES (New) === */}
          {/* 1. Main Blog Feed (The layout with Swiper and Leaders) */}
          <Route path="/blog" element={<BlogListing />} />
          
          {/* 2. Single Blog Post (The Coaxsoft replica) */}
          <Route path="/blog/:slug" element={<BlogPost />} />

        </Routes>
      </main>

      {/* === GLOBAL CONTACT FORM === */}
      {/* 
          We render this on most pages, but hide it on Detail pages 
          (Portfolio/Blog) if they have their own specific footer/CTA flow.
          Remove the check if you want the form on EVERY page.
      */}
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