import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav<{ scrolled: boolean }>`
  width: 100%;
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: all 0.3s ease-in-out;
  border-bottom: ${({ scrolled }) => (scrolled ? "1px solid #e8e8e8" : "1px solid transparent")};
  box-shadow: ${({ scrolled }) => (scrolled ? "0 4px 18px rgba(0,0,0,0.08)" : "none")};

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 70px;
  }
`;

export const Left = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  z-index: 10001; /* Stay above mobile menu */
`;

export const LogoImg = styled.img`
  width: 40px;
  @media (max-width: 768px) { width: 35px; }
`;

export const LogoText = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #04323f;
  margin: 0;
  white-space: nowrap;
`;

export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 1000px) {
    display: none; /* Hide standard nav on mobile/tablets */
  }
`;

export const Center = styled.ul`
  display: flex;
  gap: 25px;
  list-style: none;
  margin: 0;
  padding: 0;

  li a {
    text-decoration: none;
    color: #073442;
    font-size: 16px;
    font-weight: 500;
    transition: 0.25s ease;
  }

  li a:hover {
    color: #28a766;
  }
`;

export const ContactBtn = styled(Link)`
  background: #28a766;
  padding: 10px 22px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #28a766;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    background: white;
    color: #28a766;
  }
`;

export const Burger = styled.div`
  display: none;
  cursor: pointer;
  z-index: 10001;
  color: #04323f;

  @media (max-width: 1000px) {
    display: block; /* Show burger on mobile */
  }
`;

export const MobileMenu = styled.ul<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 280px;
  background: #ffffff;
  box-shadow: -10px 0 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  padding: 100px 40px;
  gap: 20px;
  list-style: none;
  margin: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  z-index: 10000;

  li a {
    text-decoration: none;
    color: #073442;
    font-size: 18px;
    font-weight: 600;
  }
`;