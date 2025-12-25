import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Nav,
  Left,
  LogoImg,
  LogoText,
  Center,
  ContactBtn,
  Burger,
  MobileMenu,
  NavLinksContainer
} from "./styles";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when route changes or when user scrolls
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <Nav scrolled={scrolled}>
      <Left to="/">
        <LogoImg src="/img/icons/Logo.png" alt="Logo" />
        <LogoText>Code Nest</LogoText>
      </Left>

      {/* --- DESKTOP NAVIGATION --- */}
      <NavLinksContainer>
        <Center>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/challenges">Challenges</Link></li>
          <li><Link to="/blog">Blogs</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/industries">Industries</Link></li>
        </Center>
        <ContactBtn to="/contactform">Contact Us</ContactBtn>
      </NavLinksContainer>

      {/* --- MOBILE BURGER ICON --- */}
      <Burger onClick={toggleMenu}>
        {isMenuOpen ? <CloseOutlined style={{fontSize: '24px'}} /> : <MenuOutlined style={{fontSize: '24px'}} />}
      </Burger>

      {/* --- MOBILE MENU OVERLAY --- */}
      <MobileMenu isOpen={isMenuOpen}>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/challenges">Challenges</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/industries">Industries</Link></li>
        <li>
          <ContactBtn to="/contactform" style={{ marginTop: '20px', display: 'inline-block' }}>
            Contact Us
          </ContactBtn>
        </li>
      </MobileMenu>
    </Nav>
  );
};

export default Header;