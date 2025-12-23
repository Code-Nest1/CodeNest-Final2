import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { COLORS } from "../../styles/global"; 
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// --- STYLED COMPONENTS ---

const HeroWrap = styled.section`
  /* "Fixed not too much, not too less" - 80vh is the sweet spot for laptops */
  min-height: 80vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* drastically reduced padding to fix the "too much gap" issue */
  padding: 40px 20px 40px; 
  overflow: hidden;
  background-color: #052e26; 

  /* Mobile: content flows naturally, slightly more space top for nav */
  @media (max-width: 991px) {
    min-height: auto;
    padding-top: 100px;
    padding-bottom: 60px;
  }
`;

// --- BACKGROUND LAYERS (UNCHANGED) ---

const AmbientBackground = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`;

const LightBlob = styled(motion.div)<{ color: string; size: string; blur: string }>`
  position: absolute;
  background: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  filter: blur(${(props) => props.blur});
  opacity: 0.6;
  mix-blend-mode: screen;
  will-change: transform;
`;

// --- CONTENT LAYOUT ---

const Inner = styled.div`
  max-width: 1150px; /* Reduced width slightly to tighten the center cluster */
  margin: 0 auto;
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 10;
  gap: 20px;

  /* STACK ON MOBILE */
  @media (max-width: 991px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* KEY: Content aligns strictly left on desktop to match screenshot */
  align-items: flex-start;
  z-index: 2;

  @media (max-width: 991px) {
    width: 100%;
    align-items: center; /* Center everything on mobile */
  }
`;

const Title = styled(motion.h1)`
  /* Perfected Size: 56px (Not too big, not too small) */
  font-size: 56px; 
  line-height: 1.1; 
  margin: 0 0 20px 0;
  /* Adjusted weight: 800 is solid, but not 'blocky' black */
  font-weight: 800; 
  color: ${COLORS.white};
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);

  @media (max-width: 1200px) {
    font-size: 48px; 
  }

  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 1.2;
    margin-bottom: 16px;
  }
`;

// "Magic" Break component for Desktop Only (Forces screenshot layout)
const DesktopBr = styled.br`
  display: block;
  @media (max-width: 991px) {
    display: none;
  }
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  text-align: left; /* Strict Left Align */

  @media (max-width: 991px) {
    text-align: center;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 24px;
    padding: 0 10px;
  }
`;

const CTA = styled(motion.a)`
  display: inline-block;
  background: ${COLORS.lightGreen};
  color: ${COLORS.white};
  padding: 16px 34px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #207549;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: auto; 
    padding: 15px 40px;
  }
`;

const Right = styled.div`
  flex: 1; 
  display: flex;
  justify-content: flex-end; /* Pushes image slightly right for balance */
  align-items: center;
  position: relative;
  
  @media (max-width: 1200px) {
     justify-content: center;
  }

  @media (max-width: 991px) {
    width: 100%;
    order: -1; /* Image top on Mobile */
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const LottieContainer = styled(motion.div)`
  width: 100%;
  max-width: 550px; 
  height: auto;
  aspect-ratio: 1/1; 

  @media (max-width: 1100px) {
    max-width: 420px;
  }

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

export default function Hero() {
  return (
    <HeroWrap>
      {/* 1. BACKGROUND */}
      <AmbientBackground>
        <LightBlob
          color="#2b945f" 
          size="55vw"
          blur="100px"
          style={{ top: "-20%", left: "-20%" }}
          animate={{
            x: [0, 200, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        <LightBlob
          color="#10b981" 
          size="50vw"
          blur="120px"
          style={{ bottom: "-20%", right: "-20%" }}
          animate={{
            x: [0, -250, 0],
            y: [0, -150, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </AmbientBackground>

      {/* 2. FOREGROUND */}
      <Inner>
        <Left>
          <Title
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* The Magic Break Lines: Desktop Only */}
            Launch, Scale & <DesktopBr />
            Succeed with <DesktopBr />
            Code Nest
          </Title>

          <Subtitle
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to Code Nest, your growth partner for web 
            development, app solutions, and digital marketing. We don’t 
            just build websites; we create platforms that turn visitors 
            into customers.
          </Subtitle>

          <CTA
            href="/contactform" 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Get a Free Quote
          </CTA>
        </Left>

        <Right>
          <LottieContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <DotLottieReact
              src="https://lottie.host/a348fa15-4dce-447b-a974-b58294cb4864/1eQUnUkI3U.lottie"
              loop
              autoplay
            />
          </LottieContainer>
        </Right>
      </Inner>
    </HeroWrap>
  );
}