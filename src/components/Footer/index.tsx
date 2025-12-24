// src/components/Footer.tsx
"use client";

import React from "react";
import styled from "styled-components";
import { FaLinkedinIn, FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";

// --- FIX: Explicitly cast icons to React.ElementType to resolve TS2786 ---
const LinkedinIcon = FaLinkedinIn as React.ElementType;
const FacebookIcon = FaFacebookF as React.ElementType;
const GithubIcon = FaGithub as React.ElementType;
const InstagramIcon = FaInstagram as React.ElementType;

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: 'block' }}>
    <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <BackgroundGlow />
      
      <MainContainer>
        {/* === TOP HEADER (Logo, Button, Address) === */}
        <TopRow>
          <BrandColumn>
            <Logo>CODE NEST</Logo>
            <Tagline>We build teams that <br /> build your software</Tagline>
            
            <EstimationBtn href="/contact">
              <span className="btn-text">Get free estimation</span>
              <span className="btn-icon"><ArrowRight /></span>
            </EstimationBtn>
          </BrandColumn>

          <AddressColumn>
            <AddressGroup>
              <Label>Main office</Label>
              <Address>
                1209 MOUNTAIN ROAD PL NE <br />
                STE R ALBUQUERQUE, NM 87110, USA
              </Address>
              <Phone>+1 805 399 2436</Phone>
              {/* MOVED EMAIL HERE */}
              <Phone>contact@codenest.us.com</Phone>
            </AddressGroup>

            {/* Delivery Center Block REMOVED */}
          </AddressColumn>
        </TopRow>

        {/* === LINKS GRID === */}
        <GridContainer>
          
          {/* Column 1 */}
          <GridColumn>
            <SectionTitle>About us</SectionTitle>
            <LinkList>
              <LinkItem href="/about"><span>Education</span><PlusIcon /></LinkItem>
              <LinkItem href="/career"><span>Career</span><PlusIcon /></LinkItem>
              <LinkItem href="/technologies"><span>Technologies</span><PlusIcon /></LinkItem>
              <LinkItem href="/portfolio"><span>Portfolio</span></LinkItem>
              <LinkItem href="/blog"><span>Blog</span></LinkItem>
              <LinkItem href="/referral"><span>Referral Program</span></LinkItem>
            </LinkList>
          </GridColumn>

          {/* Column 2 */}
          <GridColumn>
            <SectionTitle>Industries</SectionTitle>
            <LinkList>
              <LinkItem href="/industries/travel"><span>Travel</span><PlusIcon /></LinkItem>
              <LinkItem href="/industries/logistics"><span>Logistics</span><PlusIcon /></LinkItem>
              <LinkItem href="/industries/retail"><span>Retail</span><PlusIcon /></LinkItem>
              <LinkItem href="/industries/healthcare"><span>Healthcare</span><PlusIcon /></LinkItem>
              <LinkItem href="/industries/other"><span>Other Industries</span><PlusIcon /></LinkItem>
            </LinkList>
          </GridColumn>

          {/* Column 3 (Services - Wide) */}
          <ServicesColumn>
            <SectionTitle>Services</SectionTitle>
            <ServicesInnerGrid>
              <LinkList>
                <LinkItem href="/services/advisory"><span>Strategic & Advisory</span><PlusIcon /></LinkItem>
                <LinkItem href="/services/ai"><span>AI Services</span><PlusIcon /></LinkItem>
                <LinkItem href="/services/qa"><span>Quality & Maintenance</span><PlusIcon /></LinkItem>
                <LinkItem href="/services/marketing"><span>Marketing</span><PlusIcon /></LinkItem>
                <LinkItem href="/services/support"><span>IT Maintenance & Support</span><PlusIcon /></LinkItem>
              </LinkList>
              <LinkList>
                <LinkItem href="/services/dev"><span>Development</span><PlusIcon /></LinkItem>
                <LinkItem href="/services/data"><span>Data Services</span><PlusIcon /></LinkItem>
                <LinkItem href="/services/design"><span>Design Services</span><PlusIcon /></LinkItem>
                <LinkItem href="/services/product"><span>Product Management</span><PlusIcon /></LinkItem>
              </LinkList>
            </ServicesInnerGrid>
          </ServicesColumn>

        </GridContainer>

        {/* === FOOTER BOTTOM === */}
        <BottomBar>
          <SocialContainer>
            <SocialIcon href="https://www.linkedin.com/company/codenestllc/" target="_blank"><LinkedinIcon /></SocialIcon>
            <SocialIcon href="https://www.facebook.com/profile.php?id=61580032506453" target="_blank"><FacebookIcon /></SocialIcon>
            <SocialIcon href="https://github.com/Code-Nest1" target="_blank"><GithubIcon /></SocialIcon>
            <SocialIcon href="https://www.instagram.com/codenestllc/" target="_blank"><InstagramIcon /></SocialIcon>
          </SocialContainer>

          <CopyrightRow>
            <CopyrightText>2008-{currentYear} © Code Nest Software. <br className="mobile-only" /> This article is licensed under CC BY 4.0.</CopyrightText>
            <LegalLinks>
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy</a>
            </LegalLinks>
          </CopyrightRow>
        </BottomBar>
      </MainContainer>
    </FooterWrapper>
  );
}

// --- COLORS & VARIABLES ---
const BLUE_BG = "#28a665";
const LIME_GREEN = "#ffffff";
const TEXT_COLOR = "#ffffff";
const TEXT_DIM = "rgba(255, 255, 255, 0.6)";
const BORDER_DIM = "rgba(255, 255, 255, 0.2)";

// --- STYLED COMPONENTS ---

const FooterWrapper = styled.footer`
  background-color: ${BLUE_BG};
  color: ${TEXT_COLOR};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 80px 0 20px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 60px 0 20px;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* Updated gradient for smoother blend on all screens */
  background: radial-gradient(circle at 10% 20%, #2fbd76, ${BLUE_BG} 50%),
              radial-gradient(circle at 90% 90%, #2fbd76 0%, ${BLUE_BG} 60%);
  z-index: -1;
  pointer-events: none;
`;

const MainContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

// --- HEADER SECTION ---

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 45px;
    margin-bottom: 50px;
  }
`;

const BrandColumn = styled.div`
  max-width: 420px;
  width: 100%;
`;

const Logo = styled.h2`
  color: #ffffff; /* Enforce Pure White */
  /* Clamp: Min 28px, Max 34px */
  font-size: clamp(28px, 4vw, 34px);
  font-weight: 800; /* Already bold, keeps it strong */
  letter-spacing: 0.5px;
  margin: 0 0 20px 0;
  text-transform: uppercase;
`;

const Tagline = styled.p`
  color: #ffffff; /* Enforce Pure White */
  /* Clamp: Min 20px, Max 28px */
  font-size: clamp(20px, 3vw, 28px);
  line-height: 1.3;
  font-weight: 500; /* Minor increment: 400 -> 500 */
  margin: 0 0 35px 0;
  opacity: 1; /* Removed opacity for pure white look */

  @media (max-width: 768px) {
    margin-bottom: 25px;
    br { display: none; } /* Let text flow naturally on mobile */
  }
`;

const EstimationBtn = styled.a`
  display: inline-flex;
  text-decoration: none;
  background-color: ${LIME_GREEN};
  color: #1a5c3d; /* Dark green for contrast */
  font-weight: 700;
  font-size: 15px;
  border-radius: 4px;
  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
  align-items: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  }

  @media (max-width: 500px) {
    width: 100%; /* Full width on mobile for easier tap */
    display: flex;
  }

  .btn-text {
    padding: 16px 24px;
    flex-grow: 1;
    @media (max-width: 500px) {
       text-align: center;
    }
  }

  .btn-icon {
    background-color: rgba(255, 255, 255, 0.5); 
    /* Subtly different shade for separator illusion */
    border-left: 1px solid rgba(0,0,0,0.08);
    width: 54px;
    height: 100%;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AddressColumn = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 900px) {
    text-align: left;
    width: 100%;
    flex-direction: row; /* Side by side on tablet */
    justify-content: space-between;
  }
  
  @media (max-width: 600px) {
    flex-direction: column; /* Stack on phone */
    gap: 25px;
  }
`;

const AddressGroup = styled.div``;

const Label = styled.div`
  font-size: 13px;
  color: ${TEXT_DIM};
  margin-bottom: 8px;
  text-transform: capitalize;
  font-weight: 500;
`;

const Address = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Phone = styled.div`
  font-size: 15px;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 2px; /* Small spacing for email below */
`;

// --- MAIN GRID ---

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 60px;
  padding-bottom: 80px;
  border-bottom: 1px solid rgba(255,255,255,0.15); /* Separator line */

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    padding-bottom: 50px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const GridColumn = styled.div``;

const ServicesColumn = styled.div`
  @media (max-width: 1024px) {
    grid-column: span 2;
  }
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const ServicesInnerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  /* On tablet/mobile, stacking prevents narrow columns */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const SectionTitle = styled.h3`
  color: #ffffff; /* Enforce Pure White */
  font-size: 30px;
  font-weight: 600; /* Minor increment: 500 -> 600 */
  margin-bottom: 25px;
  letter-spacing: -0.5px;
  
  /* Scale title down on mobile */
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: ${TEXT_COLOR};
  font-size: 12px;
  font-weight: 800; /* Bold links per design */
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 16px 0;
  border-bottom: 1px solid ${BORDER_DIM};
  transition: all 0.25s ease;

  /* Adjust vertical spacing on mobile to reduce height */
  @media (max-width: 768px) {
    padding: 14px 0;
  }

  &:hover {
    color: ${LIME_GREEN};
    padding-left: 8px; /* Slight nudge effect */
  }

  /* Target the SVG icon inside */
  svg {
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: rotate(90deg);
    opacity: 1;
    color: ${LIME_GREEN};
  }
`;

// --- BOTTOM BAR ---

const BottomBar = styled.div`
  padding-top: 40px;
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const SocialIcon = styled.a`
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${TEXT_COLOR};
  font-size: 20px;
  border-radius: 4px;
  transition: all 0.25s ease;

  &:hover {
    background: ${LIME_GREEN};
    color: #1a5c3d; /* Icon dark on hover */
    transform: translateY(-3px);
  }
`;

const CopyrightRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);

  .mobile-only {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Put links above text on mobile */
    gap: 20px;
    align-items: flex-start;
    
    .mobile-only {
        display: block; /* Break line on mobile */
    }
  }
`;

const CopyrightText = styled.span`
  line-height: 1.6;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 30px;

  a {
    color: ${TEXT_COLOR};
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.2s;
    font-size: 13px;
    
    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    width: 100%;
  }
`;