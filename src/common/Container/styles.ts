import styled from "styled-components";

export const StyledContainer = styled("div")<{
  border?: boolean;
}>`
  position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  
  /* FIXED: Use box-sizing to ensure padding doesn't increase width */
  box-sizing: border-box; 
  
  /* Laptop/Desktop (The target look for your boss) */
  max-width: 1240px; 
  padding: 0 40px; 

  border-top: ${(p) => (p.border ? "1px solid #CDD1D4" : "")};

  /* TABLET - Smaller padding so content doesn't feel cramped */
  @media only screen and (max-width: 1024px) {
    max-width: 950px;
    padding: 0 30px;
  }

  /* SMALL TABLETS & LARGE PHONES (Samsung Galaxy/Note) */
  @media only screen and (max-width: 768px) {
    max-width: 100%; /* Take full screen width on smaller devices */
    padding: 0 25px;
  }

  /* PHONES (iPhone, Tecno, Infinix, Vivo, etc.) */
  @media only screen and (max-width: 480px) {
    max-width: 100%;
    padding: 0 20px; /* Essential: creates a consistent "safe zone" on the sides */
  }

  /* To prevent tiny text items from making the site shake/scroll left to right */
  overflow: hidden; 
`;