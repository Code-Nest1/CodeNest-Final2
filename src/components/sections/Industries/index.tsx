"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "react-feather";

// --- Data Configuration (Unchanged) ---
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

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]); 

  return (
    <SectionWrapper>
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                      <path d="M2 17L12 22L22 17" fill="white" opacity="0.6" />
                      <path d="M2 12L12 17L22 12" fill="white" opacity="0.8" />
                    </svg>
                  </IconBox>
                  <IndustryTitle>{current.name}</IndustryTitle>
                </TitleWrapper>

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
                  <StyledButton
                    $color={current.buttonColor}
                    $iconColor={current.color}
                  >
                    <span className="text">Learn more</span>
                    <span className="icon-box">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12l-18 12v-24z" />
                      </svg>
                    </span>
                  </StyledButton>
                </TextWrapper>
              </AnimatePresence>
            </TopContent>

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

          {/* RIGHT PANEL (Mockups) */}
          <RightPanel>
            <BrandWatermark>{current.brandName}</BrandWatermark>
            <AnimatePresence mode="wait">
              <ShowcaseContainer
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWrapper>
                  {current.images.map((src, i) => (
                    <StyledImg
                      key={i}
                      src={src}
                      alt={`${current.name} mockup`}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x800/222/white?text=" + current.name;
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

// --- Styled Components (Professional Responsiveness) ---

const SectionWrapper = styled.section`
  width: 100%;
  padding: 100px 0;
  background-color: #f9f9fb;
  overflow: hidden; /* FIX: Prevents sliding transitions from causing side scroll */
  
  @media (max-width: 768px) { padding: 60px 0; }
`;

const MainContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
  @media (max-width: 768px) { padding: 0 20px; }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media (max-width: 768px) { margin-bottom: 40px; }
`;

const MainHeading = styled.h2`
  font-size: clamp(32px, 5vw, 56px); /* FIX: Auto-scales heading */
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  letter-spacing: -1.5px;
`;

const SubHeading = styled.p`
  max-width: 700px;
  margin: 0 auto;
  font-size: 15px;
  line-height: 1.6;
  color: #888;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  height: 620px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto; /* CRITICAL: Fixed height breaks stack layouts */
    gap: 0px; 
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  padding: 50px;

  @media (max-width: 768px) { padding: 30px 20px; }
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconBox = styled.div`
  width: 32px; height: 32px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
`;

const IndustryTitle = styled.h3`
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 500;
  color: #222;
`;

const NavControls = styled.div` display: flex; gap: 8px; `;

const NavButton = styled.button`
  width: 40px; height: 40px; border: 1px solid #eee; background: transparent;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #bbb;

  &:hover { border-color: #333; color: #333; }
`;

const TextWrapper = styled(motion.div)`
  display: flex; flex-direction: column; align-items: flex-start;
`;

const Description = styled.p`
  font-size: 16px; line-height: 1.6; color: #777;
  margin-bottom: 30px; min-height: 80px;

  @media (max-width: 768px) { font-size: 15px; min-height: auto; }
`;

const StyledButton = styled.button<{ $color: string; $iconColor: string }>`
  display: flex; background-color: ${({ $color }) => $color};
  border: none; padding: 0; cursor: pointer;
  
  @media (max-width: 480px) { width: 100%; justify-content: center; }

  .text {
    color: #fff; font-weight: 500; font-size: 14px;
    padding: 14px 28px;
    @media (max-width: 480px) { flex: 1; }
  }
  .icon-box {
    display: flex; align-items: center; justify-content: center;
    width: 50px; background-color: rgba(0, 0, 0, 0.15);
    color: ${({ $iconColor }) => $iconColor};
  }
`;

const BottomContent = styled.div`
  margin-top: 50px;
  border-top: 1px solid #f5f5f5;
  padding-top: 30px;
  @media (max-width: 1024px) { margin-top: 30px; }
`;

const ListLabel = styled.div`
  font-size: 14px; color: #999; margin-bottom: 15px; text-transform: uppercase;
`;

const MenuUl = styled.ul`
  list-style: none; display: flex; gap: 12px;
  padding: 5px 0; margin: 0;
  
  /* FIXED: Professional Switcher for Mobile */
  @media (max-width: 1024px) {
    overflow-x: auto; /* Horizontal chips for better thumb-reach on phones */
    padding-bottom: 15px;
    &::-webkit-scrollbar { height: 4px; }
    &::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
  }
  
  @media (min-width: 1025px) {
    flex-direction: column;
    height: 180px;
    overflow-y: auto;
  }
`;

const MenuLi = styled.li<{ $active?: boolean; $activeColor?: string }>`
  font-size: 15px; cursor: pointer; white-space: nowrap;
  color: ${({ $active, $activeColor }) => ($active ? $activeColor : "#bbbbbb")};
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  transition: all 0.3s;

  @media (max-width: 1024px) {
    background: ${({ $active }) => ($active ? "#f0fdf4" : "transparent")};
    padding: 8px 16px;
    border-radius: 50px;
    border: 1px solid ${({ $active, $activeColor }) => ($active ? $activeColor : "#eee")};
  }
`;

const RightPanel = styled.div`
  background: #ebebed;
  position: relative;
  overflow: hidden;
  height: 100%;
  
  @media (max-width: 1024px) {
    height: 400px; /* Force visibility on mobile stack */
    order: -1; /* Place mockup ABOVE the industry text on phones */
  }
`;

const BrandWatermark = styled.div`
  position: absolute; top: 20px; right: 20px;
  font-size: 14px; font-weight: 700; color: #111;
  text-transform: uppercase; background: rgba(255, 255, 255, 0.9);
  padding: 4px 10px; border-radius: 4px; z-index: 10;
`;

const ShowcaseContainer = styled(motion.div)`
  width: 100%; height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%; height: 100%;
`;

const StyledImg = styled.img`
  width: 100%; height: 100%; object-fit: cover;
  display: block;
`;