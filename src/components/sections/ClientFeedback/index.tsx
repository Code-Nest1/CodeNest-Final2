"use client";

import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import {
  motion,
  AnimatePresence,
  Variants,
  PanInfo,
  useAnimation
} from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "react-feather";

// --- Types ---
type FeedbackItem = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  imgSrc: string;
  logoSrc?: string;
  hasVideo?: boolean;
  ctaText?: string;
  serviceTag?: string;
};

// --- Data ---
const feedbacks: FeedbackItem[] = [
  {
    id: 1,
    name: "Bohdan Zabawskyj",
    role: "Co-founder and CPO at Fortay.ai",
    company: "Fortay.ai",
    quote: "Codenest helped us unify our brand identity. The custom WordPress site they built is fast, and the design tokens allow us to distribute assets automatically. Truly the perfect IT solution for our startup.",
    imgSrc: "/assets/feedback/bohdan.jpg",
    serviceTag: "Web Design & Development",
    hasVideo: true,
  },
  {
    id: 2,
    name: "Dan Brooks",
    role: "President, Krytter",
    company: "Krytter",
    quote: "Our strategy needed evolving. Codenest delivered exceptional SEO and a Google Ads campaign that doubled our traffic. They didn't just maintain our site; they optimized it for conversions.",
    imgSrc: "/assets/feedback/dan.jpg",
    logoSrc: "/assets/feedback/krytter-logo.png",
    serviceTag: "Digital Marketing & SEO",
    ctaText: "View Case Study",
  },
  {
    id: 3,
    name: "Michael Smith",
    role: "Product Owner",
    company: "TechFlow",
    quote: "We needed a complex iOS and Android solution. The team delivered a far superior product than imagined with great flexibility. Codenest is committed to the highest web standards.",
    imgSrc: "/assets/feedback/michael.jpg",
    serviceTag: "Mobile App Development",
    ctaText: "See the App",
  },
];

// --- ANIMATION CONFIGURATION ---
const TRANSITION_EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

const contentVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    zIndex: 2,
  }),
  center: {
    zIndex: 2,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: TRANSITION_EASE,
    },
  },
  exit: (direction: number) => ({
    zIndex: 1,
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: TRANSITION_EASE,
    },
  }),
};

// --- NEW BACKGROUND ANIMATIONS ---

// Top-Left Orb (The Primary Green)
const orbOneVariants: Variants = {
  animate: {
    y: [0, -50, 0],
    x: [0, 30, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Bottom-Right Orb (A Darker/Teal Variant for Depth)
const orbTwoVariants: Variants = {
  animate: {
    y: [0, 60, 0],
    x: [0, -40, 0],
    scale: [1, 1.2, 1],
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function ClientFeedback() {
  const [[page, direction], setPage] = useState([0, 0]);
  const cardControls = useAnimation();

  // Infinite Loop Logic
  const feedbackIndex = ((page % feedbacks.length) + feedbacks.length) % feedbacks.length;
  const current = feedbacks[feedbackIndex];

  useEffect(() => {
    feedbacks.forEach((item) => {
      const img = new Image();
      img.src = item.imgSrc;
      if (item.logoSrc) {
        const logo = new Image();
        logo.src = item.logoSrc;
      }
    });
  }, []);

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    cardControls.start({
      scale: [0.98, 1],
      y: [6, 0],
      transition: { duration: 0.5, ease: "easeOut" }
    });
  }, [page, cardControls]);

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100 || offset.x < -80) {
      paginate(1);
    } else if (swipe > 100 || offset.x > 80) {
      paginate(-1);
    }
  };

  return (
    <Section>
      {/* --- NEW: Animated Background Layer --- */}
      <BackgroundWrapper>
        {/* The Dot Grid Pattern */}
        <GridOverlay />
        
        {/* Floating Green Orb (Top Left) */}
        <OrbOne 
          variants={orbOneVariants}
          animate="animate"
        />
        
        {/* Floating Teal Orb (Bottom Right) */}
        <OrbTwo 
          variants={orbTwoVariants}
          animate="animate"
        />
      </BackgroundWrapper>

      <Container>
        <HeaderWrapper>
          <SubHeader>Codenest Philosophy</SubHeader>
          <HeaderTitle>What our partners say about Codenest</HeaderTitle>
          <HeaderDesc>
            We provide perfect IT Solutions & Technology for any Startups.
            Our developers are committed to maintaining the highest web standards.
          </HeaderDesc>
        </HeaderWrapper>

        <SliderWrapper>
          
          {/* Background Layers for Card Depth (Kept Green as requested) */}
          <StackLayerOne />
          <StackLayerTwo />

          <CardWindow>
            <CardFrame animate={cardControls}>
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <InnerGrid
                  key={page}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.05}
                  onDragEnd={handleDragEnd}
                >
                  <ImageSide>
                    {current.logoSrc && (
                      <LogoOverlay src={current.logoSrc} alt="logo" />
                    )}
                    <ProfileImg
                      src={current.imgSrc}
                      alt={current.name}
                      draggable="false"
                    />
                  </ImageSide>

                  <ContentSide>
                    <ServiceTag>{current.serviceTag}</ServiceTag>
                    <QuoteIcon>“</QuoteIcon>
                    <QuoteText>{current.quote}</QuoteText>

                    <AuthorBlock>
                      <AuthorName>{current.name}</AuthorName>
                      <AuthorRole>{current.role}</AuthorRole>
                      <AuthorCompany>{current.company}</AuthorCompany>
                    </AuthorBlock>

                    {current.ctaText && (
                      <CtaButton>
                        {current.ctaText}
                        <ArrowRight size={14} style={{ marginLeft: 6 }} />
                      </CtaButton>
                    )}
                  </ContentSide>
                </InnerGrid>
              </AnimatePresence>
            </CardFrame>
          </CardWindow>

          <Controls>
            <NavBtn onClick={() => paginate(-1)}>
              <ChevronLeft size={20} />
            </NavBtn>
            <NavBtn onClick={() => paginate(1)}>
              <ChevronRight size={20} />
            </NavBtn>
          </Controls>
        </SliderWrapper>
      </Container>
    </Section>
  );
}

/* --- Styled Components --- */

const Section = styled.section`
  padding: 120px 0 160px;
  /* Changed from plain white to a very subtle mint-white base */
  background-color: #f8fdfa; 
  overflow: hidden; 
  font-family: 'Inter', sans-serif;
  position: relative;
`;

// --- NEW BACKGROUND STYLES ---

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Behind everything */
  overflow: hidden;
  pointer-events: none;
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  /* Creates a subtle technical dot pattern */
  background-image: radial-gradient(#28a665 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.07;
  z-index: 2;
`;

const OrbOne = styled(motion.div)`
  position: absolute;
  top: -10%;
  left: -5%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(40, 166, 101, 0.25) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  filter: blur(60px);
  z-index: 1;
`;

const OrbTwo = styled(motion.div)`
  position: absolute;
  bottom: -10%;
  right: -5%;
  width: 800px;
  height: 800px;
  /* Slightly darker teal/green for contrast */
  background: radial-gradient(circle, rgba(11, 54, 61, 0.15) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
`;

// --- END BACKGROUND STYLES ---

const Container = styled.div`
  max-width: 1080px; 
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2; /* Sits above the animated background */
`;

const HeaderWrapper = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
`;

const SubHeader = styled.h4`
  color: #28a665;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const HeaderTitle = styled.h2`
  font-size: 48px;
  font-weight: 600;
  color: #09323b;
  margin-bottom: 24px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const HeaderDesc = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.6;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  height: 480px; 

  @media (max-width: 850px) {
    height: auto;
    min-height: 750px;
  }
`;

const StackLayerOne = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: -10px;
  bottom: -10px;
  height: 100%;
  background: rgba(40, 166, 101, 0.2); 
  border-radius: 4px;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);
`;

const StackLayerTwo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: -20px;
  bottom: -20px;
  height: 100%;
  background: #28a665; 
  border-radius: 4px;
  z-index: 0;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 93% 100%, 0 100%);
`;

const CardWindow = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const CardFrame = styled(motion.div)`
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  position: relative;
  /* Stronger shadow to make it pop against the new background */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%);
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 850px) {
    clip-path: none;
    border-radius: 12px;
  }
`;

const InnerGrid = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 42% 58%;
  cursor: grab;
  will-change: transform, opacity;
  background-color: #ffffff;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    grid-template-rows: 350px auto;
  }
`;

const ImageSide = styled.div`
  position: relative;
  background-color: #f0f0f0;
  height: 100%; 
  width: 100%;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: top center;
  display: block;
  pointer-events: none; 
`;

const LogoOverlay = styled.img`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 100px;
  height: auto;
  object-fit: contain;
  z-index: 2;
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  pointer-events: none;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const ContentSide = styled.div`
  padding: 60px 50px 80px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 850px) {
    padding: 40px 24px;
  }
`;

const ServiceTag = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #28a665;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
`;

const QuoteIcon = styled.div`
  font-size: 60px;
  line-height: 1;
  color: #28a665; 
  font-family: serif;
  margin-bottom: 16px;
  opacity: 0.8;
`;

const QuoteText = styled.p`
  font-size: 20px;
  line-height: 1.5;
  color: #121212;
  font-weight: 400;
  margin-bottom: 32px;
`;

const AuthorBlock = styled.div`
  margin-top: auto; 
`;

const AuthorName = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #121212;
  margin-bottom: 4px;
`;

const AuthorRole = styled.span`
  font-size: 14px;
  color: #444;
`;

const AuthorCompany = styled.span`
  font-size: 14px;
  color: #28a665;
  font-weight: 600;
  margin-left: 6px;
  
  &:before {
    content: "|";
    margin-right: 6px;
    color: #ccc;
  }
`;

const CtaButton = styled.button`
  margin-top: 24px;
  background: #0b363d;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(11, 54, 61, 0.2);

  &:hover {
    background: #28a665;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(40, 166, 101, 0.3);
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 40px; 
  position: absolute;
  bottom: -70px;
  left: 0;
  right: 0;
  z-index: 20;
`;

const NavBtn = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid #e1e1e1;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 50%; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  &:hover {
    border-color: #28a665;
    background-color: #28a665;
    color: #ffffff;
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(40, 166, 101, 0.4);
  }
`;