import styled from "styled-components";

export const ContactContainer = styled("div")`
  padding: 8rem 0;
  display: flex;
  justify-content: center; /* Centers the form on Laptop screens */
  align-items: center;

  @media only screen and (max-width: 1024px) {
    padding: 4rem 0;
  }

  @media only screen and (max-width: 768px) {
    padding: 3rem 0;
  }
`;

export const FormGroup = styled("form")`
  width: 100%;
  max-width: 520px;
  
  /* Adds spacing between form fields automatically */
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media only screen and (max-width: 1045px) {
    max-width: 100%;
    margin: 0 auto; /* Ensures form doesn't hug the left side */
    padding: 0 15px; /* Adds breathing room for the form on small screens */
  }

  /* Professional touch: Ensure labels/inputs don't overlap on very narrow phones */
  @media only screen and (max-width: 480px) {
    gap: 0.8rem;
  }
`;

export const Span = styled("span")`
  display: block;
  font-weight: 600;
  color: rgb(255, 130, 92);
  font-size: 13px; /* Ensure errors are legible but not distracting */
  height: 1.2rem;
  padding: 0 0.675rem;
  margin-top: -5px; /* Pulls error closer to the input field */
`;

export const ButtonContainer = styled("div")`
  text-align: end; /* Keeps button on the right for Desktop */
  position: relative;
  width: 100%;
  margin-top: 1rem;

  @media only screen and (max-width: 768px) {
    text-align: center; /* Centering the button looks better on Tablets */
  }

  @media only screen and (max-width: 480px) {
    text-align: center;
    padding-top: 0.75rem;

    /* Professional mobile fix: Make the button full-width on tiny phones */
    button {
      width: 100% !important; 
      max-width: 320px; /* Optional: stops it from being TOO wide on Infinix screens */
    }
  }
`;