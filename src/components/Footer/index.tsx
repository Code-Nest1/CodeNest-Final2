import React from "react";
import styled, { css } from "styled-components";
import { FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

// --- FIX: Safe Casts for Icons ---
const LinkedinIcon = FaLinkedinIn as React.ElementType;
const FacebookIcon = FaFacebookF as React.ElementType;
const GithubIcon = FaGithub as React.ElementType;
const TwitterIcon = FaTwitter as React.ElementType;
const InstagramIcon = FaInstagram as React.ElementType;

// --- Custom SVGs for perfect match ---
const ArrowRight = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ display: 'block' }}>
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
      {/* The Glow Effect behind the text */}
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
            </AddressGroup>

            <AddressGroup>
              <Label>Delivery center</Label>
              <Address>
                Remote Engineering Hub <br />
                Global Teams
              </Address>
              <Phone>contact@codenest.us.com</Phone>
            </AddressGroup>
          </AddressColumn>
        </TopRow>

        {/* === LINKS GRID === */}
        <GridContainer>
          
          {/* Column 1 */}
          <GridColumn>
            <SectionTitle>About us</SectionTitle>
            <LinkList>
              <LinkItem href="/about">
                <span>Education</span>
                <PlusIcon />
              </LinkItem>
              <LinkItem href="/career">
                <span>Career</span>
                <PlusIcon />
              </LinkItem>
              <LinkItem href="/technologies">
                <span>Technologies</span>
                <PlusIcon />
              </LinkItem>
              <LinkItem href="/portfolio">
                <span>Portfolio</span>
                {/* No icon for Portfolio usually, or add if needed */}
              </LinkItem>
              <LinkItem href="/blog">
                <span>Blog</span>
              </LinkItem>
              <LinkItem href="/referral">
                <span>Referral Program</span>
              </LinkItem>
            </LinkList>
          </GridColumn>

          {/* Column 2 */}
          <GridColumn>
            <SectionTitle>Industries</SectionTitle>
            <LinkList>
              <LinkItem href="/industries/travel">
                <span>Travel</span>
                <PlusIcon />
              </LinkItem>
              <LinkItem href="/industries/logistics">
                <span>Logistics</span>
                <PlusIcon />
              </LinkItem>
              <LinkItem href="/industries/retail">
                <span>Retail</span>
                <PlusIcon />
              </LinkItem>
              <LinkItem href="/industries/healthcare">
                <span>Healthcare</span>
                <PlusIcon />
              </LinkItem>
              <LinkItem href="/industries/other">
                <span>Other Industries</span>
                <PlusIcon />
              </LinkItem>
            </LinkList>
          </GridColumn>

          {/* Column 3 (Wider for Services) */}
          <ServicesColumn>
            <SectionTitle>Services</SectionTitle>
            <ServicesInnerGrid>
              {/* Left Sub-col */}
              <LinkList>
                <LinkItem href="/services/advisory">
                  <span>Strategic & Advisory</span>
                  <PlusIcon />
                </LinkItem>
                <LinkItem href="/services/ai">
                  <span>AI Services</span>
                  <PlusIcon />
                </LinkItem>
                <LinkItem href="/services/qa">
                  <span>Quality & Maintenance</span>
                  <PlusIcon />
                </LinkItem>
                <LinkItem href="/services/marketing">
                  <span>Marketing</span>
                  <PlusIcon />
                </LinkItem>
                <LinkItem href="/services/support">
                  <span>IT Maintenance & Support</span>
                  <PlusIcon />
                </LinkItem>
              </LinkList>

              {/* Right Sub-col */}
              <LinkList>
                <LinkItem href="/services/dev">
                  <span>Development</span>
                  <PlusIcon />
                </LinkItem>
                <LinkItem href="/services/data">
                  <span>Data Services</span>
                  <PlusIcon />
                </LinkItem>
                <LinkItem href="/services/design">
                  <span>Design Services</span>
                  <PlusIcon />
                </LinkItem>
                <LinkItem href="/services/product">
                  <span>Product Management</span>
                  <PlusIcon />
                </LinkItem>
              </LinkList>
            </ServicesInnerGrid>
          </ServicesColumn>

        </GridContainer>

        {/* === FOOTER BOTTOM === */}
        <BottomBar>
          <SocialContainer>
            <SocialIcon href="#" target="_blank"><LinkedinIcon /></SocialIcon>
            <SocialIcon href="#" target="_blank"><FacebookIcon /></SocialIcon>
            <SocialIcon href="#" target="_blank"><GithubIcon /></SocialIcon>
            <SocialIcon href="#" target="_blank"><InstagramIcon /></SocialIcon>
          </SocialContainer>

          <CopyrightRow>
            <span>2008-{currentYear} © Code Nest Software. This article is licensed under CC BY 4.0.</span>
            <LegalLinks>
              <a href="/terms">Terms and Conditions</a>
              <a href="/privacy">Privacy Policy</a>
            </LegalLinks>
          </CopyrightRow>
        </BottomBar>

      </MainContainer>
    </FooterWrapper>
  );
}

// --- STYLES ---

// The specific Coax Blue
const BLUE_BG = "#28a665";
const LIME_GREEN = "#FFFF";
const WHITE = "#ffffff";

const FooterWrapper = styled.footer`
  background-color: ${BLUE_BG};
  color: ${WHITE};
  font-family: 'Inter', sans-serif; /* Ensure you have this font or similar sans-serif */
  padding: 80px 0 20px;
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

// Creates the "Light Leak" / Glass glow effect seen in screenshot
const BackgroundGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 40%, #248253, ${BLUE_BG} 60%),
              radial-gradient(circle at 80% 80%, #28a665 0%, ${BLUE_BG} 60%);
  z-index: -1;
  pointer-events: none;
`;

const MainContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

// --- TOP ROW ---
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 90px;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 50px;
    margin-bottom: 60px;
  }
`;

const BrandColumn = styled.div`
  max-width: 400px;
`;

const Logo = styled.h2`
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 1px;
  margin: 0 0 24px 0;
  text-transform: uppercase;
`;

const Tagline = styled.p`
  font-size: 28px;
  line-height: 1.25;
  font-weight: 400;
  margin: 0 0 32px 0;
`;

const EstimationBtn = styled.a`
  display: inline-flex;
  text-decoration: none;
  background-color: ${LIME_GREEN};
  color: #000;
  font-weight: 600;
  font-size: 15px;
  border-radius: 2px;
  transition: transform 0.2s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
  }

  .btn-text {
    padding: 16px 28px;
    display: flex;
    align-items: center;
  }

  .btn-icon {
    background-color: #FFFF; /* Slightly darker shade for divider look */
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 1px solid rgba(0,0,0,0.05);
  }
`;

const AddressColumn = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media (max-width: 900px) {
    text-align: left;
  }
`;

const AddressGroup = styled.div``;

const Label = styled.div`
  font-size: 13px;
  opacity: 0.6;
  margin-bottom: 6px;
  text-transform: capitalize;
`;

const Address = styled.div`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 4px;
`;

const Phone = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

// --- GRID LAYOUT ---
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr; /* Match exact ratio: About, Industries, Services(wide) */
  gap: 60px;
  padding-bottom: 80px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
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

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 30px;
  letter-spacing: -0.5px;
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
  color: ${WHITE};
  font-size: 12px;
  font-weight: 800; /* Bold uppercase look */
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* Subtle glass border */
  transition: all 0.2s ease;

  &:hover {
    color: ${LIME_GREEN};
    padding-left: 5px; /* Slight movement */
  }

  svg {
    opacity: 0.7;
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: rotate(90deg);
    opacity: 1;
    color: ${LIME_GREEN};
  }
`;

// --- BOTTOM BAR ---
const BottomBar = styled.div`
  /* Border top handled by the grid padding/margin relative visuals */
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 60px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${WHITE};
  font-size: 18px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${LIME_GREEN};
    color: #000;
    transform: translateY(-3px);
  }
`;

const CopyrightRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  opacity: 0.8;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 25px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 30px;

  a {
    color: ${WHITE};
    text-decoration: none;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`;