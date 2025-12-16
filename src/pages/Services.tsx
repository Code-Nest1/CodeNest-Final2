import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// --- Colors & Variables ---
const COLORS = {
  black: "#0a343d",
  textDark: "#111111",
  textGrey: "#555555",
  textLight: "#888888",
  bgRight: "#f0f2f8", // The exact light blue-grey for the right panel
  white: "#ffffff",
  blueAccent: "#28a665",
  limeAccent: "#0a343d",
  bgPage: "#fcfcfc",
};

// --- Data: Code Nest Services Mapped to Design ---
const servicesData = [
  {
    id: 1,
    category: "/Web Design & Development",
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
    category: "/App Development",
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
    category: "/Digital Marketing",
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
    category: "/Managed Services",
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
    category: "/Creative Services",
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
    category: "/Our Top Services",
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

// --- Geometric Art Components ---
// These replicate the abstract shapes in the screenshot using SVG
const AbstractArt = ({ variant }: { variant: number }) => {
  return (
    <ArtContainer>
      {variant === 1 && (
        <svg viewBox="0 0 100 100" width="120" height="120">
          <circle cx="30" cy="50" r="30" fill={COLORS.black} />
          <circle cx="60" cy="40" r="30" fill={COLORS.blueAccent} style={{ mixBlendMode: 'multiply' }} />
          <rect x="50" y="50" width="15" height="15" fill={COLORS.limeAccent} />
        </svg>
      )}
      {variant === 2 && (
        <svg viewBox="0 0 100 100" width="120" height="120">
          <path d="M20 20 V80 L50 50 Z" fill={COLORS.black} />
          <path d="M50 20 A 30 30 0 0 1 50 80 Z" fill={COLORS.blueAccent} transform="translate(10, 0)" />
          <path d="M55 45 L65 50 L55 55 Z" fill={COLORS.limeAccent} />
        </svg>
      )}
      {variant === 3 && (
        <svg viewBox="0 0 100 100" width="120" height="120">
           <path d="M30 30 A 20 20 0 0 0 70 70" fill={COLORS.black} stroke={COLORS.black} strokeWidth="20" />
           <circle cx="65" cy="65" r="25" fill={COLORS.blueAccent} />
           <circle cx="35" cy="65" r="25" fill={COLORS.blueAccent} />
           <path d="M30 50 L70 50" stroke={COLORS.limeAccent} strokeWidth="5" />
        </svg>
      )}
      {variant === 4 && (
        <svg viewBox="0 0 100 100" width="120" height="120">
          <circle cx="50" cy="50" r="40" fill={COLORS.bgRight} /> {/* Mask */}
          <path d="M50 10 L90 50 L50 90 L10 50 Z" fill={COLORS.black} transform="scale(0.8) translate(12,12)" />
          <circle cx="70" cy="70" r="20" fill={COLORS.blueAccent} />
        </svg>
      )}
      {variant === 5 && (
        <svg viewBox="0 0 100 100" width="120" height="120">
           <path d="M20 80 L50 30 L80 80 Z" fill={COLORS.black} style={{borderRadius: 20}} />
           <circle cx="65" cy="65" r="25" fill={COLORS.blueAccent} style={{ mixBlendMode: 'screen' }} />
        </svg>
      )}
      {variant === 6 && (
        <svg viewBox="0 0 100 100" width="120" height="120">
           <circle cx="30" cy="30" r="15" fill={COLORS.blueAccent} />
           <circle cx="70" cy="30" r="15" fill={COLORS.black} />
           <circle cx="30" cy="70" r="15" fill={COLORS.blueAccent} />
           <circle cx="70" cy="70" r="15" fill={COLORS.black} />
           <circle cx="70" cy="70" r="6" fill={COLORS.limeAccent} />
        </svg>
      )}
    </ArtContainer>
  );
};

// --- Page Component ---

export default function Services() {
  return (
    <PageWrapper>
      
      {/* --- HEADER --- */}
      <HeaderWrapper>
        <TopBadge>
          <span className="dot"></span> 6 main categories
        </TopBadge>
        
        <Title>Services</Title>
        
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* LEFT CONTENT */}
            <CardContent>
              <CategoryText>{service.category}</CategoryText>
              
              <ItemsList>
                {service.items.map((item, idx) => (
                  <Item key={idx}>{item}</Item>
                ))}
              </ItemsList>
            </CardContent>

            {/* RIGHT ART */}
            <CardVisual>
              <AbstractArt variant={service.artVariant} />
              {/* This pseudo-element creates the white fold if needed, but clip-path handles the cut */}
            </CardVisual>
          </Card>
        ))}
      </Grid>

    </PageWrapper>
  );
}

// --- STYLES ---

const PageWrapper = styled.div`
  background-color: ${COLORS.bgPage};
  min-height: 100vh;
  padding: 100px 40px;
  font-family: 'Inter', sans-serif;
  color: ${COLORS.textDark};

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 120px;
  position: relative;
`;

const TopBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f0f0f5;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: ${COLORS.blueAccent};
  display: flex;
  align-items: center;
  gap: 6px;

  .dot {
    width: 4px;
    height: 4px;
    background-color: ${COLORS.blueAccent};
    border-radius: 50%;
  }

  @media (max-width: 900px) {
    position: relative;
    margin-bottom: 20px;
    align-self: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 400; /* Thin look like screenshot */
  letter-spacing: -2px;
  margin: 0 0 30px 0;
  color: ${COLORS.textDark};

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const Subtitle = styled.p`
  max-width: 500px;
  font-size: 14px;
  line-height: 1.6;
  color: #888;
  margin: 0;
`;

// --- GRID LAYOUT ---

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 40px;
  row-gap: 40px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  display: flex;
  background-color: ${COLORS.white};
  min-height: 420px; /* Fixed height for consistency */
  box-shadow: 0 0 0 1px #eee; /* Subtle border */
  
  @media (max-width: 600px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const CardContent = styled.div`
  flex: 1.2;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryText = styled.div`
  font-size: 13px;
  color: #9ca3af; /* Light grey */
  margin-bottom: 40px;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  font-size: 20px; /* Larger text for list */
  font-weight: 400;
  color: ${COLORS.textDark};
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1.4;

  &:hover {
    color: ${COLORS.blueAccent};
  }
`;

const CardVisual = styled.div`
  flex: 0.8;
  background-color: ${COLORS.bgRight};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  /* THE DOG-EAR FOLD EFFECT */
  clip-path: polygon(
    0 0, 
    100% 0, 
    100% calc(100% - 50px), 
    calc(100% - 50px) 100%, 
    0 100%
  );

  /* Optional: If you want the white triangle overlay visual like a real paper fold */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%);
    pointer-events: none;
  }

  @media (max-width: 600px) {
    min-height: 200px;
    clip-path: none;
  }
`;

const ArtContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    filter: drop-shadow(0px 10px 20px rgba(0,0,0,0.05));
  }
`;