// src/styles/global.ts
import { createGlobalStyle } from 'styled-components';

export const COLORS = {
  white: '#feffff',
  lightGreen: '#2b945f',
  darkGreen: '#0c3740',
  black: '#000000',
  grey: '#5a5a5a',
  cobalt: '#2033ff',
  primary: '#2b945f',
  text: '#0c3740',
  textLight: '#5a5a5a',
  borderLight: '#e5e5e5',
  cardBg: '#f7f7f7',
  cardInner: '#efefef',
  background: '#f9f9f9',
};

export const GlobalStyle = createGlobalStyle`
  /* Google font import */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap');

  /* 1. PROFESSIONAL RESET */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 2. THE HORIZONTAL FIX (The most important part) */
  html, body {
    overflow-x: hidden; /* This stops the "wobble" on iPhone/Tecno/Samsung */
    width: 100%;
    margin: 0;
    padding: 0;
    -webkit-overflow-scrolling: touch; /* Makes scrolling feel like a native app on iOS */
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background: ${COLORS.white};
    color: ${COLORS.black};
    /* Adjusted padding-top: 70px for Laptop, 60px for Mobile */
    padding-top: 70px; 
    
    @media only screen and (max-width: 768px) {
      padding-top: 60px;
    }

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 3. RESPONSIVE TYPOGRAPHY (Crucial for professionalism) */
  h1, h2, h3, h4, h5, h6 {
    color: ${COLORS.darkGreen};
    line-height: 1.25;
    margin-bottom: 1rem;
  }

  /* Headlines that shrink on small phones so they don't break lines awkwardly */
  h1 { 
    font-size: 2.5rem; 
    @media (max-width: 480px) { font-size: 1.8rem; } 
  }
  
  h2 { 
    font-size: 2rem; 
    @media (max-width: 480px) { font-size: 1.5rem; } 
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${COLORS.textLight};
    
    @media (max-width: 480px) {
      font-size: 0.95rem; /* Slightly smaller text for better readability on narrow screens */
    }
  }

  /* 4. UTILITY STYLES */
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  img {
    max-width: 100%;
    height: auto; /* Ensure aspect ratio stays perfect */
    display: block;
  }

  button {
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
    border: none;
    outline: none;
    /* This prevents that grey box highlight when you tap buttons on phones */
    -webkit-tap-highlight-color: transparent; 
  }

  /* Fix for the root div to prevent height issues */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;