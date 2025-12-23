"use client";

import React from "react";
import styled from "styled-components";

// --- Types ---
type PartnerItem = {
  id: string;
  title: string;
  desc: string;
  badge?: string;
  imgSrc: string;
};

// --- Data ---
const partners: PartnerItem[] = [
  {
    id: "iso9001",
    title: "ISO 9001",
    desc: "Certified to comply with the international standards of quality management.",
    badge: "ISO-CERTIFIED",
    imgSrc: "/images/iso-9001.png",
  },
  {
    id: "clutch",
    title: "Clutch",
    desc: "4.9 of 5 (17 reviews)",
    badge: "★ 4.9 OF 5",
    imgSrc: "/images/clutch-logo.png",
  },
  {
    id: "upwork",
    title: "Upwork",
    desc: "Job Success Upwork's Top Rated Agency.",
    badge: "★ 100% JOB SUCCESS",
    imgSrc: "/images/upwork-logo.png",
  },
  {
    id: "gbta",
    title: "GBTA",
    desc: "Member of Global Travel Business Association.",
    imgSrc: "/images/gbta-logo.png",
  },
  {
    id: "techuk",
    title: "techUK",
    desc: "Member of the UK's technology trade association.",
    imgSrc: "/images/techuk-logo.png",
  },
  {
    id: "itukraine",
    title: "IT Ukraine Association",
    desc: "Members of the largest IT Community in Ukraine.",
    imgSrc: "/images/it-ukraine.png",
  },
  {
    id: "iso27001",
    title: "ISO/IEC 27001:2022",
    desc: "Certified to comply with the international standards of information security.",
    imgSrc: "/images/iso-27001.png",
  },
  {
    id: "webflow",
    title: "Webflow Experts",
    desc: "Confirmation that we provide high-quality services.",
    imgSrc: "/images/webflow-expert.png",
  },
  {
    id: "scrum",
    title: "Professional Scrum Master™ I",
    desc: "The certificate confirms the successful use of Scrum by our project managers.",
    imgSrc: "/images/psm-scrum.png",
  },
  {
    id: "googlecloud",
    title: "Google Cloud Certified",
    desc: "Cloud Digital Leader.",
    imgSrc: "/images/google-cloud.png",
  },
  {
    id: "aws-arch",
    title: "AWS Certified",
    desc: "AWS Solutions Architect Associate.",
    imgSrc: "/images/aws-arch.png",
  },
  {
    id: "aws-sys",
    title: "AWS Certified",
    desc: "AWS SysOps Administrator Associate.",
    imgSrc: "/images/aws-sysops.png",
  },
  {
    id: "clutch-award-1",
    title: "Top Clutch Award",
    desc: "Top app developers in supply chain, logistics & transport.",
    imgSrc: "/images/clutch-award-supply.png",
  },
  {
    id: "clutch-award-2",
    title: "Top Clutch Award",
    desc: "Top app developers in hospitality & leisure.",
    imgSrc: "/images/clutch-award-hosp.png",
  },
  {
    id: "clutch-award-3",
    title: "Top Clutch Award",
    desc: "Top app developers in GPS, navigation & GIS.",
    imgSrc: "/images/clutch-award-gps.png",
  },
];

export default function TrustedPartners() {
  return (
    <Section>
      <Container>
        {/* --- Header --- */}
        <HeaderWrapper>
          <HeaderIcon>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 4H10V10H4V4Z" fill="#28a665" />
              <path d="M14 4H20V10H14V4Z" fill="#28a665" fillOpacity="0.25" />
              <path d="M4 14H10V20H4V14Z" fill="#28a665" fillOpacity="0.25" />
              <path d="M14 14H20V20H14V14Z" fill="#28a665" />
            </svg>
          </HeaderIcon>
          <SectionTitle>Trusted software partner</SectionTitle>
        </HeaderWrapper>

        {/* --- Grid Layout --- */}
        <Grid>
          {partners.map((p) => (
            <Card key={p.id}>
              {p.badge && <Badge>{p.badge}</Badge>}

              <CardBody>
                <IconBox>
                  <LogoImg src={p.imgSrc} alt={p.title} loading="lazy" />
                </IconBox>

                <TextContent>
                  <CardTitle>{p.title}</CardTitle>
                  <CardDesc>{p.desc}</CardDesc>
                </TextContent>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

// --- STYLED COMPONENTS ---

const Section = styled.section`
  padding: 80px 0;
  background-color: #fafafa;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  
  /* Reduced side padding for small phones to allow cards more width */
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

// --- Header ---
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const HeaderIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #e6f7ef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  /* Using clamp to automatically scale between mobile (28px) and desktop (44px) */
  font-size: clamp(28px, 5vw, 44px);
  color: #121212;
  font-weight: 600; /* Increased slightly for mobile legibility */
  margin: 0;
  letter-spacing: -1px;
  line-height: 1.2;
`;

// --- Grid System ---
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;

  /* Tablet */
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Mobile Landscape / Small Tablets */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

// --- Card Component ---
const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 35px;
  position: relative;
  display: flex;
  flex-direction: column;

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
    border-color: transparent;
    z-index: 2;
  }

  /* Responsive Padding */
  @media (max-width: 1024px) {
    padding: 24px; /* More compact on tablet */
  }

  @media (max-width: 480px) {
    padding: 20px; /* Maximize internal space on mobile */
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #e6f7ef;
  color: #28a665;
  font-size: 10px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 480px) {
    top: 15px; 
    right: 15px;
    font-size: 9px;
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  
  /* On very small screens, reducing the gap prevents text squeezing */
  @media (max-width: 480px) {
    gap: 16px;
    align-items: flex-start; 
  }
`;

// --- The Visual Core: Folded Box ---
const IconBox = styled.div`
  flex-shrink: 0;
  width: 110px;
  height: 110px;
  background-color: #f7f7fa;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 18px),
    calc(100% - 18px) 100%,
    0 100%
  );

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background-color: #d8d8df;
    border-top-left-radius: 6px;
  }
  
  /* Resize Icon box on Tablets */
  @media (max-width: 1200px) {
    width: 90px;
    height: 90px;
  }
  
  /* Resize Icon Box on Mobile for proportion */
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 14px), /* Slightly smaller fold */
      calc(100% - 14px) 100%,
      0 100%
    );

    &::before {
      width: 14px;
      height: 14px;
    }
  }
`;

const LogoImg = styled.img`
  max-width: 85%;
  max-height: 85%;
  width: auto;
  height: auto;
  object-fit: contain;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4px;
  flex: 1; /* Ensures text takes up remaining width */
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  margin: 0 0 10px 0;
  line-height: 1.3;
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 6px;
  }
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: #646464;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 13px; /* Minor tweak for tight layouts */
    line-height: 1.5;
  }
`;