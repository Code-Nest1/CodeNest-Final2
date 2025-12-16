import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Nav = styled.nav<{ scrolled: boolean }>`
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
  transition: all 0.25s ease-in-out;
  border-bottom: ${({ scrolled }) =>
    scrolled ? "1px solid #e8e8e8" : "1px solid transparent"};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 4px 18px rgba(0,0,0,0.08)" : "none"};
`;

const Left = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const LogoImg = styled.img`
  width: 45px;
`;

const LogoText = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #04323f;
  margin: 0;
`;

const Center = styled.ul`
  display: flex;
  gap: 25px;
  list-style: none;

  li a {
    text-decoration: none;
    color: #073442;
    font-size: 16px;
    font-weight: 500;
    transition: 0.25s ease;
    cursor: pointer;
  }

  li a:hover {
    color: #28a766;
  }
`;

const ContactBtn = styled.a`
  background: #28a766;
  padding: 10px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #28a766;
  transition: 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    background: white;
    color: #28a766;
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on route change (optional)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 🔥 Scroll to contact section when navbar "Contact" is clicked
  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Nav scrolled={scrolled}>
      <Left to="/">
        <LogoImg src="/img/icons/Logo.png" alt="Logo" />
        <LogoText>Code Nest</LogoText>
      </Left>

      <Center>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/challenges">Challenges</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/industries">Industries</Link></li>
      </Center>

      {/* 🔥 Modified: now triggers smooth scroll instead of routing */}
      <ContactBtn onClick={handleScrollToContact}>
        Contact Us
      </ContactBtn>
    </Nav>
  );
};

export default Header;
