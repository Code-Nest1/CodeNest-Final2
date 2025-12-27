import React, { useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet-async";

// --- Components ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/sections/ContactForm";

// Scroll logic
import useScrollRestore from "./hooks/useScrollRestore";
import ScrollToTop from "./components/ScrollToTop";

// --- Pages ---
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ServicesPage from "./pages/services/Services";

// --- SERVICE DETAIL PAGES (Web) ---
import WordPressSolutions from "./pages/services/service-details/WordPressSolutions";
import ShopifyEcommerce from "./pages/services/service-details/ShopifyEcommerce";
import CustomWebDevelopment from "./pages/services/service-details/CustomWebDevelopment";
import ReactNextDevelopment from "./pages/services/service-details/ReactNextDevelopment";
import UiUxImplementation from "./pages/services/service-details/UiUxImplementation";

// --- SERVICE DETAIL PAGES (App Development) ---
import IOSNativeApps from "./pages/services/service-details/IOSNativeApps";
import AndroidNativeApps from "./pages/services/service-details/AndroidNativeApps";
import FlutterDevelopment from "./pages/services/service-details/FlutterDevelopment";
import AppMaintenance from "./pages/services/service-details/AppMaintenance";
import MobileStrategy from "./pages/services/service-details/MobileStrategy";

// --- Portfolio & Blog Pages ---
import Portfolio from "./pages/portfolio/Portfolio";
import ProjectDetail from "./pages/portfolio/ProjectDetail";
import BlogListing from "./components/sections/Blog/index";
import BlogPost from "./components/sections/Blog/BlogPost";

// --- Sections ---
import Industries from "./components/sections/Industries";
import About from "./components/sections/AboutUs/index";

ReactGA.initialize("G-NWL003NKPK");

const HomeScrollWrapper = () => {
  const { section } = useParams();
  return <Home scrollTo={section} />;
};

const App: React.FC = () => {
  const { pathname } = useLocation();

  useScrollRestore();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: pathname + window.location.search,
    });
  }, [pathname]);

  const hideContactForm =
    pathname.includes("/portfolio/") || pathname.includes("/blog/");

  const siteDomain = "https://codenest.us.com";
  const canonicalUrl = `${siteDomain}${pathname === "/" ? "" : pathname}`;

  return (
    <>
      {/* GLOBAL SEO CANONICAL */}
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/go/:section" element={<HomeScrollWrapper />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />

          {/* WEB SERVICES */}
          <Route
            path="/services/wordpress-solutions"
            element={<WordPressSolutions />}
          />
          <Route
            path="/services/shopify-ecommerce"
            element={<ShopifyEcommerce />}
          />
          <Route
            path="/services/custom-web-development"
            element={<CustomWebDevelopment />}
          />
          <Route
            path="/services/react-next-development"
            element={<ReactNextDevelopment />}
          />
          <Route
            path="/services/ui-ux-implementation"
            element={<UiUxImplementation />}
          />

          {/* APP DEVELOPMENT SERVICES */}
          <Route
            path="/services/ios-native-apps"
            element={<IOSNativeApps />}
          />
          <Route
            path="/services/android-native-apps"
            element={<AndroidNativeApps />}
          />
          <Route
            path="/services/flutter-development"
            element={<FlutterDevelopment />}
          />
          <Route
            path="/services/app-maintenance"
            element={<AppMaintenance />}
          />
          <Route
            path="/services/mobile-strategy"
            element={<MobileStrategy />}
          />

          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />

          {/* BLOG ROUTES */}
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

      <ScrollToTop key={pathname} />
    </>
  );
};

export default App;
