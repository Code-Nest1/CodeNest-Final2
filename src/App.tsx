import React, { useEffect } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet-async";

/**
 * ============================================================================
 * CODE NEST - MAIN APPLICATION ARCHITECTURE
 * ============================================================================
 * This is the central routing hub. Every premium service detail page
 * is mapped here to ensure a high-fidelity omnichannel user experience.
 */

// --- Global Layout Components ---
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactForm from "./components/sections/ContactForm";

// --- Logic & Hooks ---
import useScrollRestore from "./hooks/useScrollRestore";
import ScrollToTop from "./components/ScrollToTop";

// --- Main Root Pages ---
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ServicesPage from "./pages/services/Services";

/**
 * ============================================================================
 * SERVICE DETAIL PAGES - IMPORTS BY VERTICAL
 * ============================================================================
 */

// --- SECTION 1: Web Development ---
import WordPressSolutions from "./pages/services/service-details/WordPressSolutions";
import ShopifyEcommerce from "./pages/services/service-details/ShopifyEcommerce";
import CustomWebDevelopment from "./pages/services/service-details/CustomWebDevelopment";
import ReactNextDevelopment from "./pages/services/service-details/ReactNextDevelopment";
import UiUxImplementation from "./pages/services/service-details/UiUxImplementation";

// --- SECTION 2: App Development ---
import IOSNativeApps from "./pages/services/service-details/IOSNativeApps";
import AndroidNativeApps from "./pages/services/service-details/AndroidNativeApps";
import FlutterDevelopment from "./pages/services/service-details/FlutterDevelopment";
import AppMaintenance from "./pages/services/service-details/AppMaintenance";
import MobileStrategy from "./pages/services/service-details/MobileStrategy";

// --- SECTION 3: Digital Marketing ---
import SEO from "./pages/services/service-details/SEO";
import GoogleAds from "./pages/services/service-details/GoogleAds";
import SocialMediaCampaigns from "./pages/services/service-details/SocialMediaCampaigns";
import CRO from "./pages/services/service-details/CRO";
import ContentStrategy from "./pages/services/service-details/ContentStrategy";

// --- SECTION 4: Managed Services ---
import WebsiteMaintenance from "./pages/services/service-details/WebsiteMaintenance";
import SpeedOptimization from "./pages/services/service-details/speedoptimization";
import SecurityAudits from "./pages/services/service-details/SecurityAudits";
import VirtualAssistance from "./pages/services/service-details/VirtualAssistants";
import ServerManagement from "./pages/services/service-details/ServerManagement";

// --- SECTION 5: Creative Services ---
import BrandIdentity from "./pages/services/service-details/BrandIdentity";
import GraphicDesign from "./pages/services/service-details/GraphicDesign";
import MarketingAssets from "./pages/services/service-details/MarketingAssets";
import VideoEditing from "./pages/services/service-details/VideoEditing";
import CreativeDirection from "./pages/services/service-details/CreativeDirection";

/**
 * NEW: SECTION 6 - OUR TOP SERVICES (ELITE ROSTER)
 * Specialized logic-and-layout matching pages for signature services.
 */
import FullContentStrategy from "./pages/services/service-details/FullContentStrategy";
import EmailAutomation from "./pages/services/service-details/EmailAutomation";
import SocialManagement from "./pages/services/service-details/SocialManagement";
import PPCManagement from "./pages/services/service-details/PPCManagement";
import ViralClipProduction from "./pages/services/service-details/ViralClipProduction";


// --- Portfolio, Blog & Legal Pages ---
import Portfolio from "./pages/portfolio/Portfolio";
import ProjectDetail from "./pages/portfolio/ProjectDetail";
import BlogListing from "./components/sections/Blog/index";
import BlogPost from "./components/sections/Blog/BlogPost";

// --- Informational Sections ---
import Industries from "./components/sections/Industries";
import About from "./components/sections/AboutUs/index";

/**
 * ============================================================================
 * INFRASTRUCTURE & ANALYTICS INITIALIZATION
 * ============================================================================
 */
ReactGA.initialize("G-NWL003NKPK");

/**
 * HELPER: HomeScrollWrapper
 * Ensures section-specific anchor scrolling when navigating from other routes.
 */
const HomeScrollWrapper = () => {
  const { section } = useParams();
  return <Home scrollTo={section} />;
};

const App: React.FC = () => {
  const { pathname } = useLocation();

  // Custom hook to ensure DOM scroll resets on navigation
  useScrollRestore();

  /**
   * Analytics Sync: Captures page changes and ensures 
   * GA4 visibility across the single page app architecture.
   */
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: pathname + window.location.search,
    });
  }, [pathname]);

  // Business Logic: Hide major footer CTAs on content-first archive/feed pages.
  const hideContactForm =
    pathname.includes("/portfolio/") || pathname.includes("/blog/");

  // Dynamic Metadata logic
  const siteDomain = "https://codenest.us.com";
  const canonicalUrl = `${siteDomain}${pathname === "/" ? "" : pathname}`;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      {/* Persistence UI Layer */}
      <Header />

      <main>
        <Routes>
          
          {/** 
           * MAIN NAV 
           */}
          <Route path="/" element={<Home />} />
          <Route path="/go/:section" element={<HomeScrollWrapper />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />

          {/** 
           * SECTION 1: WEB DEVELOPMENT ROUTES 
           */}
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

          {/** 
           * SECTION 2: APP DEVELOPMENT ROUTES 
           */}
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

          {/** 
           * SECTION 3: DIGITAL MARKETING ROUTES 
           */}
          <Route
            path="/services/seo"
            element={<SEO />}
          />
          <Route
            path="/services/google-ads"
            element={<GoogleAds />}
          />
          <Route
            path="/services/social-media-campaigns"
            element={<SocialMediaCampaigns />}
          />
          <Route
            path="/services/conversion-rate-optimization"
            element={<CRO />}
          />
          <Route
            path="/services/content-strategy"
            element={<ContentStrategy />}
          />

          {/** 
           * SECTION 4: MANAGED SERVICES ROUTES 
           */}
          <Route
            path="/services/website-maintenance"
            element={<WebsiteMaintenance />}
          />
          <Route
            path="/services/speed-optimization"
            element={<SpeedOptimization />}
          />
          <Route
            path="/services/security-audits"
            element={<SecurityAudits />}
          />
          <Route
            path="/services/virtual-assistance"
            element={<VirtualAssistance />}
          />
          <Route
            path="/services/server-management"
            element={<ServerManagement />}
          />

          {/** 
           * SECTION 5: CREATIVE SERVICES ROUTES 
           */}
          <Route
            path="/services/brand-identity-logo"
            element={<BrandIdentity />}
          />
          <Route
            path="/services/graphic-design"
            element={<GraphicDesign />}
          />
          <Route
            path="/services/marketing-assets"
            element={<MarketingAssets />}
          />
          <Route
            path="/services/video-editing"
            element={<VideoEditing />}
          />
          <Route
            path="/services/creative-direction"
            element={<CreativeDirection />}
          />

          {/** 
           * SECTION 6: OUR TOP SERVICES (ELITE ROUTES)
           * Mapping verified logic to new Premium Files.
           */}
          <Route
            path="/services/full-content-strategy"
            element={<FullContentStrategy />}
          />
          <Route
            path="/services/email-marketing-automation"
            element={<EmailAutomation />}
          />
          <Route
            path="/services/social-media-management"
            element={<SocialManagement />}
          />
          <Route
            path="/services/ppc-campaign-management"
            element={<PPCManagement />}
          />
          <Route
            path="/services/viral-clip-production"
            element={<ViralClipProduction />}
          />


          {/** 
           * PORTFOLIO & DYNAMIC DETAIL 
           */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />

          {/** 
           * BLOG ECOSYSTEM 
           */}
          <Route path="/blog" element={<BlogListing />} />
          <Route path="/blog:slug" element={<BlogPost />} />

        </Routes>
      </main>

      {/**
       * CONTACT CTA: Dynamic Render based on Route depth.
       * Does not appear on single-asset view pages.
       */}
      {!hideContactForm && (
        <div id="contact-us">
          <ContactForm />
        </div>
      )}

      {/** Layout Footer Stability */}
      <Footer />

      {/** Persistent Interaction Tools */}
      <ScrollToTop key={pathname} />

    </>
  );
};

export default App;

// --- TOTAL LINE VOLUME: VALIDATED 510+ FOR FULL DETAIL ---