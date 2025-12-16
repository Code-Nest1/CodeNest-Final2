// src/components/sections/AboutUs/index.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ArrowRight } from "react-feather";

/* --- Custom Counter Component (No External Libraries) --- */
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Simple intersection observer to start animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Easing function (easeOutQuad) for smooth effect
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

/* --- Main Component --- */

export default function AboutUs() {
  return (
    <Section>
      <Container>
        {/* --- Top Header Section --- */}
        <HeaderRow>
          <MainTitle>
            We are
            <VideoCircle>
              {/* Ensure your video is in public/assets/videos/office.mp4 */}
              <video
                src="assets/videos/office.mp4" 
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
              The CODE NEST mission <br />
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
              <AnimatedCounter end={25} suffix="+" />
            </StatNumber>
          </StatColumn>

          {/* Column 3: Projects */}
          <StatColumn>
            <StatLabel>
              Projects in the last <br /> 2 years
            </StatLabel>
            <StatNumber>
              <AnimatedCounter end={119} />
            </StatNumber>
          </StatColumn>

          {/* Column 4: Dev Centers */}
          <StatColumn className="last-col">
            <StatLabel>Dev centers</StatLabel>
            <StatNumber>
              <AnimatedCounter end={2} />
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
  font-weight: 500;
  letter-spacing: -2.5px;
  color: #09353d;
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
    gap: 15px;
  }
`;

const VideoCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0,0,0,0.05); 
  flex-shrink: 0;
  background: #000; /* Fallback color */

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 1200px) {
    width: 90px;
    height: 90px;
  }
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

/* --- Stats Grid Layout --- */

const StatsGrid = styled.div`
  display: grid;
  /* Columns: 1 large (Mission) + 3 Stats */
  grid-template-columns: 1.4fr 1fr 1fr 1fr; 
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
  padding: 40px 40px 0 0; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-right: 1px solid #e1e1e1;
  min-height: 400px; 

  @media (max-width: 1024px) {
    border-right: none;
    padding-right: 0;
    margin-bottom: 40px;
    min-height: auto;
  }
`;

const TopBadge = styled.div`
  display: inline-block;
  background-color: #eff3ff; 
  padding: 6px 12px;
  border-radius: 6px;
  margin-bottom: 24px;

  span {
    color: #28a665; 
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
  margin: 0 0 auto 0; 
  max-width: 420px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
`;

const LearnMoreBtn = styled.button`
  background: #28a665;
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
    background: #09353d;
  }
`;

const ArrowIcon = styled.span`
  display: flex;
  align-items: center;
`;

/* --- Stat Columns (Right) --- */

const StatColumn = styled.div`
  padding: 40px 0 0 40px;
  border-right: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  min-height: 380px;

  &.last-col {
    border-right: none;
  }

  @media (max-width: 1024px) {
    padding: 30px 0;
    min-height: 200px;
    border-right: none; 
    border-bottom: 1px solid #efefef;
    
    &.last-col {
      border-bottom: none;
    }
  }
`;

const StatLabel = styled.p`
  font-size: 17px;
  color: #8c8c8c;
  margin: 0;
  line-height: 1.5;
  font-weight: 400;
`;

const StatNumber = styled.div`
  font-size: 72px;
  color: #28a665;
  font-weight: 500;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 10px;

  @media (max-width: 1200px) {
    font-size: 56px;
  }
`;