"use client";

import React, { useState, useEffect } from "react"; // 1. Added useEffect here
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
  const current = industries[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % industries.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + industries.length) % industries.length);

  // --- 2. ADDED AUTOMATION LOGIC ---
  useEffect(() => {
    // This creates a timer that runs the 'next' function every 4000ms (4 seconds)
    const interval = setInterval(() => {
      next();
    }, 4000);

    // This cleans up the timer when the component unmounts or when currentIndex changes.
    // This ensures that if a user manually clicks a button, the 4-second timer resets
    // so it doesn't jump immediately after a manual click.
    return () => clearInterval(interval);
  }, [currentIndex]); 

  return (
    <SectionWrapper>
      <MainContainer>
        {/* --- 1. GLOBAL HEADER --- */}
        <HeaderSection>
          <MainHeading>Industries we serve</MainHeading>
          <SubHeading>
            Code Nest Software applies industry-specific knowledge to each
            product design and development project, using this background to
            streamline the product development life cycle.
          </SubHeading>
        </HeaderSection>

        {/* --- 2. CARD CONTENT AREA --- */}
        <ContentLayout>
          {/* LEFT PANEL (White) */}
          <LeftPanel>
            <TopContent>
              <CardHeader>
                <TitleWrapper>
                  {/* Icon Box */}
                  <IconBox style={{ backgroundColor: current.color }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                      <path
                        d="M2 17L12 22L22 17"
                        fill="white"
                        opacity="0.6"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        fill="white"
                        opacity="0.8"
                      />
                    </svg>
                  </IconBox>
                  <IndustryTitle>{current.name}</IndustryTitle>
                </TitleWrapper>

                {/* Arrows */}
                <NavControls>
                  <NavButton onClick={prev} aria-label="Previous">
                    <ChevronLeft size={18} />
                  </NavButton>
                  <NavButton onClick={next} aria-label="Next">
                    <ChevronRight size={18} />
                  </NavButton>
                </NavControls>
              </CardHeader>

              <AnimatePresence mode="wait">
                <TextWrapper
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Description>{current.desc}</Description>

                  {/* Button */}
                  <StyledButton
                    $color={current.buttonColor}
                    $iconColor={current.color}
                  >
                    <span className="text">Learn more</span>
                    <span className="icon-box">
                      <svg
                        width="12"
                        height="12"
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

            {/* Bottom List */}
            <BottomContent>
              <ListLabel>/ Industries</ListLabel>
              <MenuUl>
                {industries.map((item, idx) => (
                  <MenuLi
                    key={item.id}
                    $active={idx === currentIndex}
                    $activeColor={item.buttonColor}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {item.name}
                  </MenuLi>
                ))}
              </MenuUl>
            </BottomContent>
          </LeftPanel>

          {/* RIGHT PANEL (Grey Image Box) */}
          <RightPanel>
            <BrandWatermark>{current.brandName}</BrandWatermark>
            <AnimatePresence mode="wait">
              <ShowcaseContainer
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWrapper>
                  {current.images.map((src, i) => (
                    <StyledImg
                      key={i}
                      src={src}
                      alt={`${current.name} mockup`}
                      $index={i}
                      $total={current.images.length}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x800/png?text=Full+Cover+Image";
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

// --- Styled Components ---

const SectionWrapper = styled.section`
  width: 100%;
  padding: 100px 0;
  background-color: #f9f9fb;
  font-family: "Inter", sans-serif;
  color: #1c1c1c;
`;

const MainContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

// --- HEADER SECTION ---
const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 70px;
`;

const MainHeading = styled.h2`
  font-size: 56px;
  font-weight: 500;
  color: #333;
  margin-bottom: 24px;
  letter-spacing: -1.5px;
`;

const SubHeading = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: 15px;
  line-height: 1.6;
  color: #888;
  font-weight: 400;
`;

// --- LAYOUT ---
const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: stretch;
  height: 620px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 40px;
  }
`;

// --- LEFT PANEL (WHITE) ---
const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  padding: 50px;
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IndustryTitle = styled.h3`
  font-size: 32px;
  font-weight: 500;
  color: #222;
  margin: 0;
  letter-spacing: -1px;
`;

const NavControls = styled.div`
  display: flex;
  gap: 8px;
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #eee;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #bbb;
  transition: all 0.2s;

  &:hover {
    border-color: #333;
    color: #333;
  }
`;

const TextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #777;
  margin-bottom: 35px;
  max-width: 100%;
`;

// --- BUTTON ---
const StyledButton = styled.button<{ $color: string; $iconColor: string }>`
  display: flex;
  align-items: stretch;
  background-color: ${({ $color }) => $color};
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  .text {
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    padding: 14px 28px;
    display: flex;
    align-items: center;
  }

  .icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    background-color: rgba(0, 0, 0, 0.15);
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    color: ${({ $iconColor }) => $iconColor};
  }
`;

// --- LIST ---
const BottomContent = styled.div`
  margin-top: 50px;
  border-top: 1px solid #f5f5f5;
  padding-top: 30px;
`;

const ListLabel = styled.div`
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
  font-weight: 400;
`;

const MenuUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const MenuLi = styled.li<{ $active?: boolean; $activeColor?: string }>`
  font-size: 16px;
  cursor: pointer;
  color: ${({ $active, $activeColor }) =>
    $active ? $activeColor : "#e0e0e0"};
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ $active, $activeColor }) =>
      $active ? $activeColor : "#b0b0b0"};
  }
`;

// --- RIGHT PANEL (UPDATED FOR FULL IMAGE COVER) ---
const RightPanel = styled.div`
  background: #ebebed;
  position: relative;
  overflow: hidden;
  display: block;
  height: 100%;
`;

const BrandWatermark = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 16px;
  font-weight: 700;
  color: #121212;
  letter-spacing: 1px;
  z-index: 10;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 4px;
`;

const ShowcaseContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// --- UPDATED IMAGE COMPONENT ---
const StyledImg = styled.img<{ $index: number; $total: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${({ $index }) => ($index === 0 ? 1 : 2)};
  transition: transform 0.5s ease-out;
`;