// src/styles/global.ts
import { createGlobalStyle } from 'styled-components';

export const COLORS = {
  white: '#feffff',
  lightGreen: '#2b945f',
  darkGreen: '#0c3740',
  black: '#000000',
  grey: '#5a5a5a',
  cobalt: '#2033ff',

  // Added
  primary: '#2b945f',
  text: '#0c3740',
  textLight: '#5a5a5a',
  borderLight: '#e5e5e5',
  cardBg: '#f7f7f7',
  cardInner: '#efefef',

  // 🔥 FIX FOR YOUR ERROR
  background: '#f9f9f9', // Coaxsoft-like clean section bg
};


export const GlobalStyle = createGlobalStyle`
  /* Google font */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: ${COLORS.white};
    color: ${COLORS.black};
    padding-top: 70px; /* better for fixed navbar */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
`;
