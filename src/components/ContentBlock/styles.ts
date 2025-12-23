import { Row } from "antd";
import styled from "styled-components";

export const ContentSection = styled("section")`
  position: relative;
  /* Reduced mobile padding: 10rem is too big for phones */
  padding: 8rem 0 6rem;

  @media only screen and (max-width: 1024px) {
    padding: 4rem 0 3rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 3rem 0 2rem;
  }
`;

export const Content = styled("p")`
  margin: 1.5rem 0 2rem 0;
`;

export const StyledRow = styled(Row)<{ direction: string }>`
  flex-direction: ${({ direction }) =>
    direction === "left" ? "row" : "row-reverse"};
  
  /* FIXED: On mobile, we force items to stack vertically */
  @media only screen and (max-width: 768px) {
    flex-direction: column !important;
  }
`;

export const ContentWrapper = styled("div")`
  position: relative;
  max-width: 540px;

  @media only screen and (max-width: 575px) {
    padding-top: 2rem; /* Reduced from 4rem */
    text-align: center; /* Better alignment for mobile phones */
  }

  /* Specific fix for h6 headings in this block */
  h6 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 480px) {
      font-size: 1.25rem;
    }
  }
`;

export const ServiceWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  margin-top: 1.5rem;
`;

export const MinTitle = styled("h6")`
  font-size: 15px;
  line-height: 1.2rem;
  padding: 0.5rem 0;
  text-transform: uppercase;
  color: #000;
  font-family: "Motiva Sans Light", sans-serif;
`;

export const MinPara = styled("p")`
  font-size: 13px;
`;

export const ButtonWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  gap: 10px; /* Modern way to space buttons */

  @media screen and (min-width: 1024px) {
    max-width: 80%;
  }

  /* Fixed buttons breaking on small screens (iPhone/Tecno) */
  @media screen and (max-width: 480px) {
    flex-direction: column; 
    button {
      width: 100% !important;
      margin: 0 !important;
      margin-bottom: 10px !important;
    }
  }
`;