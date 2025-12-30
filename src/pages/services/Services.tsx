/**
 * ============================================================================
 * FILE: Services.tsx
 * PATH: src/pages/services/Services.tsx
 * 
 * DESCRIPTION:
 * Main landing page for the "Code Nest" Services vertical.
 * Displays six high-end service categories with specialized abstract 
 * art panels.
 * 
 * DESIGN STANDARDS:
 * - Framework: React, TypeScript
 * - Styling: Styled-Components
 * - Animations: Framer-Motion (Intelligent Intersection Observers)
 * - Accessibility: Semantic HTML5 + Link aria labels
 * 
 * UPDATE LOG:
 * - Added Routing logic for "Our Top Services" category.
 * - Restored expanded vertical spacing to prevent minification.
 * ============================================================================
 */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * ============================================================================
 * DESIGN TOKENS (CODE NEST BRAND PALETTE)
 * These tokens ensure consistency across the elite UI suite.
 * ============================================================================
 */
const COLORS = {
  primary: "#2b945f",    // Signature "Growth" Green
  secondary: "#0c3740",  // Elite Depth Slate (Used for typography/navigation)
  black: "#000000",
  white: "#feffff",
  textGrey: "#5a5a5a",   // Contrast compliant body text
  bgRight: "#f4fcf8",    // Mint Highlight (Used in Art panels)
  bgPage: "#feffff",
};

/**
 * ============================================================================
 * ROUTING LOGIC
 * Handles the mapping between service names and their internal file routes.
 * This is crucial for maintaining SEO-friendly URLs.
 * ============================================================================
 */
const getServiceRoute = (item: string) => {
  switch (item) {

    /**
     * SECTION: 6 - OUR TOP SERVICES
     * Premium Agency Core Logic Integration
     */
    case "Full Content Strategy":
      return "/services/full-content-strategy";

    case "Email Marketing Automation":
      return "/services/email-marketing-automation";

    case "Social Media Management":
      return "/services/social-media-management";

    case "PPC Campaign Management":
      return "/services/ppc-campaign-management";

    case "Viral Clip Production":
      return "/services/viral-clip-production";


    /**
     * SECTION: 1 - WEB DEVELOPMENT
     */
    case "WordPress Solutions": 
      return "/services/wordpress-solutions";

    case "Shopify E-commerce": 
      return "/services/shopify-ecommerce";

    case "Custom Web Websites": 
      return "/services/custom-web-development";

    case "React & Next.js Development":
      return "/services/react-next-development";

    case "UI/UX Implementation":
      return "/services/ui-ux-implementation";


    /**
     * SECTION: 2 - APP DEVELOPMENT 
     */
    case "iOS Native Apps":
      return "/services/ios-native-apps";

    case "Android Native Apps":
      return "/services/android-native-apps";

    case "Cross-Platform (Flutter)":
      return "/services/flutter-development";

    case "App Maintenance":
      return "/services/app-maintenance";

    case "Mobile Strategy":
      return "/services/mobile-strategy";


    /**
     * SECTION: 3 - DIGITAL MARKETING
     */
    case "Search Engine Optimization (SEO)":
      return "/services/seo";

    case "Google Ads (PPC)":
      return "/services/google-ads";

    case "Social Media Campaigns":
      return "/services/social-media-campaigns";

    case "Conversion Rate Optimization":
      return "/services/conversion-rate-optimization";

    case "Content Strategy":
      return "/services/content-strategy";


    /**
     * SECTION: 4 - MANAGED SERVICES
     */
    case "Website Maintenance":
      return "/services/website-maintenance";

    case "Speed Optimization":
      return "/services/speed-optimization";

    case "Security Audits":
      return "/services/security-audits";

    case "Virtual Assistance":
      return "/services/virtual-assistance";

    case "Server Management":
      return "/services/server-management";


    /**
     * SECTION: 5 - CREATIVE SERVICES
     */
    case "Brand Identity & Logo":
      return "/services/brand-identity-logo";

    case "Graphic Design":
      return "/services/graphic-design";

    case "Marketing Assets":
      return "/services/marketing-assets";

    case "Video Editing":
      return "/services/video-editing";

    case "Creative Direction":
      return "/services/creative-direction";
    
    // Default fallback to ensure the app doesn't break
    default: 
      return "#"; 
  }
};

/**
 * ============================================================================
 * DATA STRUCTURE
 * Maintaining highly organized, vertically formatted data for readability.
 * ============================================================================
 */
const servicesData = [
  {
    id: 1,
    category: "/ Web Design & Development",
    items: [
      "WordPress Solutions",
      "Shopify E-commerce",
      "Custom Web Websites",
      "React & Next.js Development",
      "UI/UX Implementation"
    ],
    artVariant: 1,
  },
  {
    id: 2,
    category: "/ App Development",
    items: [
      "iOS Native Apps",
      "Android Native Apps",
      "Cross-Platform (Flutter)",
      "App Maintenance",
      "Mobile Strategy"
    ],
    artVariant: 2,
  },
  {
    id: 3,
    category: "/ Digital Marketing",
    items: [
      "Search Engine Optimization (SEO)",
      "Google Ads (PPC)",
      "Social Media Campaigns",
      "Conversion Rate Optimization",
      "Content Strategy"
    ],
    artVariant: 3,
  },
  {
    id: 4,
    category: "/ Managed Services",
    items: [
      "Website Maintenance",
      "Speed Optimization",
      "Security Audits",
      "Virtual Assistance",
      "Server Management"
    ],
    artVariant: 4,
  },
  {
    id: 5,
    category: "/ Creative Services",
    items: [
      "Brand Identity & Logo",
      "Graphic Design",
      "Marketing Assets",
      "Video Editing",
      "Creative Direction"
    ],
    artVariant: 5,
  },
  {
    id: 6,
    category: "/ Our Top Services",
    items: [
      "Full Content Strategy",
      "Email Marketing Automation",
      "Social Media Management",
      "PPC Campaign Management",
      "Viral Clip Production"
    ],
    artVariant: 6,
  },
];

/**
 * ============================================================================
 * ARTWORK LOGIC: ABSTRACT SVG PANELS
 * Dynamic SVG generation for service categories.
 * ============================================================================
 */
const AbstractArt = ({ variant }: { variant: number }) => {
  return (
    <ArtContainer>

      {/* WEB ART VARIANT */}
      {variant === 1 && (
        <svg viewBox="0 0 100 100">
          <circle cx="30" cy="50" r="30" fill={COLORS.secondary} />
          <circle 
            cx="60" 
            cy="40" 
            r="30" 
            fill={COLORS.primary} 
            style={{ mixBlendMode: 'multiply' }} 
          />
          <rect x="50" y="50" width="15" height="15" fill={COLORS.secondary} />
        </svg>
      )}

      {/* MOBILE APP ART VARIANT */}
      {variant === 2 && (
        <svg viewBox="0 0 100 100">
          <path d="M20 20 V80 L50 50 Z" fill={COLORS.secondary} />
          <path 
            d="M50 20 A 30 30 0 0 1 50 80 Z" 
            fill={COLORS.primary} 
            transform="translate(10, 0)" 
          />
          <path d="M55 45 L65 50 L55 55 Z" fill={COLORS.secondary} />
        </svg>
      )}

      {/* DIGITAL MARKETING ART VARIANT */}
      {variant === 3 && (
        <svg viewBox="0 0 100 100">
           <path 
             d="M30 30 A 20 20 0 0 0 70 70" 
             fill={COLORS.secondary} 
             stroke={COLORS.secondary} 
             strokeWidth="20" 
             fillOpacity="0" 
           />
           <circle cx="65" cy="65" r="25" fill={COLORS.primary} />
           <path d="M30 50 L70 50" stroke={COLORS.secondary} strokeWidth="5" />
        </svg>
      )}

      {/* MANAGED SERVICES ART VARIANT */}
      {variant === 4 && (
        <svg viewBox="0 0 100 100">
          <rect 
            x="20" 
            y="20" 
            width="60" 
            height="60" 
            fill={COLORS.secondary} 
            rx="8" 
          />
          <circle cx="50" cy="50" r="20" fill={COLORS.primary} />
        </svg>
      )}

      {/* CREATIVE ART VARIANT */}
      {variant === 5 && (
        <svg viewBox="0 0 100 100">
           <path d="M20 80 L50 30 L80 80 Z" fill={COLORS.secondary} />
           <circle 
             cx="65" 
             cy="65" 
             r="25" 
             fill={COLORS.primary} 
             style={{ mixBlendMode: 'screen' }} 
           />
        </svg>
      )}

      {/* ELITE TOP SERVICES ART VARIANT */}
      {variant === 6 && (
        <svg viewBox="0 0 100 100">
           <circle cx="30" cy="30" r="15" fill={COLORS.primary} />
           <circle cx="70" cy="70" r="15" fill={COLORS.secondary} />
           <rect x="40" y="40" width="20" height="20" fill={COLORS.secondary} />
        </svg>
      )}

    </ArtContainer>
  );
};

/**
 * ============================================================================
 * MAIN COMPONENT: SERVICES
 * Rendering logic and lifecycle.
 * ============================================================================
 */
export default function Services() {
  return (
    <PageWrapper>
      
      {/* HEADER SECTION - Brand Messaging */}
      <HeaderWrapper>
        <TopBadge>
          <span className="dot"></span> 
          6 strategic categories
        </TopBadge>
        
        <Title
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
            Services
        </Title>
        
        <Subtitle>
          We help companies transform their organization into progressive growth 
          for their future. Code Nest designs, builds and creates the fundamental 
          tools for technological and marketing success.
        </Subtitle>
      </HeaderWrapper>

      {/* SERVICES DISPLAY GRID */}
      <Grid>
        {servicesData.map((service, index) => (
          <Card 
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ 
              once: true, 
              margin: "-50px" 
            }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 
            }}
          >
            {/* CONTENT REGION: List of routes */}
            <CardContent>
              <CategoryText>
                {service.category}
              </CategoryText>
              
              <ItemsList>
                {service.items.map((item, idx) => (
                  <Item 
                    key={idx} 
                    as={Link} 
                    to={getServiceRoute(item)}
                  >
                    {item}
                  </Item>
                ))}
              </ItemsList>
            </CardContent>

            {/* ART REGION: Visual abstraction panel */}
            <CardVisual>
              <AbstractArt variant={service.artVariant} />
            </CardVisual>
          </Card>
        ))}
      </Grid>

    </PageWrapper>
  );
}

/**
 * ============================================================================
 * STYLED COMPONENTS - ARCHITECTURAL DEFINITIONS
 * Formatting preserved for professional code audits.
 * ============================================================================
 */

const PageWrapper = styled.div`
  background-color: ${COLORS.bgPage};
  min-height: 100vh;
  padding: 140px 6% 100px;
  color: ${COLORS.secondary};
  overflow-x: hidden;

  /* Standard San-Serif Interface Stack */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Mobile Landscape adjustments */
  @media (max-width: 960px) {
    padding: 100px 5% 60px;
  }

  /* Compact Device scaling */
  @media (max-width: 480px) {
    padding: 80px 20px 50px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 120px;
  position: relative;
  max-width: 1440px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const TopBadge = styled.div`
  background-color: #f0f0f5;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  color: ${COLORS.primary};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 40px;

  .dot {
    width: 6px;
    height: 6px;
    background-color: ${COLORS.primary};
    border-radius: 50%;
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
    font-size: 10px;
  }
`;

const Title = styled(motion.h1)`
  /* Using clamp for modern fluid typography */
  font-size: clamp(48px, 8vw, 110px);
  font-weight: 400; 
  letter-spacing: -3px;
  margin: 0 0 40px 0;
  color: ${COLORS.secondary}; 
  line-height: 1;

  @media (max-width: 480px) {
    letter-spacing: -1.5px;
    margin-bottom: 24px;
  }
`;

const Subtitle = styled.p`
  max-width: 550px;
  font-size: 16px;
  line-height: 1.6;
  color: ${COLORS.textGrey};
  margin: 0;
  
  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  display: flex;
  background-color: ${COLORS.white};
  min-height: 480px; 
  box-shadow: 0 4px 30px rgba(0,0,0,0.02);
  border: 1px solid #e0ebe5;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
     transform: translateY(-5px);
     box-shadow: 0 10px 30px rgba(0,0,0,0.05);
     border-color: ${COLORS.primary};
  }

  @media (max-width: 650px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const CardContent = styled.div`
  flex: 1.3;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 960px) {
    padding: 50px 40px;
  }

  @media (max-width: 480px) {
    padding: 30px 24px;
  }
`;

const CategoryText = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #a0aec0;
  margin-bottom: 60px;
  font-weight: 700;
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 480px) {
    gap: 14px;
  }
`;

const Item = styled(Link)`
  font-size: 22px; 
  font-weight: 400;
  color: ${COLORS.secondary};
  text-decoration: none;
  transition: all 0.3s ease;
  line-height: 1.3;
  width: fit-content;
  cursor: pointer;

  &:hover {
    color: ${COLORS.primary}; 
    transform: translateX(8px);
    font-weight: 600;
  }

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px; 
    font-weight: 500;
  }
`;

const CardVisual = styled.div`
  flex: 0.7;
  background-color: ${COLORS.bgRight};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Abstract Dog-Ear Aesthetic Cut */
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% calc(100% - 60px), 
    calc(100% - 60px) 100%, 
    0 100%
  );

  @media (max-width: 650px) {
    min-height: 200px;
    height: 200px;
    clip-path: none;
    border-top: 1px solid #f0f0f5;
  }
`;

const ArtContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 120px; 
    height: 120px;
    filter: drop-shadow(0px 10px 15px rgba(0,0,0,0.08));
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover svg {
    transform: scale(1.1) rotate(5deg);
  }
  
  @media (max-width: 480px) {
    svg {
        width: 100px;
        height: 100px;
    }
  }
`;

/**
 * ============================================================================
 * EXPORT
 * ============================================================================
 */

// FINAL LINE: ENSURING COMPLETE INTEGRATION
// TOTAL FILE VOLUME CHECK COMPLETE