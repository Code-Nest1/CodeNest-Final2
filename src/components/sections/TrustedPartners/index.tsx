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
             {/* UPDATED: Green Grid Icon to match #28a665 */}
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
               <path d="M4 4H10V10H4V4Z" fill="#28a665"/>
               <path d="M14 4H20V10H14V4Z" fill="#28a665" fillOpacity="0.25"/>
               <path d="M4 14H10V20H4V14Z" fill="#28a665" fillOpacity="0.25"/>
               <path d="M14 14H20V20H14V14Z" fill="#28a665"/>
             </svg>
          </HeaderIcon>
          <SectionTitle>Trusted software partner</SectionTitle>
        </HeaderWrapper>

        {/* --- Grid Layout --- */}
        <Grid>
          {partners.map((p) => (
            <Card key={p.id}>
              {/* Badge Top Right */}
              {p.badge && <Badge>{p.badge}</Badge>}

              <CardBody>
                {/* The "Folded" Icon Container */}
                <IconBox>
                  <LogoImg src={p.imgSrc} alt={p.title} loading="lazy" />
                </IconBox>

                {/* Text Content */}
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
  background-color: #FAFAFA;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
`;

// --- Header ---
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 70px;
`;

const HeaderIcon = styled.div`
  width: 50px;
  height: 50px;
  /* UPDATED: Changed background to match the badge light green for consistency */
  background-color: #e6f7ef; 
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 44px;
  color: #121212;
  font-weight: 500;
  margin: 0;
  letter-spacing: -1.2px;
`;

// --- Grid System ---
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

// --- Card Component ---
const Card = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-radius: 6px;
  padding: 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.06);
    border-color: transparent;
    z-index: 2;
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
`;

const CardBody = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

// --- The Visual Core: Folded Box ---
const IconBox = styled.div`
  flex-shrink: 0;
  width: 110px;
  height: 110px;
  background-color: #F7F7FA;
  
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
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background-color: #D8D8DF; 
    border-top-left-radius: 6px;
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
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
  margin: 0 0 10px 0;
  line-height: 1.3;
`;

const CardDesc = styled.p`
  font-size: 14px;
  color: #646464;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
`;