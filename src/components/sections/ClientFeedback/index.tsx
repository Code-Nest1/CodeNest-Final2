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
    quote: "Codenest helped us unify our brand identity. The custom WordPress site they built is fast, and the design tokens allow us to distribute assets automatically. Truly the perfect IT solution.",
    imgSrc: "/assets/feedback/bohdan.jpg",
    serviceTag: "Web Design & Development",
  },
  {
    id: 2,
    name: "Dan Brooks",
    role: "President, Krytter",
    company: "Krytter",
    quote: "Our strategy needed evolving. Codenest delivered exceptional SEO and a Google Ads campaign that doubled our traffic. They optimized our site for conversions beautifully.",
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
    quote: "We needed a complex iOS and Android solution. The team delivered a far superior product than imagined with great flexibility. Highly committed to web standards.",
    imgSrc: "/assets/feedback/michael.jpg",
    serviceTag: "Mobile App Development",
    ctaText: "See the App",
  },
];

const TRANSITION_EASE: [number, number, number, number] = [0.25, 0.8, 0.25, 1];

// --- Animation Variants (Fixed Parsing Error) ---
const contentVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "30%" : "-30%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: TRANSITION_EASE,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "30%" : "-30%",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: TRANSITION_EASE,
    },
  }),
};

export default function ClientFeedback() {
  const [[page, direction], setPage] = useState([0, 0]);
  const cardControls = useAnimation();

  const feedbackIndex = ((page % feedbacks.length) + feedbacks.length) % feedbacks.length;
  const current = feedbacks[feedbackIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
  }, []);

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100 || offset.x < -80) {
      paginate(1);
    } else if (swipe > 100 || offset.x > 80) {
      paginate(-1);
    }
  };

  return (
    <Section>
      <BackgroundWrapper>
        <GridOverlay />
        <OrbOne animate={{ y: [0, -40, 0] }} transition={{ duration: 15, repeat: Infinity }} />
        <OrbTwo animate={{ y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity }} />
      </BackgroundWrapper>

      <Container>
        <HeaderWrapper>
          <SubHeader>Client Philosophy</SubHeader>
          <HeaderTitle>What our partners say about Code Nest</HeaderTitle>
          <HeaderDesc>
            We provide perfect IT Solutions & Technology for any Startups.
          </HeaderDesc>
        </HeaderWrapper>

        <SliderWrapper>
          <StackLayerOne />
          <StackLayerTwo />

          <CardWindow>
            <CardFrame>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <InnerGrid
                  key={page}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                >
                  <ImageSide>
                    {current.logoSrc && <LogoOverlay src={current.logoSrc} />}
                    <ProfileImg src={current.imgSrc} alt={current.name} />
                  </ImageSide>

                  <ContentSide>
                    <ServiceTag>{current.serviceTag}</ServiceTag>
                    <QuoteIcon>“</QuoteIcon>
                    <QuoteText>{current.quote}</QuoteText>

                    <AuthorBlock>
                      <AuthorName>{current.name}</AuthorName>
                      <AuthorRole>{current.role}</AuthorRole>
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
            <NavBtn onClick={() => paginate(-1)}><ChevronLeft size={20} /></NavBtn>
            <NavBtn onClick={() => paginate(1)}><ChevronRight size={20} /></NavBtn>
          </Controls>
        </SliderWrapper>
      </Container>
    </Section>
  );
}

/* --- Styled Components (No Minimizing - Long and Readable) --- */

const Section = styled.section`
  padding: 120px 0 180px;
  background-color: #f8fdfa;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) { padding: 60px 0 100px; }
`;

const BackgroundWrapper = styled.div`
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
`;

const GridOverlay = styled.div`
  position: absolute; inset: 0;
  background-image: radial-gradient(#28a665 1px, transparent 1px);
  background-size: 35px 35px; opacity: 0.05;
`;

const OrbOne = styled(motion.div)`
  position: absolute; top: -5%; left: -5%; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(40, 166, 101, 0.15) 0%, transparent 70%);
  filter: blur(60px);
`;

const OrbTwo = styled(motion.div)`
  position: absolute; bottom: -5%; right: -5%; width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(9, 50, 59, 0.1) 0%, transparent 70%);
  filter: blur(80px);
`;

const Container = styled.div`
  max-width: 1100px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 1;
`;

const HeaderWrapper = styled.div`
  text-align: center; max-width: 700px; margin: 0 auto 60px;
`;

const SubHeader = styled.h4` color: #28a665; font-size: 14px; text-transform: uppercase; margin-bottom: 12px; `;
const HeaderTitle = styled.h2` font-size: 42px; color: #09323b; @media (max-width: 768px) { font-size: 32px; } `;
const HeaderDesc = styled.p` font-size: 16px; color: #666; margin-top: 10px; `;

const SliderWrapper = styled.div`
  position: relative; width: 100%; max-width: 900px; margin: 0 auto;
  height: 520px; 
  @media (max-width: 850px) { height: auto; }
`;

const StackLayerOne = styled.div`
  position: absolute; top: 12px; left: 12px; right: -12px; bottom: -12px;
  background: rgba(40, 166, 101, 0.15); z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 93% 100%, 0 100%);
  @media (max-width: 850px) { display: none; }
`;

const StackLayerTwo = styled.div`
  position: absolute; top: 24px; left: 24px; right: -24px; bottom: -24px;
  background: #28a665; z-index: 0;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 93% 100%, 0 100%);
  @media (max-width: 850px) { display: none; }
`;

const CardWindow = styled.div`
  position: relative; z-index: 10; width: 100%; height: 100%;
`;

const CardFrame = styled(motion.div)`
  background: white; width: 100%; height: 100%; position: relative;
  box-shadow: 0 40px 80px -15px rgba(0,0,0,0.1);
  clip-path: polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%);
  @media (max-width: 850px) { clip-path: none; border-radius: 12px; }
`;

const InnerGrid = styled(motion.div)`
  width: 100%; height: 100%; display: grid; grid-template-columns: 40% 60%;
  @media (max-width: 850px) { grid-template-columns: 1fr; position: relative; }
`;

const ImageSide = styled.div` height: 100%; width: 100%; position: relative; @media (max-width: 850px) { height: 350px; } `;
const ProfileImg = styled.img` width: 100%; height: 100%; object-fit: cover; display: block; `;
const LogoOverlay = styled.img` 
  position: absolute; top: 20px; left: 20px; width: 90px;
  background: white; padding: 6px; border-radius: 4px; z-index: 5;
`;

const ContentSide = styled.div`
  padding: 60px; display: flex; flex-direction: column; justify-content: flex-start;
  @media (max-width: 850px) { padding: 40px 24px; }
`;

const ServiceTag = styled.div` font-size: 12px; font-weight: 700; color: #28a665; margin-bottom: 20px; letter-spacing: 1px; `;
const QuoteIcon = styled.div` font-size: 54px; color: #28a665; opacity: 0.5; height: 40px; line-height: 1; `;
const QuoteText = styled.p` font-size: 19px; line-height: 1.6; color: #222; margin-bottom: 30px; font-weight: 400; `;

/* ADDED THE MISSING COMPONENT BELOW */
const AuthorBlock = styled.div` margin-top: auto; display: flex; flex-direction: column; `;

const AuthorName = styled.div` font-size: 18px; font-weight: 700; color: #09323b; margin-bottom: 2px; `;
const AuthorRole = styled.div` font-size: 14px; color: #888; `;

const CtaButton = styled.button`
  margin-top: 30px; background: #0b363d; color: white; border: none;
  padding: 14px 28px; font-weight: 600; border-radius: 4px; display: flex;
  align-items: center; align-self: flex-start; transition: all 0.3s;
  &:hover { background: #28a665; transform: translateY(-2px); }
  @media (max-width: 768px) { width: 100%; justify-content: center; }
`;

const Controls = styled.div` display: flex; gap: 16px; justify-content: center; margin-top: 50px; `;
const NavBtn = styled.button`
  width: 50px; height: 50px; border-radius: 50%; border: 1px solid #eee;
  background: white; cursor: pointer; display: flex; align-items: center;
  justify-content: center; transition: all 0.2s; color: #777;
  &:hover { background: #28a665; color: white; border-color: #28a665; transform: scale(1.1); }
`;