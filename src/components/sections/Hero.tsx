// src/components/sections/Hero.tsx
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { COLORS } from "../../styles/global"; // Ensure this path is correct
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// --- STYLED COMPONENTS ---

const HeroWrap = styled.section`
  min-height: 85vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 105px 20px;
  overflow: hidden;
  /* Darker base ensures the moving lights pop */
  background-color: #052e26; 
`;

// --- BACKGROUND LAYERS ---

const AmbientBackground = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  /* Optional: a subtle pattern overlay to add texture */
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`;

// The Moving Light Blob - ACCELERATED
const LightBlob = styled(motion.div)<{ color: string; size: string; blur: string }>`
  position: absolute;
  background: ${(props) => props.color};
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 50%;
  filter: blur(${(props) => props.blur});
  opacity: 0.6;
  mix-blend-mode: screen; /* Makes colors glow when they overlap */
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
  z-index: 10; /* Content sits firmly above the lights */
`;

const Left = styled.div`
  flex: 1;
`;

const Title = styled(motion.h1)`
  font-size: clamp(40px, 6vw, 84px);
  line-height: 1.05;
  margin: 0;
  font-weight: 900;
  color: ${COLORS.white};
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.95);
  max-width: 540px;
  margin-top: 22px;
  font-size: 20px;
  line-height: 1.6;
`;

const CTA = styled(motion.a)`
  display: inline-block;
  margin-top: 32px;
  background: ${COLORS.lightGreen};
  color: ${COLORS.white};
  padding: 16px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);

  &:hover {
    background: white;
    color: #207549;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 35px rgba(43, 148, 95, 0.4);
  }
`;

const Right = styled.div`
  width: 560px;
  max-width: 48%;
  position: relative;
  
  /* Glassy backing for the animation to sit on */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%);
    z-index: -1;
  }
`;

export default function Hero() {
  return (
    <HeroWrap>
      {/* 1. BACKGROUND: Fast Moving Aurora */}
      <AmbientBackground>
        
        {/* Blob 1: The Bright Neon Energy (Moves Top-Left to Center) */}
        <LightBlob
          color="#2b945f" 
          size="55vw"
          blur="100px"
          style={{ top: "-20%", left: "-20%" }}
          animate={{
            x: [0, 200, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0] // Adds swirling motion
          }}
          transition={{ 
            duration: 8, // Fast enough to see
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Blob 2: The Deep Contrast (Moves Bottom-Right to Center) */}
        <LightBlob
          color="#10b981" /* Brighter Emerald */
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

        {/* Blob 3: The "Wanderer" (Moves across the whole screen) */}
        <LightBlob
          color="#064e3b" /* Darker Green for depth */
          size="40vw"
          blur="80px"
          style={{ top: "40%", left: "40%", opacity: 0.7 }}
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
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
            href="#contact"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            style={{ width: "560px", height: "560px" }}
          >
            <DotLottieReact
              src="https://lottie.host/a348fa15-4dce-447b-a974-b58294cb4864/1eQUnUkI3U.lottie"
              loop
              autoplay
            />
          </motion.div>
        </Right>
      </Inner>
    </HeroWrap>
  );
}