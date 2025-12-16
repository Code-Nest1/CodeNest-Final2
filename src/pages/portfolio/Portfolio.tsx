// src/pages/portfolio/Portfolio.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import { projectsData } from "../../data/portfolioData"; 

// --- Colors & Variables ---
const COLORS = {
  black: "#000000",
  textDark: "#111111",
  textBlue: "#0045cc",
  textGrey: "#888888",
  badgeBg: "#eef2fa",
  badgeText: "#5e6ad2",
  limeAccent: "#ccff00",
  border: "#eaeaea",
  white: "#ffffff",
};

// --- Icons ---
const ArrowDiagonal = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Portfolio() {
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [filterService, setFilterService] = useState("All");

  return (
    <PageWrapper>
      <Container>
        
        {/* --- HEADER --- */}
        <HeaderSection>
          <MainTitle>Portfolio</MainTitle>
          <FiltersRow>
            <FilterGroup>
              <label>Industry:</label>
              <SelectWrapper>
                <select onChange={(e) => setFilterIndustry(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </SelectWrapper>
            </FilterGroup>

            <FilterGroup>
              <label>Service:</label>
              <SelectWrapper>
                <select onChange={(e) => setFilterService(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Web">Web Development</option>
                  <option value="Mobile">Mobile App</option>
                  <option value="Design">Design</option>
                </select>
              </SelectWrapper>
            </FilterGroup>
          </FiltersRow>
        </HeaderSection>

        {/* --- PROJECTS --- */}
        <ProjectsWrapper>
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* TOP ROW: Badge | Title | Button */}
              <CardHeader>
                <BadgeColumn>
                  <Badge>{project.category}</Badge>
                </BadgeColumn>

                <TitleColumn>
                  <StyledLink to={`/portfolio/${project.slug}`}>
                    {project.title}
                  </StyledLink>
                  {/* ✅ FIXED: Use technologies array instead of tags */}
                  <Tags>
                    {project.technologies ? project.technologies.slice(0, 3).join(" / ") : ""}
                  </Tags>
                </TitleColumn>

                <ButtonColumn>
                  <ArrowButton to={`/portfolio/${project.slug}`}>
                    <ArrowDiagonal />
                  </ArrowButton>
                </ButtonColumn>
              </CardHeader>

              {/* BOTTOM ROW: Visual Split */}
              <CardVisuals>
                <ScreenshotBox>
                  <img src={project.heroImage} alt={project.title} />
                </ScreenshotBox>

                <LogoBox>
                  <LogoContent>
                    <h3>{project.logoText}</h3>
                    {project.logoSub && <span>{project.logoSub}</span>}
                  </LogoContent>
                  <BgDecoration />
                </LogoBox>
              </CardVisuals>

            </ProjectCard>
          ))}
        </ProjectsWrapper>

      </Container>
    </PageWrapper>
  );
}

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  padding: 120px 20px 100px;
  font-family: 'Inter', sans-serif;
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 100px;
`;

const MainTitle = styled.h1`
  font-size: 80px;
  font-weight: 400;
  letter-spacing: -3px;
  color: ${COLORS.textDark};
  margin: 0 0 50px 0;

  @media (max-width: 768px) {
    font-size: 48px;
    letter-spacing: -1.5px;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  @media (max-width: 600px) { flex-direction: column; gap: 20px; }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  label { font-size: 14px; color: #bbb; }
`;

const SelectWrapper = styled.div`
  position: relative;
  select {
    appearance: none;
    background-color: transparent;
    border: 1px solid ${COLORS.border};
    padding: 10px 40px 10px 20px;
    font-size: 14px;
    color: ${COLORS.textDark};
    border-radius: 2px;
    cursor: pointer;
    min-width: 160px;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 15px center;
    background-size: 10px;
    &:focus { outline: none; border-color: ${COLORS.textDark}; }
  }
`;

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectCard = styled(motion.div)`
  border-top: 1px solid ${COLORS.border};
  padding: 60px 0 80px;
  &:last-child { border-bottom: 1px solid ${COLORS.border}; }
`;

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 60px;
  gap: 30px;
  margin-bottom: 40px;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 20px; }
`;

const BadgeColumn = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Badge = styled.span`
  background-color: ${COLORS.badgeBg};
  color: ${COLORS.badgeText};
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: ${COLORS.badgeText};
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const TitleColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  font-size: 40px;
  font-weight: 400;
  color: ${COLORS.textDark};
  text-decoration: none;
  line-height: 1.1;
  margin-bottom: 20px;
  transition: color 0.2s ease;
  display: block;
  &:hover { color: ${COLORS.textBlue}; }
  @media (max-width: 768px) { font-size: 28px; }
`;

const Tags = styled.p`
  font-size: 14px;
  color: #999;
  margin: 0;
  font-weight: 400;
`;

const ButtonColumn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const ArrowButton = styled(Link)`
  width: 50px;
  height: 50px;
  border: 1px solid ${COLORS.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.textDark};
  transition: all 0.2s ease;
  &:hover {
    border-color: ${COLORS.textBlue};
    color: ${COLORS.textBlue};
    background-color: #fff;
  }
`;

const CardVisuals = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  height: 480px;
  @media (max-width: 900px) { grid-template-columns: 1fr; height: auto; }
`;

const ScreenshotBox = styled.div`
  background-color: #111;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  ${ProjectCard}:hover & img { transform: scale(1.03); }
  @media (max-width: 900px) { height: 300px; }
`;

const LogoBox = styled.div`
  background-color: ${COLORS.limeAccent};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0 100%);
  @media (max-width: 900px) { height: 250px; clip-path: none; }
`;

const LogoContent = styled.div`
  text-align: center;
  z-index: 2;
  h3 {
    font-size: 32px;
    font-weight: 800;
    text-transform: uppercase;
    color: ${COLORS.black};
    margin: 0;
    letter-spacing: -1px;
  }
  span {
    display: block;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 5px;
    letter-spacing: 2px;
  }
`;

const BgDecoration = styled.div`
  position: absolute;
  top: -50px;
  right: -50px;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  z-index: 1;
`;