// src/components/ScrollToTop.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const ARROW_COLOR = "#28a665";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // --- 1. Logic to Show/Hide based on "Industries" section ---
  useEffect(() => {
    const toggleVisibility = () => {
      // Find the industries section
      const industriesSection = document.getElementById("industries");
      
      if (industriesSection) {
        // Get the position of the industries section
        const sectionTop = industriesSection.offsetTop;
        const currentScroll = window.scrollY + window.innerHeight; // Bottom of viewport

        // Show button if we have scrolled past the start of the Industries section
        if (window.scrollY > sectionTop - 400) { 
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Fallback: Show if scrolled down 1000px if section not found
        if (window.scrollY > 1000) setIsVisible(true);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // --- 2. Scroll to Hero Function ---
  const scrollToHero = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <BubbleButton
          onClick={scrollToHero}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          whileHover={{ scale: 1.15, y: -5 }} // Bubbly hover effect
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Simple Up Arrow SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </BubbleButton>
      )}
    </AnimatePresence>
  );
}

// --- 3. Styles ---
const BubbleButton = styled(motion.button)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${ARROW_COLOR};
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(11, 50, 61, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999; /* Ensures it stays on top of everything */
  outline: none;
  
  /* Glassmorphism subtle shine */
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 12px;
    width: 20px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    transform: rotate(-45deg);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
`;