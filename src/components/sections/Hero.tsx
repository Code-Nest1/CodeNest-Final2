import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { COLORS } from "../../styles/global"; 
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// --- STYLED COMPONENTS ---

const HeroWrap = styled.section`
  min-height: 90vh; /* Increased slightly for mobile comfort */
  display: flex;
  align-items: center;
  position: relative;
  padding: 100px 20px 60px; /* Increased top padding to clear fixed navbar */
  overflow: hidden;
  background-color: #052e26; 

  @media (max-width: 768px) {
    padding-top: 120px;
    min-height: auto;
  }
`;

// --- BACKGROUND LAYERS ---

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
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  gap: 60px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 10;

  /* STACK ON MOBILE */
  @media (max-width: 991px) {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
`;

const Left = styled.div`
  flex: 1;
  @media (max-width: 991px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center items for mobile */
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(32px, 6vw, 84px); /* Optimized starting clamp */
  line-height: 1.05;
  margin: 0;
  font-weight: 900;
  color: ${COLORS.white};
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);

  @media (max-width: 480px) {
    font-size: 34px; /* Force consistent look on smaller Infinix/Samsung */
  }
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.95);
  max-width: 540px;
  margin-top: 22px;
  font-size: 20px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 17px;
    margin-top: 15px;
  }
`;

const CTA = styled(motion.a)`
  display: inline-block;
  margin-top: 32px;
  background: ${COLORS.lightGreen};
  color: ${COLORS.white};
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  text-decoration: none; /* Removed link underline */

  &:hover {
    background: white;
    color: #207549;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 35px rgba(43, 148, 95, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width button on phones looks more premium */
    max-width: 280px;
  }
`;

const Right = styled.div`
  width: 560px;
  max-width: 48%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 991px) {
    width: 100%;
    max-width: 80%; /* Takes more width on mobile once stacked */
    order: -1; /* Animation moves ABOVE the text on mobile */
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%);
    z-index: -1;
  }
`;

// New Styled Container for the Lottie to make it responsive
const LottieContainer = styled(motion.div)`
  width: 560px;
  height: 560px;

  @media (max-width: 1100px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 768px) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: 480px) {
    width: 260px;
    height: 260px;
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

      {/* 2. FOREGROUND CONTENT */}
      <Inner>
        <Left>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Launch, Scale & Succeed with Code Nest
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to Code Nest, your growth partner for web development, app
            solutions, and digital marketing. We don’t just build websites; we
            create platforms that turn visitors into customers.
          </Subtitle>

          <CTA
            href="/contactform" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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