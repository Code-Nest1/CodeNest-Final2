// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import ReactGA from "react-ga4"; // IMPORTS GOOGLE ANALYTICS LIBRARY

// --- Components ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/sections/ContactForm"; 

// --- Pages ---
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ServicesPage from "./pages/services/Services";

// --- SERVICE DETAIL PAGES ---
import WordPressSolutions from "./pages/services/service-details/WordPressSolutions";
import ShopifyEcommerce from "./pages/services/service-details/ShopifyEcommerce"; 
import CustomWebDevelopment from "./pages/services/service-details/CustomWebDevelopment";
import ReactNextDevelopment from "./pages/services/service-details/ReactNextDevelopment";
import UiUxImplementation from "./pages/services/service-details/UiUxImplementation";

// --- Portfolio Pages ---
import Portfolio from "./pages/portfolio/Portfolio";
import ProjectDetail from "./pages/portfolio/ProjectDetail"; 

// --- Blog Pages ---
import BlogListing from "./components/sections/Blog/index";      
import BlogPost from "./components/sections/Blog/BlogPost";      

// --- Sections ---
import Industries from "./components/sections/Industries";
import About from "./components/sections/AboutUs/index"; 

// 1. Initialize GA4 with your ID outside the component (Runs once)
ReactGA.initialize("G-NWL003NKPK");

const HomeScrollWrapper = () => {
  const { section } = useParams();
  return <Home scrollTo={section} />;
};

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Existing logic: Scroll to top on route change
    window.scrollTo(0, 0);
    
    // 2. Add On: Send Page View to Google Analytics on route change
    // We add 'window.location.search' to include URL parameters if needed
    ReactGA.send({ hitType: "pageview", page: pathname + window.location.search });
    
  }, [pathname]);

  // Hide Contact Form on detailed Project/Blog views to match Coax clean-style
  const hideContactForm = pathname.includes('/portfolio/') || pathname.includes('/blog/');

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/go/:section" element={<HomeScrollWrapper />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />
          
          {/* === SERVICE DETAIL ROUTES (All 5 connected) === */}
          <Route path="/services/wordpress-solutions" element={<WordPressSolutions />} />
          <Route path="/services/shopify-ecommerce" element={<ShopifyEcommerce />} />
          <Route path="/services/custom-web-development" element={<CustomWebDevelopment />} />
          <Route path="/services/react-next-development" element={<ReactNextDevelopment />} />
          <Route path="/services/ui-ux-implementation" element={<UiUxImplementation />} />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>

      {!hideContactForm && (
        <div id="contact-us">
          <ContactForm />
        </div>
      )}
      <Footer />
    </>
  );
};

export default App;