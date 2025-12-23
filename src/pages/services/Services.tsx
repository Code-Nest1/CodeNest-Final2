// src/pages/services/Services.tsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// --- Design Tokens (Code Nest Brand Palette) ---
const COLORS = {
  primary: "#2b945f",   // Light Green
  secondary: "#0c3740", // Dark Green (Text & BG accents)
  black: "#000000",
  white: "#feffff",
  textGrey: "#5a5a5a",
  bgRight: "#f4fcf8",   // Subtle minty white for Art Panels
  bgPage: "#feffff",
};

// --- ROUTING LOGIC ---
const getServiceRoute = (item: string) => {
  switch (item) {
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
    default: 
      return "#"; 
  }
};

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

// --- Abstract Art Components ---
const AbstractArt = ({ variant }: { variant: number }) => {
  return (
    <ArtContainer>
      {variant === 1 && (
        <svg viewBox="0 0 100 100">
          <circle cx="30" cy="50" r="30" fill={COLORS.secondary} />
          <circle cx="60" cy="40" r="30" fill={COLORS.primary} style={{ mixBlendMode: 'multiply' }} />
          <rect x="50" y="50" width="15" height="15" fill={COLORS.secondary} />
        </svg>
      )}
      {variant === 2 && (
        <svg viewBox="0 0 100 100">
          <path d="M20 20 V80 L50 50 Z" fill={COLORS.secondary} />
          <path d="M50 20 A 30 30 0 0 1 50 80 Z" fill={COLORS.primary} transform="translate(10, 0)" />
          <path d="M55 45 L65 50 L55 55 Z" fill={COLORS.secondary} />
        </svg>
      )}
      {variant === 3 && (
        <svg viewBox="0 0 100 100">
           <path d="M30 30 A 20 20 0 0 0 70 70" fill={COLORS.secondary} stroke={COLORS.secondary} strokeWidth="20" fillOpacity="0" />
           <circle cx="65" cy="65" r="25" fill={COLORS.primary} />
           <path d="M30 50 L70 50" stroke={COLORS.secondary} strokeWidth="5" />
        </svg>
      )}
      {variant === 4 && (
        <svg viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill={COLORS.secondary} rx="8" />
          <circle cx="50" cy="50" r="20" fill={COLORS.primary} />
        </svg>
      )}
      {variant === 5 && (
        <svg viewBox="0 0 100 100">
           <path d="M20 80 L50 30 L80 80 Z" fill={COLORS.secondary} />
           <circle cx="65" cy="65" r="25" fill={COLORS.primary} style={{ mixBlendMode: 'screen' }} />
        </svg>
      )}
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

export default function Services() {
  return (
    <PageWrapper>
      
      {/* --- HEADER --- */}
      <HeaderWrapper>
        <TopBadge>
          <span className="dot"></span> 6 main categories
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
          for their future. Code Nest designs, builds and creates the fundamental tools for success.
        </Subtitle>
      </HeaderWrapper>

      {/* --- GRID --- */}
      <Grid>
        {servicesData.map((service, index) => (
          <Card 
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* LEFT CONTENT */}
            <CardContent>
              <CategoryText>{service.category}</CategoryText>
              
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

            {/* RIGHT ART PANEL */}
            <CardVisual>
              <AbstractArt variant={service.artVariant} />
            </CardVisual>
          </Card>
        ))}
      </Grid>

    </PageWrapper>
  );
}

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  background-color: ${COLORS.bgPage};
  min-height: 100vh;
  /* Laptop Padding (Maintained) */
  padding: 140px 6% 100px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: ${COLORS.secondary};
  overflow-x: hidden;

  /* Mobile/Tablet Padding Adjustment */
  @media (max-width: 960px) {
    padding: 100px 5% 60px;
  }
  @media (max-width: 480px) {
    padding: 80px 20px 50px; /* Reduced for smaller phones */
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 120px;
  position: relative;
  max-width: 1440px;

  /* Mobile Spacing */
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

  /* Mobile tweak */
  @media (max-width: 480px) {
    margin-bottom: 24px;
    font-size: 10px;
    padding: 6px 12px;
  }
`;

const Title = styled(motion.h1)`
  /* Using clamp() so it's perfect on desktop AND mobile automatically */
  font-size: clamp(48px, 8vw, 110px);
  font-weight: 400; 
  letter-spacing: -3px;
  margin: 0 0 40px 0;
  color: ${COLORS.secondary}; 
  line-height: 1;

  /* Specific mobile override for extreme screens */
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
  
  /* Prevent width issues on mobile */
  @media (max-width: 600px) {
    width: 100%;
    font-size: 15px;
  }
`;

// --- GRID LAYOUT ---

const Grid = styled.div`
  display: grid;
  /* Laptop Grid (2 columns) */
  grid-template-columns: 1fr 1fr;
  column-gap: 30px;
  row-gap: 30px;
  max-width: 1440px;
  margin: 0 auto;

  /* Tablet: 2 columns is usually okay, but often 1 is better for cards this big */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr; /* Stack vertically on tablet/mobile */
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
  transition: transform 0.3s ease;

  &:hover {
     transform: translateY(-5px);
     box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  /* Mobile Stacking Logic */
  @media (max-width: 650px) {
    flex-direction: column; /* Content first, then Image */
    min-height: auto;
  }
`;

const CardContent = styled.div`
  flex: 1.3;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;

  /* Adaptive Padding for Smaller Screens */
  @media (max-width: 960px) {
    padding: 50px 40px;
  }
  @media (max-width: 480px) {
    padding: 30px 24px; /* Much tighter padding for phones */
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
    margin-bottom: 30px; /* Reduced margin */
  }
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  /* Tap targets for mobile */
  @media (max-width: 480px) {
    gap: 14px;
  }
`;

const Item = styled.a`
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
    transform: translateX(5px);
  }

  /* Responsive Font Sizes */
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px; 
    font-weight: 500; /* Slightly thicker for better reading on small screens */
  }
`;

const CardVisual = styled.div`
  flex: 0.7;
  background-color: ${COLORS.bgRight};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Laptop Dog-Ear Clip Path */
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% calc(100% - 60px), 
    calc(100% - 60px) 100%, 
    0 100%
  );

  /* Mobile Updates */
  @media (max-width: 650px) {
    min-height: 200px;
    height: 200px;
    clip-path: none; /* Remove clip path on mobile for clean footer look */
    border-top: 1px solid #f0f0f5; /* Subtle separator line */
  }
`;

const ArtContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    /* Fluid width with max constraint */
    width: 120px; 
    height: 120px;
    filter: drop-shadow(0px 10px 15px rgba(0,0,0,0.08));
    transition: transform 0.5s ease;
  }

  &:hover svg {
    transform: scale(1.05) rotate(3deg);
  }
  
  /* SVG scaling on small mobile */
  @media (max-width: 480px) {
    svg {
        width: 100px;
        height: 100px;
    }
  }
`;