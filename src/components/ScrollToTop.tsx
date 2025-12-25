// src/components/ScrollToTop.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const ARROW_COLOR = "#28a665";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // --- 1. Universal Logic: Show after scrolling 2.5 sections (vh) ---
  useEffect(() => {
    const toggleVisibility = () => {
      // Logic: Appear after scrolling down more than 2.5 times the screen height
      // This works on EVERY page regardless of IDs like "industries"
      if (window.scrollY > window.innerHeight * 2.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Clean up listener
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // --- 2. Universal Scroll Function ---
  const scrollToTop = () => {
    // Hide immediately when clicked for a better feel
    setIsVisible(false);
    
    // Standard scroll to absolute top of any page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <BubbleButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          whileHover={{ scale: 1.1, y: -5 }} 
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label="Scroll to top"
        >
          {/* Simple Up Arrow SVG */}
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </BubbleButton>
      )}
    </AnimatePresence>
  );
}

// --- 3. Responsive Styles ---
const BubbleButton = styled(motion.button)`
  position: fixed;
  z-index: 9999; /* Higher z-index to stay above Footer and Forms */
  background-color: ${ARROW_COLOR};
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  
  /* DESKTOP SETTINGS */
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;

  /* Glassmorphism shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 10px;
    width: 25px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(-35deg);
  }

  /* MOBILE SETTINGS */
  @media (max-width: 768px) {
    bottom: 30px;
    right: 20px;
    width: 50px;
    height: 50px;
    
    svg {
      width: 22px;
      height: 22px;
    }
    
    &::before {
        width: 15px;
        height: 8px;
    }
  }
`;