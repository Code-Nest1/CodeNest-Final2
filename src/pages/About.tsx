// src/components/sections/AboutUs/index.tsx
"use client";

import React from "react";
import styled from "styled-components";
import { ArrowRight } from "react-feather";
import CountUp from "react-countup"; // I recommend installing: npm install react-countup

// If you don't have react-countup, you can use your existing Counter component
// import Counter from "../components/Counter";

export default function AboutUs() {
  return (
    <Section>
      <Container>
        {/* --- Top Header Section --- */}
        <HeaderRow>
          <MainTitle>
            We are
            <VideoCircle>
              <video
                src="assets/videos/office.mp4" // Make sure file exists here or import it
                autoPlay
                loop
                muted
                playsInline
              />
            </VideoCircle>
            CODE NEST 
          </MainTitle>
        </HeaderRow>

        {/* --- Grid Content Section --- */}
        <StatsGrid>
          {/* Column 1: Mission Statement */}
          <MissionColumn>
            <TopBadge>
              <span>✦ Since 2024</span>
            </TopBadge>
            <MissionText>
              The COde Nest mission <br />
              is to help our customers <br />
              and teammates grow
            </MissionText>
            <LearnMoreBtn>
              Learn more about us
              <ArrowIcon>
                <ArrowRight size={14} />
              </ArrowIcon>
            </LearnMoreBtn>
          </MissionColumn>

          {/* Column 2: Team */}
          <StatColumn>
            <StatLabel>Team</StatLabel>
            <StatNumber>
              <CountUp end={25} duration={2.5} suffix="+" />
            </StatNumber>
          </StatColumn>

          {/* Column 3: Projects */}
          <StatColumn>
            <StatLabel>
              Projects in the last <br /> 2 years
            </StatLabel>
            <StatNumber>
              <CountUp end={119} duration={2.5} />
            </StatNumber>
          </StatColumn>

          {/* Column 4: Dev Centers */}
          <StatColumn className="last-col">
            <StatLabel>Dev centers</StatLabel>
            <StatNumber>
              <CountUp end={2} duration={2.5} />
            </StatNumber>
          </StatColumn>
        </StatsGrid>
      </Container>
    </Section>
  );
}

/* ========== Styled Components ========== */

const Section = styled.section`
  background-color: #ffffff;
  color: #121212;
  padding: 100px 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

/* --- Header Row --- */

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 80px;
  padding-left: 0;
`;

const MainTitle = styled.h2`
  font-size: 92px;
  font-weight: 500; /* Not super bold, sleek look */
  letter-spacing: -2.5px;
  color: #1c1c1c;
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 0;
  line-height: 1;

  @media (max-width: 1200px) {
    font-size: 64px;
    flex-wrap: wrap;
    gap: 20px;
  }
  @media (max-width: 768px) {
    font-size: 42px;
  }
`;

const VideoCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  /* Clean border if needed, usually Coax uses just the video or a thin stroke */
  border: 1px solid rgba(0,0,0,0.05); 
  flex-shrink: 0;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 1200px) {
    width: 90px;
    height: 90px;
  }
`;

/* --- Stats Grid Layout --- */

const StatsGrid = styled.div`
  display: grid;
  /* Columns: 1 large (Mission) + 3 Stats */
  grid-template-columns: 1.4fr 1fr 1fr 1fr; 
  /* The distinct top border */
  border-top: 1px solid #e1e1e1; 
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #e1e1e1;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

/* --- Mission Column (Left) --- */

const MissionColumn = styled.div`
  padding: 40px 40px 0 0; /* Top padding, right padding for spacing */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-right: 1px solid #e1e1e1;
  min-height: 400px; /* Ensure height for spacing */

  @media (max-width: 1024px) {
    border-right: none;
    padding-right: 0;
    margin-bottom: 40px;
    min-height: auto;
  }
`;

const TopBadge = styled.div`
  display: inline-block;
  background-color: #eff3ff; /* Very light blue bg */
  padding: 6px 12px;
  border-radius: 6px;
  margin-bottom: 24px;

  span {
    color: #3655df; /* Coax Blue */
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const MissionText = styled.h3`
  font-size: 38px;
  line-height: 1.15;
  font-weight: 500;
  color: #1c1c1c;
  letter-spacing: -1px;
  margin: 0 0 auto 0; /* Push button to bottom if flex container expands */
  max-width: 420px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const LearnMoreBtn = styled.button`
  background: #0b5cff; /* Vivid Blue */
  color: #fff;
  border: none;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
  transition: background 0.2s;

  &:hover {
    background: #004ad9;
  }
`;

const ArrowIcon = styled.span`
  display: flex;
  align-items: center;
`;

/* --- Stat Columns (Right) --- */

const StatColumn = styled.div`
  padding: 40px 0 0 40px; /* Indent content */
  border-right: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Pushes number to bottom */
  min-height: 380px;

  /* Remove border for the very last column */
  &.last-col {
    border-right: none;
  }

  @media (max-width: 1024px) {
    padding: 30px 0;
    min-height: 200px;
    border-right: none; /* Remove vertical borders on mobile grid */
    border-bottom: 1px solid #efefef;
    
    &.last-col {
      border-bottom: none;
    }
  }
`;

const StatLabel = styled.p`
  font-size: 17px;
  color: #8c8c8c; /* Light grey text */
  margin: 0;
  line-height: 1.5;
  font-weight: 400;
`;

const StatNumber = styled.div`
  font-size: 72px;
  color: #0b5cff; /* Vivid Blue */
  font-weight: 500;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 10px; /* Slight optical adjustment */

  @media (max-width: 1200px) {
    font-size: 56px;
  }
`;