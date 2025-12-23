"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "react-feather";

// --- Data Configuration ---
const industries = [
  {
    id: "automotive",
    name: "Automotive",
    projectTitle: "Exclusive Car Finance",
    desc: "We engineered a high-speed platform for Exclusive Car Finance, featuring a custom Next.js architecture and an advanced rate calculator that increased lead capture by 40%.",
    color: "#a3e040",
    buttonColor: "#1a2ec0",
    brandName: "DRIVE",
    images: ["/images/auto-finance.png"],
  },
  {
    id: "saas",
    name: "SaaS",
    projectTitle: "Intuit Interactive",
    desc: "For Intuit, we performed a system-wide upgrade and feature enhancement. The new cloud architecture supports high-resolution media processing with AI integration.",
    color: "#2ed573",
    buttonColor: "#2f3542",
    brandName: "ALBUM",
    images: ["/images/saas-album.png"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    projectTitle: "Texas Autism Project",
    desc: "A full WordPress redesign focused on WCAG 2.1 accessibility. We created a calming, easy-to-navigate user interface specifically designed for families seeking care.",
    color: "#00c2cb",
    buttonColor: "#008a91",
    brandName: "CARE",
    images: ["/images/autism-health.png"],
  },
  {
    id: "fintech",
    name: "FinTech",
    projectTitle: "Choice Alliance",
    desc: "We rebuilt the Choice Alliance platform with bank-grade security protocols. The result is a high-performance investment portal with optimized core web vitals.",
    color: "#eb5757",
    buttonColor: "#b33939",
    brandName: "SECURE",
    images: ["/images/finance-shield.png"],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    projectTitle: "Velour Fashion",
    desc: "A headless Shopify solution built with Hydrogen. This lightning-fast storefront offers a seamless checkout experience that boosted conversion rates significantly.",
    color: "#ffbb00",
    buttonColor: "#e67e22",
    brandName: "STYLE",
    images: ["/images/fashion-shop.png"],
  },
  {
    id: "realestate",
    name: "Real Estate",
    projectTitle: "Urban Key",
    desc: "We developed an interactive map-based search tool with real-time MLS synchronization, allowing users to find properties faster and more accurately.",
    color: "#9b51e0",
    buttonColor: "#8e44ad",
    brandName: "ESTATE",
    images: ["/images/real-estate.png"],
  },
  {
    id: "logistics",
    name: "Logistics",
    projectTitle: "FleetTrack Pro",
    desc: "An AI-driven route optimization dashboard. This SaaS platform helps logistics companies reduce fuel costs and improve delivery times through smart tracking.",
    color: "#2f80ed",
    buttonColor: "#1e3799",
    brandName: "MOVE",
    images: ["/images/logistics-fleet.png"],
  },
  {
    id: "edtech",
    name: "EdTech",
    projectTitle: "BrightMind",
    desc: "An interactive Learning Management System (LMS) featuring video streaming integration and gamified progress tracking to keep students engaged.",
    color: "#f2994a",
    buttonColor: "#d35400",
    brandName: "LEARN",
    images: ["/images/edtech-lms.png"],
  },
];

export default function Industries() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Auto-pause interval if user interacts manually (optional logic optimization)
  const [isPaused, setIsPaused] = useState(false);
  const current = industries[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % industries.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + industries.length) % industries.length);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      next();
    }, 5000); // Increased slightly for readability
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  return (
    <SectionWrapper
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <MainContainer>
        <HeaderSection>
          <MainHeading>Industries we serve</MainHeading>
          <SubHeading>
            Code Nest Software applies industry-specific knowledge to each
            product design and development project.
          </SubHeading>
        </HeaderSection>

        <ContentLayout>
          {/* LEFT PANEL */}
          <LeftPanel>
            <TopContent>
              <CardHeader>
                <TitleWrapper>
                  <IconBox style={{ backgroundColor: current.color }}>
                    {/* SVG Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                      <path d="M2 17L12 22L22 17" fill="white" opacity="0.6" />
                      <path d="M2 12L12 17L22 12" fill="white" opacity="0.8" />
                    </svg>
                  </IconBox>
                  <IndustryTitle>{current.name}</IndustryTitle>
                </TitleWrapper>

                <NavControls>
                  <NavButton onClick={prev} aria-label="Previous Industry">
                    <ChevronLeft size={20} />
                  </NavButton>
                  <NavButton onClick={next} aria-label="Next Industry">
                    <ChevronRight size={20} />
                  </NavButton>
                </NavControls>
              </CardHeader>

              <AnimatePresence mode="wait">
                <TextWrapper
                  key={current.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Description>{current.desc}</Description>
                  <StyledButton
                    $color={current.buttonColor}
                    $iconColor={current.color}
                  >
                    <span className="text">View case study</span>
                    <span className="icon-box">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M21 12l-18 12v-24z" />
                      </svg>
                    </span>
                  </StyledButton>
                </TextWrapper>
              </AnimatePresence>
            </TopContent>

            <BottomContent>
              <ListLabel>SELECT INDUSTRY</ListLabel>
              <MenuUl>
                {industries.map((item, idx) => (
                  <MenuLi
                    key={item.id}
                    $active={idx === currentIndex}
                    $activeColor={item.buttonColor}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsPaused(true); // Pause on manual click
                    }}
                  >
                    {item.name}
                  </MenuLi>
                ))}
              </MenuUl>
            </BottomContent>
          </LeftPanel>

          {/* RIGHT PANEL */}
          <RightPanel>
            <BrandWatermark>{current.brandName}</BrandWatermark>
            <AnimatePresence mode="wait">
              <ShowcaseContainer
                key={current.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ImageWrapper>
                  {current.images.map((src, i) => (
                    <StyledImg
                      key={i}
                      src={src}
                      alt={`${current.name} Project Mockup`}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x800/ebebed/333?text=" +
                          current.name;
                      }}
                    />
                  ))}
                </ImageWrapper>
              </ShowcaseContainer>
            </AnimatePresence>
          </RightPanel>
        </ContentLayout>
      </MainContainer>
    </SectionWrapper>
  );
}

// --- STYLED COMPONENTS ---

const SectionWrapper = styled.section`
  width: 100%;
  padding: 100px 0;
  background-color: #f9f9fb;
  overflow: hidden;

  /* Responsive Padding */
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const MainContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    text-align: left; /* Easier reading on mobile */
  }
`;

const MainHeading = styled.h2`
  /* Clamp ensures scaling: min 32px, max 56px based on view width */
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 600;
  color: #222;
  margin-bottom: 16px;
  letter-spacing: -1px;
  line-height: 1.1;
`;

const SubHeading = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: clamp(15px, 2vw, 17px);
  line-height: 1.6;
  color: #666;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Default Laptop Grid */
  gap: 0;
  min-height: 600px; /* Use Min-height, not Fixed height */
  background: #fff;
  border-radius: 4px; /* subtle finish */
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  /* Mobile/Tablet Stack */
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column-reverse; /* Puts content BELOW image for "app-like" feel, or 'column' to text first */
    min-height: auto;
  }
`;

// --- LEFT PANEL STYLES ---

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px;
  background: #ffffff;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    padding: 30px;
    /* ensure panel stretches */
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const TopContent = styled.div`
  width: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const IndustryTitle = styled.h3`
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 600;
  color: #222;
  margin: 0;
`;

const NavControls = styled.div`
  display: flex;
  gap: 8px;
`;

const NavButton = styled.button`
  width: 44px;
  height: 44px;
  border: 1px solid #eee;
  border-radius: 50%; /* Modern circle feel */
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #777;
  transition: all 0.2s ease;

  &:hover {
    border-color: #000;
    color: #000;
    background-color: #fff;
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
  }
`;

const TextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 180px; /* Maintains structure during slide transition on desktop */

  @media (max-width: 1024px) {
    min-height: auto;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #555;
  margin-bottom: 35px;
  max-width: 90%;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 25px;
    max-width: 100%;
  }
`;

const StyledButton = styled.button<{ $color: string; $iconColor: string }>`
  display: flex;
  align-items: stretch;
  background-color: ${({ $color }) => $color};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: opacity 0.3s;
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width button on phones */
  }

  .text {
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    padding: 16px 28px;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 480px) {
      flex: 1;
    }
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    background-color: rgba(0, 0, 0, 0.15);
    color: #fff;
  }
`;

const BottomContent = styled.div`
  margin-top: auto;
  padding-top: 40px;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 1024px) {
    margin-top: 30px;
  }
`;

const ListLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #aaa;
  margin-bottom: 16px;
  letter-spacing: 1px;
`;

const MenuUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;

  /* DESKTOP LAYOUT (Columns with wrap if needed or fixed) */
  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two columns for list items */
    gap: 12px 20px;
  }

  /* TABLET & MOBILE LAYOUT (Horizontal Scroll / Chips) */
  @media (max-width: 1024px) {
    flex-direction: row;
    overflow-x: auto; /* Allow horizontal scrolling */
    white-space: nowrap;
    padding-bottom: 10px; /* Space for scrollbar */
    gap: 10px;
    
    /* Hide scrollbar for cleaner look */
    -ms-overflow-style: none;  
    scrollbar-width: none;  
    &::-webkit-scrollbar { display: none; }
  }
`;

const MenuLi = styled.li<{ $active?: boolean; $activeColor?: string }>`
  font-size: 15px;
  cursor: pointer;
  color: ${({ $active, $activeColor }) =>
    $active ? $activeColor : "#bbb"};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  transition: all 0.3s ease;
  padding: 5px 0;

  &:hover {
    color: ${({ $active, $activeColor }) => ($active ? $activeColor : "#555")};
  }

  /* CHIPS STYLE ON MOBILE */
  @media (max-width: 1024px) {
    background: ${({ $active, $activeColor }) => ($active ? `${$activeColor}15` : "#f5f5f7")};
    padding: 10px 18px;
    border-radius: 30px;
    border: 1px solid ${({ $active, $activeColor }) => ($active ? $activeColor : "transparent")};
    font-size: 14px;
    /* Snap alignment */
    scroll-snap-align: center;
  }
`;

// --- RIGHT PANEL STYLES ---

const RightPanel = styled.div`
  background: #ebebed;
  position: relative;
  overflow: hidden;

  /* On Desktop, flex takes remaining width */
  @media (max-width: 1024px) {
    width: 100%;
    /* Create a fixed aspect ratio header image for tablets/mobile */
    height: 400px; 
    min-height: 300px;
  }
  
  @media (max-width: 480px) {
     height: 280px; /* Compact image on phones */
  }
`;

const BrandWatermark = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 13px;
  font-weight: 800;
  color: #000;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  padding: 6px 12px;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const ShowcaseContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  &::after {
    /* Optional overlay for better text contrast if we had text over image */
    content: '';
    position: absolute;
    top:0; left:0; right:0; bottom:0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0));
    pointer-events: none;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Use object-position to ensure the top of UI designs is seen on mobile */
  object-position: center top; 
  display: block;
`;