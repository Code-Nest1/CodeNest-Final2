"use client";

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ArrowRight } from "react-feather";

/* --- Custom Counter Component --- */
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

/* --- Main Component --- */

export default function AboutUs() {
  return (
    <Section>
      <Container>
        {/* --- Header Section --- */}
        <HeaderRow>
          <MainTitle>
            We are
            <VideoCircle>
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
              The CODE NEST mission <br className="desktop-br" />
              is to help our customers <br className="desktop-br" />
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
            <StatLabel>Team Members</StatLabel>
            <StatNumber>
              <AnimatedCounter end={25} suffix="+" />
            </StatNumber>
          </StatColumn>

          {/* Column 3: Projects */}
          <StatColumn>
            <StatLabel>
              Projects completed <br /> in the last 2 years
            </StatLabel>
            <StatNumber>
              <AnimatedCounter end={119} />
            </StatNumber>
          </StatColumn>

          {/* Column 4: Dev Centers */}
          <StatColumn className="last-col">
            <StatLabel>Global dev centers</StatLabel>
            <StatNumber>
              <AnimatedCounter end={2} />
            </StatNumber>
          </StatColumn>
        </StatsGrid>
      </Container>
    </Section>
  );
}

/* ========== Styled Components (Updated for Total Responsiveness) ========== */

const Section = styled.section`
  background-color: #ffffff;
  color: #121212;
  padding: 100px 0;
  overflow: hidden; /* Important for preventing mobile horizontal overflow */

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderRow = styled.div`
  margin-bottom: 80px;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const MainTitle = styled.h2`
  font-size: clamp(38px, 8vw, 92px); /* FLUID: Scales from 38px to 92px automatically */
  font-weight: 500;
  letter-spacing: -2.5px;
  color: #09353d;
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* CRITICAL: Allows "CODE NEST" to wrap to the next line on narrow phones */
  gap: 15px 30px; 
  margin: 0;
  line-height: 1.1;

  @media (max-width: 768px) {
    letter-spacing: -1px;
    justify-content: flex-start;
  }
`;

const VideoCircle = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: #000;
  flex-shrink: 0;

  video { width: 100%; height: 100%; object-fit: cover; }

  @media (max-width: 1024px) { width: 100px; height: 100px; }
  @media (max-width: 768px) { width: 70px; height: 70px; }
  @media (max-width: 480px) { width: 55px; height: 55px; }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr; 
  border-top: 1px solid #e1e1e1; 
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr; /* Stack everything on small phones */
  }
`;

const MissionColumn = styled.div`
  padding: 40px 40px 40px 0; 
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e1e1e1;
  min-height: 400px; 

  @media (max-width: 1024px) {
    border-right: none;
    grid-column: span 2; /* Mission statement takes full width on tablets */
    border-bottom: 1px solid #e1e1e1;
    min-height: auto;
    padding-right: 0;
  }

  @media (max-width: 640px) {
    grid-column: span 1;
    padding: 30px 0;
  }
`;

const TopBadge = styled.div`
  background-color: #eff3ff; 
  padding: 6px 12px;
  border-radius: 6px;
  width: fit-content;
  margin-bottom: 24px;
  span { color: #28a665; font-size: 13px; font-weight: 600; }
`;

const MissionText = styled.h3`
  font-size: 38px;
  line-height: 1.15;
  font-weight: 500;
  color: #1c1c1c;
  letter-spacing: -1px;
  margin-bottom: 30px;

  .desktop-br {
    @media (max-width: 1024px) { display: none; } /* Better text wrapping on mobile */
  }

  @media (max-width: 768px) { font-size: 26px; }
`;

const LearnMoreBtn = styled.button`
  background: #28a665;
  color: #fff;
  border: none;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;

  &:hover { background: #09353d; }
  
  @media (max-width: 480px) {
    width: 100%;
    justify-content: center; /* Thumb-friendly full width on small phones */
  }
`;

const ArrowIcon = styled.span` display: flex; align-items: center; `;

const StatColumn = styled.div`
  padding: 40px 0 40px 40px;
  border-right: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  min-height: 300px;

  &.last-col { border-right: none; }

  @media (max-width: 1024px) {
    padding: 30px 10px;
    min-height: 180px;
    border-bottom: 1px solid #f0f0f0;
    
    /* Small layout change for tablets: Every 2nd item has no right border */
    &:nth-child(even) { border-right: none; }
  }

  @media (max-width: 640px) {
    padding: 30px 0;
    border-right: none;
    min-height: auto;
    gap: 15px;
  }
`;

const StatLabel = styled.p`
  font-size: 16px;
  color: #8c8c8c;
  line-height: 1.4;
`;

const StatNumber = styled.div`
  font-size: 72px;
  color: #28a665;
  font-weight: 500;
  letter-spacing: -2px;
  line-height: 1;

  @media (max-width: 1200px) { font-size: 52px; }
  @media (max-width: 768px) { font-size: 46px; }
`;